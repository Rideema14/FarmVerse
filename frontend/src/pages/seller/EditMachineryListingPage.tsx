import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ImagePlus, Loader2, Plus, Save, Trash2, Tractor } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { SelectField, TextAreaField, TextField } from '@/components/common/FormField'
import { machineryService, type MachineryCategory, type MachineryListing } from '@/services/machineryService'
import { useLanguage } from '@/context/LanguageContext'
import { formatCategoryName } from '@/utils/localize'
import { getApiErrorMessage } from '@/services/api'
import { LoadingOverlay } from '@/components/common/LoadingOverlay'
import { formatINR } from '@/utils/format'

export default function EditMachineryListingPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const [listing, setListing] = useState<MachineryListing | null>(null)
  const [categories, setCategories] = useState<MachineryCategory[]>([])
  const [categoryId, setCategoryId] = useState('')
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [totalUnits, setTotalUnits] = useState('1')
  const [pricePerDay, setPricePerDay] = useState('')
  const [bufferDays, setBufferDays] = useState('1')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [discountTiers, setDiscountTiers] = useState<{ id?: string; minQuantity: string; discountPercent: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    let cancelled = false
    Promise.all([machineryService.getForOwner(id), machineryService.listCategories()])
      .then(([machine, cats]) => {
        if (cancelled) return
        setListing(machine)
        setCategories(cats)
        setCategoryId(machine.categoryId)
        setName(machine.name)
        setBrand(machine.brand ?? '')
        setModel(machine.model ?? '')
        setTotalUnits(String(machine.totalUnits))
        setPricePerDay(String(machine.pricePerDay))
        setBufferDays(String(machine.bufferDays))
        setDescription(machine.description ?? '')
        setDiscountTiers(machine.discountTiers.map((tier) => ({
          id: tier.id,
          minQuantity: String(tier.minQuantity),
          discountPercent: String(tier.discountPercent),
        })))
      })
      .catch((err) => {
        if (!cancelled) setError(getApiErrorMessage(err, t('sellerMachinery.loadDataFailed')))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [id])

  function handleImagePick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  async function saveDiscountTiers(machineId: string) {
    const original = listing?.discountTiers ?? []
    const nextIds = new Set(discountTiers.filter((tier) => tier.id).map((tier) => tier.id))
    await Promise.all(original.filter((tier) => !nextIds.has(tier.id)).map((tier) => machineryService.removeDiscountTier(machineId, tier.id)))

    for (const tier of discountTiers) {
      const minQuantity = Number(tier.minQuantity)
      const discountPercent = Number(tier.discountPercent)
      if (!Number.isInteger(minQuantity) || minQuantity < 1 || !Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) continue
      if (tier.id) {
        await machineryService.updateDiscountTier(machineId, tier.id, { minQuantity, discountPercent })
      } else {
        await machineryService.addDiscountTier(machineId, minQuantity, discountPercent)
      }
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!id || !listing || !categoryId || !name.trim() || !pricePerDay) return
    setSaving(true)
    setError('')
    try {
      const updated = await machineryService.update(listing.id, {
        categoryId,
        name: name.trim(),
        description: description.trim() || undefined,
        brand: brand.trim() || undefined,
        model: model.trim() || undefined,
        totalUnits: Math.max(1, Number(totalUnits) || 1),
        pricePerDay: Number(pricePerDay),
        bufferDays: Math.max(0, Number(bufferDays) || 0),
      })

      await saveDiscountTiers(updated.id)

      // Add the new photo without removing the existing one first. This keeps
      // the listing live even if an upload fails.
      if (imageFile) await machineryService.uploadImages(updated.id, [imageFile])

      navigate('/seller/machinery')
    } catch (err) {
      setError(getApiErrorMessage(err, t('sellerMachinery.updateListingFailed')))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-ink-300" /></div>
  }

  if (!listing) {
    return <div className="mx-auto max-w-lg px-4 py-8"><p className="text-sm text-danger-500">{error || t('sellerMachinery.loadDataFailed')}</p></div>
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-6 md:px-6 md:py-8">
      <LoadingOverlay isLoading={saving} title={t('sellerMachinery.updateListing')} message={t('addMachinery.uploadingMessage')} />
      <Link to="/seller/machinery" className="mb-4 flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">
        <ChevronLeft className="h-3.5 w-3.5" />
        {t('sellerMachinery.title')}
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-surface-sunk text-brand-600">
          {listing.images?.[0] ? <img src={listing.images[0]} alt="" className="h-full w-full object-cover" /> : <Tractor className="h-6 w-6" />}
        </span>
        <div>
          <h1 className="text-xl font-bold text-ink-900">{t('sellerMachinery.editListing')}</h1>
          <p className="text-sm text-ink-500">{t('sellerMachinery.editListingSubtitle')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-1">
        <SelectField id="category" label={t('addMachinery.category')} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          {categories.map((c) => <option key={c.id} value={c.id}>{formatCategoryName(c, t)}</option>)}
        </SelectField>
        <TextField id="name" label={t('addMachinery.machineName')} value={name} onChange={(e) => setName(e.target.value)} required />
        <div className="grid grid-cols-2 gap-3">
          <TextField id="brand" label={t('addMachinery.brand')} value={brand} onChange={(e) => setBrand(e.target.value)} />
          <TextField id="model" label={t('addMachinery.model')} value={model} onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TextField id="price" label={t('addMachinery.pricePerDay')} type="number" min={0.01} step="0.01" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} required />
          <TextField id="units" label={t('addMachinery.totalUnits')} type="number" min={1} value={totalUnits} onChange={(e) => setTotalUnits(e.target.value)} required />
        </div>
        <TextField id="buffer" label={t('addMachinery.bufferDays')} type="number" min={0} max={30} value={bufferDays} onChange={(e) => setBufferDays(e.target.value)} />
        <TextAreaField id="description" label={t('addMachinery.description')} value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="mt-4 rounded-2xl border border-ink-100 bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-ink-900">{t('sellerMachinery.bulkDiscounts')}</p>
              <p className="text-xs text-ink-500">{t('sellerMachinery.bulkDiscountsSubtitle')}</p>
            </div>
            <button type="button" onClick={() => setDiscountTiers((prev) => [...prev, { minQuantity: '2', discountPercent: '5' }])} className="flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
              <Plus className="h-3.5 w-3.5" /> {t('sellerMachinery.addDiscount')}
            </button>
          </div>
          {discountTiers.map((tier, index) => (
            <div key={tier.id ?? `new-${index}`} className="mb-2 grid grid-cols-[1fr_1fr_auto] items-end gap-2">
              <TextField id={`min-${index}`} label={t('sellerMachinery.minimumUnits')} type="number" min={1} value={tier.minQuantity} onChange={(e) => setDiscountTiers((prev) => prev.map((x, i) => i === index ? { ...x, minQuantity: e.target.value } : x))} />
              <TextField id={`discount-${index}`} label={t('sellerMachinery.discountPercent')} type="number" min={0} max={100} step="0.01" value={tier.discountPercent} onChange={(e) => setDiscountTiers((prev) => prev.map((x, i) => i === index ? { ...x, discountPercent: e.target.value } : x))} />
              <button type="button" onClick={() => setDiscountTiers((prev) => prev.filter((_, i) => i !== index))} className="mb-1 flex h-9 w-9 items-center justify-center rounded-xl text-danger-500 hover:bg-danger-50" aria-label={t('sellerMachinery.removeDiscount')}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <label className="mt-4 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink-200 py-6 text-ink-500 hover:border-brand-300">
          {imagePreviewUrl ? <img src={imagePreviewUrl} alt={t('addMachinery.machineryPreviewAlt')} className="h-24 w-24 rounded-xl object-cover" /> : <ImagePlus className="h-7 w-7" />}
          <span className="text-xs">{imagePreviewUrl ? t('addMachinery.photoAdded') : `${t('addMachinery.addPhoto')} · ${formatINR(listing.pricePerDay)}${t('sellerMachinery.perDay')}`}</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
        </label>

        {error && <p className="mt-3 text-sm font-medium text-danger-500">{error}</p>}
        <Button type="submit" fullWidth loading={saving} disabled={!categoryId || !name.trim() || !pricePerDay} className="mt-5">
          <Save className="mr-1.5 h-4 w-4" /> {t('sellerMachinery.saveChanges')}
        </Button>
      </form>
    </div>
  )
}

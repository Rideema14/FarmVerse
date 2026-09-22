import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ImagePlus, Tractor } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { SelectField, TextAreaField, TextField } from '@/components/common/FormField'
import { machineryService, type MachineryCategory } from '@/services/machineryService'
import { useLanguage } from '@/context/LanguageContext'
import { formatCategoryName } from '@/utils/localize'
import { getApiErrorMessage } from '@/services/api'
import { LoadingOverlay } from '@/components/common/LoadingOverlay'

export default function AddMachineryListingPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const [categories, setCategories] = useState<MachineryCategory[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

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

  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState('')
  const [published, setPublished] = useState(false)

  useEffect(() => {
    let cancelled = false
    machineryService
      .listCategories()
      .then((cats) => {
        if (cancelled) return
        setCategories(cats)
        if (cats.length > 0) setCategoryId((prev) => prev || cats[0].id)
      })
      .catch(() => {
        if (!cancelled) setError(t('addMachinery.categoriesLoadFailed'))
      })
      .finally(() => {
        if (!cancelled) setIsLoadingCategories(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  function handleImagePick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !pricePerDay || !categoryId) return
    setError('')
    setIsPublishing(true)
    try {
      const listing = await machineryService.create({
        categoryId,
        name,
        brand: brand || undefined,
        model: model || undefined,
        totalUnits: Number(totalUnits) || 1,
        pricePerDay: Number(pricePerDay),
        bufferDays: Number(bufferDays) || 0,
        description: description || undefined,
      })
      if (imageFile) {
        try {
          await machineryService.uploadImages(listing.id, [imageFile])
        } catch (uploadErr) {
          await machineryService.remove(listing.id).catch(() => {})
          throw uploadErr
        }
      }
      setPublished(true)
    } catch (err) {
      setError(getApiErrorMessage(err, t('addMachinery.publishFailed')))
    } finally {
      setIsPublishing(false)
    }
  }

  if (published) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Tractor className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="text-xl font-bold text-ink-900">{t('addMachinery.publish')}</h1>
        <p className="mt-1 text-sm text-ink-500">{t('addMachinery.publishSuccessMsg', { name })}</p>
        <Button className="mt-6" onClick={() => navigate('/machinery')}>
          {t('addMachinery.viewMachineryRental')}
        </Button>
      </div>
    )
  }

  return (
    <div className="relative mx-auto max-w-lg px-4 py-6 md:px-6 md:py-8">
      <LoadingOverlay
        isLoading={isPublishing}
        title={t('addMachinery.publishing')}
        message={t('addMachinery.uploadingMessage')}
      />
      <Link to="/seller" className="mb-4 flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">
        <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
        {t('sellerMachinery.sellerHub')}
      </Link>
      <h1 className="mb-1 text-xl font-bold text-ink-900">{t('addMachinery.title')}</h1>
      <p className="mb-5 text-sm text-ink-500">{t('addMachinery.subtitle')}</p>

      <form onSubmit={handleSubmit}>
        {isLoadingCategories ? (
          <p className="mb-4 text-sm text-ink-400">{t('addMachinery.loadingCategories')}</p>
        ) : (
          <SelectField id="category" label={t('addMachinery.category')} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {formatCategoryName(c, t)}
              </option>
            ))}
          </SelectField>
        )}

        <TextField id="name" label={t('addMachinery.machineName')} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('addMachinery.machineNamePlaceholder')} required />

        <div className="grid grid-cols-2 gap-3">
          <TextField id="brand" label={t('addMachinery.brand')} value={brand} onChange={(e) => setBrand(e.target.value)} placeholder={t('addMachinery.brandPlaceholder')} />
          <TextField id="model" label={t('addMachinery.model')} value={model} onChange={(e) => setModel(e.target.value)} placeholder={t('addMachinery.modelPlaceholder')} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <TextField id="price" label={t('addMachinery.pricePerDay')} type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} required />
          <TextField id="units" label={t('addMachinery.totalUnits')} type="number" min={1} value={totalUnits} onChange={(e) => setTotalUnits(e.target.value)} required />
        </div>

        <TextField
          id="buffer"
          label={t('addMachinery.bufferDays')}
          type="number"
          min={0}
          value={bufferDays}
          onChange={(e) => setBufferDays(e.target.value)}
        />

        <TextAreaField id="description" label={t('addMachinery.description')} value={description} onChange={(e) => setDescription(e.target.value)} />

        <label className="mb-4 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink-200 py-8 text-ink-500 hover:border-brand-300">
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt={t('addMachinery.machineryPreviewAlt')} className="h-20 w-20 rounded-xl object-cover" />
          ) : (
            <ImagePlus className="h-8 w-8" aria-hidden="true" />
          )}
          <span className="text-sm">{imagePreviewUrl ? t('addMachinery.photoAdded') : t('addMachinery.addPhoto')}</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
        </label>

        {error && <p className="mb-3 text-sm font-medium text-danger-500">{error}</p>}

        <Button type="submit" fullWidth loading={isPublishing} disabled={!categoryId}>
          {t('addMachinery.publish')}
        </Button>
      </form>
    </div>
  )
}

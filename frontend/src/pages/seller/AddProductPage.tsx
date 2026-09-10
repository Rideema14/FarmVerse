import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ImagePlus, Sprout } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { LoadingOverlay } from '@/components/common/LoadingOverlay'
import { StepperHeader } from '@/components/common/StepperHeader'
import { SelectField, TextField } from '@/components/common/FormField'
import { categoryService, type Category } from '@/services/categoryService'
import { productService } from '@/services/productService'
import { useSeller } from '@/context/SellerContext'
import { useLanguage } from '@/context/LanguageContext'
import { formatCategoryName } from '@/utils/localize'
import { formatINR } from '@/utils/format'

export default function AddProductPage() {
  const navigate = useNavigate()
  const { refreshListings } = useSeller()
  const { t } = useLanguage()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  const steps = [
    t('addProduct.stepCategory'),
    t('addProduct.stepDetails'),
    t('addProduct.stepImages'),
    t('addProduct.stepPriceStock'),
    t('addProduct.stepLocation'),
    t('addProduct.stepPreview'),
    t('addProduct.stepPublish'),
  ]

  const [step, setStep] = useState(0)
  const [categoryId, setCategoryId] = useState('')
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('per unit')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [location, setLocation] = useState('Katni, Madhya Pradesh')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  const [isPublishing, setIsPublishing] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)
  const [published, setPublished] = useState(false)

  useEffect(() => {
    let cancelled = false
    categoryService
      .list()
      .then((cats) => {
        if (cancelled) return
        const sellable = cats.filter((c) => c.slug !== 'machinery')
        setCategories(sellable)
        if (sellable.length > 0) setCategoryId((prev) => prev || sellable[0].id)
      })
      .finally(() => {
        if (!cancelled) setIsLoadingCategories(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  function handleImagePick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  async function handlePublish(event: FormEvent) {
    event.preventDefault()
    setPublishError(null)
    setIsPublishing(true)
    try {
      const product = await productService.create({
        categoryId,
        name,
        price: Number(price) || 0,
        stock: Number(stock) || 0,
        unit,
        description: location ? `Pickup location: ${location}` : undefined,
      })
      if (imageFile) {
        try {
          await productService.uploadImages(product.id, [imageFile])
        } catch (uploadErr) {
          await productService.remove(product.id).catch(() => {})
          throw uploadErr
        }
      }
      await refreshListings().catch(() => {})
      setPublished(true)
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : t('addProduct.couldNotPublish'))
    } finally {
      setIsPublishing(false)
    }
  }

  if (published) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="text-xl font-bold text-ink-900">{t('addProduct.listingPublished')}</h1>
        <p className="mt-1 text-sm text-ink-500">{t('addProduct.listingPublishedDesc', { name })}</p>
        <Button className="mt-6" onClick={() => navigate('/seller/listings')}>
          {t('addProduct.viewMyListings')}
        </Button>
      </div>
    )
  }

  const selectedCategoryObj = categories.find((c) => c.id === categoryId)
  const categoryDisplayName = selectedCategoryObj ? formatCategoryName(selectedCategoryObj, t) : ''

  return (
    <div className="relative mx-auto max-w-lg px-4 py-6 md:px-6 md:py-8">
      <LoadingOverlay
        isLoading={isPublishing}
        title={t('addProduct.publishingTitle')}
        message={t('addProduct.publishingMessage')}
      />
      <h1 className="mb-1 text-xl font-bold text-ink-900">{t('addProduct.title')}</h1>
      <p className="mb-5 text-sm text-ink-500">{t('addProduct.subtitle')}</p>

      <StepperHeader steps={steps} currentIndex={step} />

      {step === 0 && (
        <div>
          {isLoadingCategories ? (
            <p className="mb-4 text-sm text-ink-400">{t('addProduct.loadingCategories')}</p>
          ) : (
            <SelectField id="category" label={t('addProduct.selectCategory')} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {formatCategoryName(c, t)}
                </option>
              ))}
            </SelectField>
          )}
          <Button fullWidth onClick={next} disabled={!categoryId}>
            {t('addProduct.continue')}
          </Button>
        </div>
      )}

      {step === 1 && (
        <div>
          <TextField id="name" label={t('addProduct.productName')} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('addProduct.productNamePlaceholder')} required />
          <Button fullWidth onClick={next} disabled={!name.trim()}>
            {t('addProduct.continue')}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="mb-4 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink-200 py-10 text-ink-500 hover:border-brand-300">
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="Product preview" className="h-20 w-20 rounded-xl object-cover" />
            ) : (
              <ImagePlus className="h-8 w-8" aria-hidden="true" />
            )}
            <span className="text-sm">{imagePreviewUrl ? t('addProduct.photoAdded') : t('addProduct.addPhoto')}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
          </label>
          <Button fullWidth onClick={next}>
            {t('addProduct.continue')}
          </Button>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="grid grid-cols-2 gap-3">
            <TextField id="price" label={t('addProduct.price')} type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <TextField id="unit" label={t('addProduct.unit')} value={unit} onChange={(e) => setUnit(e.target.value)} placeholder={t('addProduct.unitPlaceholder')} required />
          </div>
          <TextField id="stock" label={t('addProduct.stockQuantity')} type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
          <Button fullWidth onClick={next} disabled={!price || !stock}>
            {t('addProduct.continue')}
          </Button>
        </div>
      )}

      {step === 4 && (
        <div>
          <TextField id="location" label={t('addProduct.pickupLocation')} value={location} onChange={(e) => setLocation(e.target.value)} required />
          <Button fullWidth onClick={next}>
            {t('addProduct.continue')}
          </Button>
        </div>
      )}

      {step === 5 && (
        <div>
          <div className="mb-5 rounded-2xl border border-ink-100 bg-surface p-4">
            <div className="mb-3 flex h-24 items-center justify-center overflow-hidden rounded-xl bg-surface-sunk">
              {imagePreviewUrl ? (
                <img src={imagePreviewUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <Sprout className="h-8 w-8 text-brand-400" aria-hidden="true" />
              )}
            </div>
            <p className="text-sm font-semibold text-ink-900">{name || t('addProduct.untitledProduct')}</p>
            <p className="text-xs text-ink-400">{categoryDisplayName} · {location}</p>
            <p className="mt-1 text-sm font-bold text-ink-900">
              {formatINR(Number(price) || 0)} <span className="text-xs font-normal text-ink-400">/ {unit}</span>
            </p>
            <p className="text-xs text-ink-400">{t('sellerListings.stock')} {stock || 0}</p>
          </div>
          <Button fullWidth onClick={next}>
            {t('addProduct.looksGood')}
          </Button>
        </div>
      )}

      {step === 6 && (
        <form onSubmit={handlePublish}>
          <p className="mb-3 text-sm text-ink-600">{t('addProduct.goesLiveNotice')}</p>
          {publishError && <p className="mb-3 text-sm text-danger-500">{publishError}</p>}
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={back} disabled={isPublishing}>
              {t('addProduct.back')}
            </Button>
            <Button type="submit" fullWidth loading={isPublishing}>
              {t('addProduct.publishListing')}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

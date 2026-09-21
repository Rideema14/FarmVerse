import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ImagePlus, Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { TextField, SelectField } from '@/components/common/FormField'
import { LoadingOverlay } from '@/components/common/LoadingOverlay'
import { categoryService, type Category } from '@/services/categoryService'
import { productService, type EditableProduct } from '@/services/productService'
import { useSeller } from '@/context/SellerContext'
import { useLanguage } from '@/context/LanguageContext'
import { formatCategoryName } from '@/utils/localize'

export default function EditProductPage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { refreshListings } = useSeller()
  const { t } = useLanguage()
  const [product, setProduct] = useState<EditableProduct | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [price, setPrice] = useState('')
  const [discountPrice, setDiscountPrice] = useState('')
  const [stock, setStock] = useState('')
  const [unit, setUnit] = useState('piece')
  const [newImages, setNewImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false
    Promise.all([productService.getEditableBySlug(slug), categoryService.list()])
      .then(([p, cats]) => {
        if (cancelled) return
        setProduct(p)
        setCategories(cats.filter((c) => c.slug !== 'machinery'))
        setName(p.name)
        setBrand(p.brand ?? '')
        setDescription(p.description ?? '')
        setCategoryId(p.categoryId ?? '')
        setPrice(String(p.price))
        setDiscountPrice(p.discountPrice != null ? String(p.discountPrice) : '')
        setStock(String(p.stock))
        setUnit(p.unit)
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load listing.'))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [slug])

  function pickImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setNewImages(files)
    setPreviews(files.map((f) => URL.createObjectURL(f)))
  }

  async function removeExistingImage(imageId: string) {
    if (!product) return
    try {
      await productService.removeImage(product.id, imageId)
      setProduct((p) => p ? { ...p, images: p.images.filter((img) => img.id !== imageId) } : p)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not remove image.')
    }
  }

  async function save(e: FormEvent) {
    e.preventDefault()
    if (!product) return
    setError('')
    setSaving(true)
    try {
      await productService.update(product.id, {
        categoryId: categoryId || undefined,
        name: name.trim(),
        brand: brand.trim() || undefined,
        description: description.trim() || undefined,
        price: Number(price),
        discountPrice: discountPrice.trim() ? Number(discountPrice) : undefined,
        stock: Number(stock),
        unit: unit.trim() || 'piece',
      })
      if (newImages.length) await productService.uploadImages(product.id, newImages)
      await refreshListings()
      navigate('/seller/listings')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save listing.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="mx-auto max-w-2xl px-4 py-12 text-center text-sm text-ink-500">Loading listing…</div>
  if (!product) return <div className="mx-auto max-w-2xl px-4 py-12 text-center text-sm text-danger-500">{error || 'Listing not found.'}</div>

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-6 md:px-6 md:py-8">
      <LoadingOverlay isLoading={saving} title="Saving listing" message="Updating your product details…" />
      <button type="button" onClick={() => navigate('/seller/listings')} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-ink-900">
        <ArrowLeft className="h-4 w-4" /> Back to listings
      </button>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Edit Listing</h1>
        <p className="mt-1 text-sm text-ink-500">Update price, quantity, product details, category and images from one place.</p>
      </div>

      {error && <p className="mb-4 rounded-xl bg-danger-50 px-4 py-3 text-sm text-danger-600">{error}</p>}

      <form onSubmit={save} className="space-y-5">
        <div className="rounded-2xl border border-ink-100 bg-surface p-4 md:p-5">
          <h2 className="mb-4 font-semibold text-ink-900">Product details</h2>
          <div className="space-y-3">
            <SelectField id="edit-category" label="Category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map((c) => <option key={c.id} value={c.id}>{formatCategoryName(c, t)}</option>)}
            </SelectField>
            <TextField id="edit-name" label="Product name" value={name} onChange={(e) => setName(e.target.value)} required />
            <TextField id="edit-brand" label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <label className="block text-sm font-medium text-ink-700">Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border border-ink-200 bg-surface px-3 py-2 text-sm outline-none focus:border-brand-500" /></label>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-surface p-4 md:p-5">
          <h2 className="mb-4 font-semibold text-ink-900">Price & quantity</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextField id="edit-price" label="Price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <TextField id="edit-discount" label="Discount price (optional)" type="number" min="0" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} />
            <TextField id="edit-stock" label="Quantity / stock" type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} required />
            <TextField id="edit-unit" label="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-surface p-4 md:p-5">
          <h2 className="mb-4 font-semibold text-ink-900">Product images</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {product.images.map((img) => (
              <div key={img.id} className="relative aspect-square overflow-hidden rounded-xl bg-surface-sunk">
                <img src={img.url} alt="" className="h-full w-full object-cover" />
                <button type="button" onClick={() => removeExistingImage(img.id)} className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-danger-500 shadow" aria-label="Remove image"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            {previews.map((src) => <img key={src} src={src} alt="New preview" className="aspect-square rounded-xl object-cover" />)}
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 text-ink-400 hover:border-brand-400 hover:text-brand-600">
              <ImagePlus className="h-6 w-6" />
              <span className="mt-1 text-xs font-medium">Add / replace</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={pickImages} />
            </label>
          </div>
          <p className="mt-2 text-xs text-ink-400">Remove old images above and add new ones. Your changes are saved together.</p>
        </div>

        <div className="flex gap-3 pb-6">
          <Button type="button" variant="secondary" onClick={() => navigate('/seller/listings')}>Cancel</Button>
          <Button type="submit" fullWidth loading={saving} disabled={!name.trim() || !price || !stock}>
            <Save className="mr-1.5 h-4 w-4" /> Save all changes
          </Button>
        </div>
      </form>
    </div>
  )
}

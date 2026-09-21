import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ImagePlus, Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { LoadingOverlay } from '@/components/common/LoadingOverlay'
import { TextField } from '@/components/common/FormField'
import { productService } from '@/services/productService'
import { useSeller } from '@/context/SellerContext'
import { formatINR } from '@/utils/format'
import type { Product } from '@/types'

export default function EditProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { listings, refreshListings } = useSeller()

  const [product, setProduct] = useState<Product | null>(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [discountPrice, setDiscountPrice] = useState('')
  const [stock, setStock] = useState('')
  const [unit, setUnit] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [newImages, setNewImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        // Seller listings contain the slug, while the detail endpoint gives us
        // the complete editable record and current image URLs.
        const listing = listings.find((item) => item.slug === slug)
        const detail = listing?.slug ? await productService.getBySlug(listing.slug) : null
        if (!detail) throw new Error('Listing not found.')
        if (cancelled) return
        setProduct(detail)
        setName(detail.name)
        setPrice(String(detail.originalPrice ?? detail.price))
        setDiscountPrice(detail.originalPrice ? String(detail.price) : '')
        setStock(String(detail.stock))
        setUnit(detail.unit)
        setDescription(detail.description)
        setBrand(detail.brand ?? '')
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load listing.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [slug, listings])

  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews])

  function handleImages(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, 8)
    if (!files.length) return
    previews.forEach((url) => URL.revokeObjectURL(url))
    setNewImages(files)
    setPreviews(files.map((file) => URL.createObjectURL(file)))
    event.target.value = ''
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    if (!product) return
    setError(null)
    setSaved(false)

    const parsedPrice = Number(price)
    const parsedStock = Number(stock)
    const parsedDiscount = discountPrice.trim() === '' ? null : Number(discountPrice)

    if (!name.trim()) return setError('Product name is required.')
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) return setError('Enter a valid price.')
    if (!Number.isInteger(parsedStock) || parsedStock < 0) return setError('Stock quantity must be a whole number and cannot be negative.')
    if (parsedDiscount !== null && (!Number.isFinite(parsedDiscount) || parsedDiscount <= 0 || parsedDiscount >= parsedPrice)) {
      return setError('Discount price must be greater than 0 and lower than the selling price.')
    }
    if (!unit.trim()) return setError('Unit is required.')

    setSaving(true)
    try {
      await productService.update(product.id, {
        name: name.trim(),
        price: parsedPrice,
        discountPrice: parsedDiscount,
        stock: parsedStock,
        unit: unit.trim(),
        description: description.trim() || undefined,
        ...(brand.trim() ? { brand: brand.trim() } : {}),
      })

      // Image replacement is independent of the product fields. Saving stock,
      // quantity or price never depends on an image being selected.
      if (newImages.length) {
        await productService.replaceImages(product.id, newImages)
      }

      await refreshListings()
      setSaved(true)
      navigate('/seller/listings', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save changes.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-10 text-center text-sm text-ink-500">Loading listing…</div>
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10 text-center">
        <p className="text-sm text-danger-500">{error ?? 'Listing not found.'}</p>
        <Link to="/seller/listings" className="mt-4 inline-block text-sm font-semibold text-brand-600">Back to listings</Link>
      </div>
    )
  }

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-5 md:px-6 md:py-8">
      <LoadingOverlay isLoading={saving} title="Saving listing" message="Updating price, quantity, details and images…" />

      <div className="mb-6 flex items-center gap-3">
        <button type="button" onClick={() => navigate('/seller/listings')} className="rounded-full p-2 hover:bg-surface-sunk" aria-label="Back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-ink-900">Edit listing</h1>
          <p className="text-sm text-ink-500">Update every part of your product without losing your stock or price changes.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <section className="rounded-2xl border border-ink-100 bg-surface p-4 md:p-5">
          <h2 className="mb-4 text-sm font-bold text-ink-900">Product information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField id="name" label="Product name" value={name} onChange={(e) => setName(e.target.value)} required />
            <TextField id="brand" label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Optional" />
          </div>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium text-ink-700">Description</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} maxLength={5000}
              className="w-full rounded-xl border border-ink-200 bg-surface px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-500" />
          </label>
        </section>

        <section className="rounded-2xl border border-ink-100 bg-surface p-4 md:p-5">
          <h2 className="mb-4 text-sm font-bold text-ink-900">Price & quantity</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <TextField id="price" label="Selling price (₹)" type="number" min="0.01" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <TextField id="discountPrice" label="Discount price (₹)" type="number" min="0.01" step="0.01" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder="Optional" />
            <TextField id="stock" label="Quantity / stock" type="number" min="0" step="1" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </div>
          <div className="mt-4 max-w-sm">
            <TextField id="unit" label="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="kg, litre, piece, bag…" required />
          </div>
          <p className="mt-3 text-xs text-ink-400">
            Current displayed price: {formatINR(Number(discountPrice || price) || 0)} / {unit || 'unit'} · Quantity: {stock || 0}
          </p>
        </section>

        <section className="rounded-2xl border border-ink-100 bg-surface p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-ink-900">Product images</h2>
              <p className="text-xs text-ink-500">Choose new images to replace the current set. Leave empty to keep them unchanged.</p>
            </div>
            <label className="flex cursor-pointer items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700">
              <ImagePlus className="h-4 w-4" />
              Replace images
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(previews.length ? previews : product.images ?? []).map((url, index) => (
              <div key={`${url}-${index}`} className="relative aspect-square overflow-hidden rounded-xl bg-surface-sunk">
                <img src={url} alt={`${name} ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          {newImages.length > 0 && (
            <div className="mt-3 flex items-center justify-between rounded-xl bg-brand-50 px-3 py-2 text-xs text-brand-700">
              <span>{newImages.length} new image{newImages.length > 1 ? 's' : ''} selected.</span>
              <button type="button" onClick={() => { previews.forEach((url) => URL.revokeObjectURL(url)); setNewImages([]); setPreviews([]) }} className="font-semibold hover:underline">
                Keep current images
              </button>
            </div>
          )}
        </section>

        {error && <p className="rounded-xl bg-danger-50 px-3 py-2 text-sm text-danger-600">{error}</p>}
        {saved && <p className="rounded-xl bg-brand-50 px-3 py-2 text-sm text-brand-700">Listing updated successfully.</p>}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={() => navigate('/seller/listings')} disabled={saving}>Cancel</Button>
          <Button type="submit" loading={saving}>
            <Save className="mr-1.5 h-4 w-4" />
            Save all changes
          </Button>
        </div>
      </form>
    </div>
  )
}

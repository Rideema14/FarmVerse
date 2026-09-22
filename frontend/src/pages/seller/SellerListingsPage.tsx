import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Minus, Pencil, Plus, PlusSquare, Sprout, Trash2, X } from 'lucide-react'
import { useSeller } from '@/context/SellerContext'
import { useLanguage } from '@/context/LanguageContext'
import { useToast } from '@/context/ToastContext'
import { formatINR } from '@/utils/format'
import { formatProductName } from '@/utils/localize'
import { cn } from '@/utils/cn'

type Tab = 'active' | 'inactive'

export default function SellerListingsPage() {
  const { listings, isLoadingListings, toggleListingActive, removeListing, updateListingStock, updateListingPrice } = useSeller()
  const { t, language } = useLanguage()
  const { showToast } = useToast()
  const [tab, setTab] = useState<Tab>('active')
  const [busyId, setBusyId] = useState<string | null>(null)
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null)
  const [editPriceValue, setEditPriceValue] = useState<string>('')
  const [isSavingPrice, setIsSavingPrice] = useState(false)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'active', label: t('sellerListings.active') },
    { key: 'inactive', label: t('sellerListings.inactive') },
  ]

  const filtered = listings.filter((l) => (tab === 'active' ? l.isActive !== false : l.isActive === false))

  async function handleToggle(listing: (typeof listings)[0]) {
    setBusyId(listing.id)
    const willDeactivate = listing.isActive !== false
    try {
      await toggleListingActive(listing.id)
      showToast(
        willDeactivate
          ? 'Listing deactivated. Moved to Inactive tab.'
          : 'Listing activated. Moved to Active tab.',
        { type: 'success' },
      )
    } catch {
      showToast('Failed to update listing status', { type: 'error' })
    } finally {
      setBusyId(null)
    }
  }

  function startEditingPrice(id: string, currentPrice: number) {
    setEditingPriceId(id)
    setEditPriceValue(String(currentPrice))
  }

  function cancelEditingPrice() {
    setEditingPriceId(null)
    setEditPriceValue('')
  }

  async function handleSavePrice(id: string) {
    const val = parseFloat(editPriceValue)
    if (isNaN(val) || val <= 0) {
      showToast('Please enter a valid price greater than 0', { type: 'error' })
      return
    }
    setIsSavingPrice(true)
    try {
      await updateListingPrice(id, val)
      showToast('Price updated successfully!', { type: 'success' })
      setEditingPriceId(null)
    } catch (err: any) {
      showToast(err?.message || 'Failed to update price', { type: 'error' })
    } finally {
      setIsSavingPrice(false)
    }
  }

  async function handleRemove(id: string) {
    setBusyId(id)
    try {
      await removeListing(id)
      showToast('Listing removed successfully', { type: 'success' })
    } catch {
      showToast('Failed to remove listing', { type: 'error' })
    } finally {
      setBusyId(null)
    }
  }

  const tabLabelFormatted = tab === 'active' ? t('sellerListings.active').toLowerCase() : t('sellerListings.inactive').toLowerCase()

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 md:px-6 md:py-8">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink-900">{t('sellerListings.title')}</h1>
        <Link to="/seller/add-product" className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700">
          <PlusSquare className="h-3.5 w-3.5" aria-hidden="true" />
          {t('sellerListings.add')}
        </Link>
      </div>

      <div className="mb-4 flex gap-1 rounded-full bg-surface-sunk p-1">
        {tabs.map((tabObj) => (
          <button
            key={tabObj.key}
            type="button"
            onClick={() => setTab(tabObj.key)}
            className={cn('flex-1 rounded-full py-2 text-xs font-semibold', tab === tabObj.key ? 'bg-surface shadow-card text-ink-900' : 'text-ink-500')}
          >
            {tabObj.label} ({listings.filter((l) => (tabObj.key === 'active' ? l.isActive !== false : l.isActive === false)).length})
          </button>
        ))}
      </div>

      {isLoadingListings ? (
        <p className="py-10 text-center text-sm text-ink-400">{t('sellerListings.loading')}</p>
      ) : filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-ink-500">{t('sellerListings.noListings', { tab: tabLabelFormatted })}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((listing) => (
            <div
              key={listing.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-surface shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Top: Image container */}
              <div className={cn('relative h-40 w-full bg-surface-sunk', listing.stock === 0 && 'grayscale')}>
                {listing.images?.[0] ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-brand-600">
                    <Sprout className="h-10 w-10" aria-hidden="true" />
                  </div>
                )}

                {/* Status Badge Positioned on Image */}
                <span
                  className={cn(
                    'absolute right-3 top-3 rounded-md px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide',
                    listing.isActive === false
                      ? 'bg-ink-600 text-white'
                      : listing.stock === 0
                        ? 'bg-danger-600 text-white'
                        : 'bg-brand-600 text-white',
                  )}
                >
                  {listing.isActive === false
                    ? t('sellerListings.inactiveBadge')
                    : listing.stock === 0
                      ? t('sellerListings.outOfStock')
                      : t('sellerListings.activeBadge')}
                </span>
              </div>

              {/* Middle: Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-1 font-semibold text-ink-900">{formatProductName(listing.name, language)}</h3>
                {editingPriceId === listing.id ? (
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-500">₹</span>
                      <input
                        type="number"
                        min="0.01"
                        step="any"
                        value={editPriceValue}
                        onChange={(e) => setEditPriceValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSavePrice(listing.id)
                          if (e.key === 'Escape') cancelEditingPrice()
                        }}
                        autoFocus
                        disabled={isSavingPrice}
                        className="w-full rounded-lg border border-brand-500 bg-white py-1 pl-6 pr-2 text-sm font-bold text-ink-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        placeholder="Price"
                      />
                    </div>
                    <span className="text-xs font-medium text-ink-500">/ {listing.unit}</span>
                    <button
                      type="button"
                      onClick={() => handleSavePrice(listing.id)}
                      disabled={isSavingPrice}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm hover:bg-brand-700 disabled:opacity-50 transition-colors"
                      title="Save price"
                      aria-label="Save price"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditingPrice}
                      disabled={isSavingPrice}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-600 shadow-sm hover:bg-ink-50 disabled:opacity-50 transition-colors"
                      title="Cancel"
                      aria-label="Cancel"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-ink-500">
                      <span className="font-bold text-ink-900">{formatINR(listing.price)}</span> / {listing.unit}
                    </p>
                    <button
                      type="button"
                      onClick={() => startEditingPrice(listing.id, listing.price)}
                      className="group flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold text-brand-600 hover:bg-brand-50 transition-colors"
                      title="Edit price"
                    >
                      <Pencil className="h-3 w-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}

                {/* Stock Controls */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-ink-100 bg-surface-sunk p-2.5">
                  <span className="text-xs font-semibold text-ink-600">{t('sellerListings.stock')}</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateListingStock(listing.id, listing.stock - 1)}
                      disabled={busyId === listing.id || listing.stock <= 0}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-ink-200 bg-white text-ink-600 shadow-sm transition-colors hover:bg-ink-50 hover:text-ink-900 disabled:opacity-40"
                      aria-label={t('sellerListings.decreaseStock')}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span
                      className={cn(
                        'min-w-[32px] text-center text-sm font-bold',
                        listing.stock === 0 ? 'text-danger-600' : 'text-ink-900',
                      )}
                    >
                      {listing.stock}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateListingStock(listing.id, listing.stock + 1)}
                      disabled={busyId === listing.id}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-ink-200 bg-white text-ink-600 shadow-sm transition-colors hover:bg-ink-50 hover:text-ink-900 disabled:opacity-40"
                      aria-label={t('sellerListings.increaseStock')}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom: Actions Footer */}
              <div className="flex items-center justify-between border-t border-ink-100 bg-surface-sunk px-4 py-3">
                <button
                  type="button"
                  onClick={() => handleToggle(listing)}
                  disabled={busyId === listing.id}
                  className={cn(
                    'text-xs font-bold transition-colors hover:underline disabled:opacity-50',
                    listing.isActive !== false ? 'text-ink-500 hover:text-ink-700' : 'text-brand-600 hover:text-brand-700',
                  )}
                >
                  {busyId === listing.id
                    ? 'Updating...'
                    : listing.isActive !== false
                      ? t('sellerListings.deactivate')
                      : t('sellerListings.activate')}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(listing.id)}
                  disabled={busyId === listing.id}
                  aria-label={t('sellerListings.deleteListing')}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-danger-500 transition-colors hover:bg-danger-50 hover:text-danger-600 disabled:opacity-50"
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

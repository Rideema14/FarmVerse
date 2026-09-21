import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusSquare, Sprout, Trash2 } from 'lucide-react'
import { useSeller } from '@/context/SellerContext'
import { useLanguage } from '@/context/LanguageContext'
import { formatINR } from '@/utils/format'
import { cn } from '@/utils/cn'

type Tab = 'active' | 'inactive'

export default function SellerListingsPage() {
  const { listings, isLoadingListings, toggleListingActive, removeListing } = useSeller()
  const { t } = useLanguage()
  const [tab, setTab] = useState<Tab>('active')
  const [busyId, setBusyId] = useState<string | null>(null)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'active', label: t('sellerListings.active') },
    { key: 'inactive', label: t('sellerListings.inactive') },
  ]

  const filtered = listings.filter((l) => (tab === 'active' ? l.isActive !== false : l.isActive === false))

  async function handleToggle(id: string) {
    setBusyId(id)
    try {
      await toggleListingActive(id)
    } finally {
      setBusyId(null)
    }
  }

  async function handleRemove(id: string) {
    setBusyId(id)
    try {
      await removeListing(id)
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
        <div className="space-y-2">
          {filtered.map((listing) => (
            <div key={listing.id} className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-surface p-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-sunk text-brand-600">
                {listing.images?.[0] ? (
                  <img src={listing.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                ) : (
                  <Sprout className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-medium text-ink-900">{listing.name}</p>
                <p className="text-xs text-ink-400">
                  {formatINR(listing.price)} / {listing.unit} · {t('sellerListings.stock')} {listing.stock}
                </p>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize',
                  listing.isActive !== false ? 'bg-brand-50 text-brand-700' : 'bg-ink-100 text-ink-500',
                )}
              >
                {listing.isActive !== false ? t('sellerListings.activeBadge') : t('sellerListings.inactiveBadge')}
              </span>
              <Link
                to={`/seller/listings/${encodeURIComponent(listing.slug || listing.id)}/edit`}
                className="shrink-0 rounded-lg border border-ink-200 px-2.5 py-1.5 text-xs font-semibold text-ink-700 hover:border-brand-400 hover:text-brand-700"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleToggle(listing.id)}
                disabled={busyId === listing.id}
                className={cn(
                  'shrink-0 text-xs font-semibold hover:underline disabled:opacity-50',
                  listing.isActive !== false ? 'text-ink-500' : 'text-brand-600',
                )}
              >
                {listing.isActive !== false ? t('sellerListings.deactivate') : t('sellerListings.activate')}
              </button>
              <button
                type="button"
                onClick={() => handleRemove(listing.id)}
                disabled={busyId === listing.id}
                aria-label={t('sellerListings.deleteListing')}
                className="shrink-0 text-danger-500 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

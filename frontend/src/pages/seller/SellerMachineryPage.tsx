import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  Loader2,
  PlusSquare,
  Tractor,
  Trash2,
  Pencil,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import {
  machineryService,
  type MachineryBooking,
  type MachineryBookingStatus,
  type MachineryDashboardStats,
  type MachineryListing,
} from '@/services/machineryService'
import { getApiErrorMessage } from '@/services/api'
import { formatINR, toIntlLocale } from '@/utils/format'
import { formatMachineryName } from '@/utils/localize'
import { cn } from '@/utils/cn'

type Tab = 'listings' | 'bookings'

const STATUS_STYLE: Record<MachineryBookingStatus, string> = {
  pending: 'bg-gold-50 text-gold-700',
  confirmed: 'bg-brand-50 text-brand-700',
  active: 'bg-sky-50 text-sky-700',
  completed: 'bg-ink-100 text-ink-700',
  cancelled: 'bg-danger-50 text-danger-500',
}

export default function SellerMachineryPage() {
  const { user } = useAuth()
  const { t, language } = useLanguage()
  const localeCode = toIntlLocale(language)
  const bookingStatusLabels: Record<MachineryBookingStatus, string> = {
    pending: t('machineryBookings.statusPending'),
    confirmed: t('machineryBookings.statusConfirmed'),
    active: t('machineryBookings.statusActive'),
    completed: t('machineryBookings.statusCompleted'),
    cancelled: t('machineryBookings.statusCancelled'),
  }
  const [tab, setTab] = useState<Tab>('listings')

  const [stats, setStats] = useState<MachineryDashboardStats | null>(null)
  const [listings, setListings] = useState<MachineryListing[]>([])
  const [bookings, setBookings] = useState<MachineryBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const nextActions: Partial<Record<MachineryBookingStatus, { label: string; status: MachineryBookingStatus; variant: 'primary' | 'danger' }[]>> = {
    pending: [
      { label: t('sellerMachinery.confirm'), status: 'confirmed', variant: 'primary' },
      { label: t('sellerMachinery.reject'), status: 'cancelled', variant: 'danger' },
    ],
    confirmed: [{ label: t('sellerMachinery.markActive'), status: 'active', variant: 'primary' }],
    active: [{ label: t('sellerMachinery.markCompleted'), status: 'completed', variant: 'primary' }],
  }

  const load = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    setError('')
    try {
      const [dashboard, listingsRes, bookingsRes] = await Promise.all([
        machineryService.getDashboard(),
        machineryService.list({ sellerId: user.id, limit: 100 }),
        machineryService.listBookings({ limit: 100, scope: 'selling' }),
      ])
      setStats(dashboard)
      setListings(listingsRes.items)
      setBookings(bookingsRes.items)
    } catch (err) {
      setError(getApiErrorMessage(err, t('sellerMachinery.loadDataFailed')))
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    load()
  }, [load])

  const pendingCount = useMemo(() => bookings.filter((b) => b.status === 'pending').length, [bookings])

  async function handleToggleActive(listing: MachineryListing) {
    setBusyId(listing.id)
    try {
      await machineryService.setActive(listing.id, !listing.available)
      setListings((prev) => prev.map((l) => (l.id === listing.id ? { ...l, available: !l.available } : l)))
    } catch (err) {
      setError(getApiErrorMessage(err, t('sellerMachinery.updateListingFailed')))
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(listing: MachineryListing) {
    setBusyId(listing.id)
    setError('')
    try {
      await machineryService.remove(listing.id)
      setListings((prev) => prev.filter((l) => l.id !== listing.id))
    } catch (err) {
      setError(getApiErrorMessage(err, t('sellerMachinery.deleteListingFailed')))
    } finally {
      setBusyId(null)
    }
  }

  async function handleBookingAction(booking: MachineryBooking, status: MachineryBookingStatus) {
    setBusyId(booking.id)
    setError('')
    try {
      const updated = await machineryService.updateBookingStatus(booking.id, status)
      setBookings((prev) => prev.map((b) => (b.id === booking.id ? updated : b)))
    } catch (err) {
      setError(getApiErrorMessage(err, t('sellerMachinery.updateBookingFailed')))
    } finally {
      setBusyId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-ink-300" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 md:px-6 md:py-8">
      <Link to="/seller" className="mb-4 flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">
        <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
        {t('sellerMachinery.sellerHub')}
      </Link>

      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink-900">{t('sellerMachinery.title')}</h1>
        <Link to="/seller/add-machinery" className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700">
          <PlusSquare className="h-3.5 w-3.5" aria-hidden="true" />
          {t('sellerMachinery.add')}
        </Link>
      </div>

      {error && <p className="mb-4 text-sm font-medium text-danger-500">{error}</p>}

      {stats && (
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label={t('sellerMachinery.liveListings')} value={stats.activeListings} />
          <StatCard label={t('sellerMachinery.bookingsToHandle')} value={stats.bookingsToFulfill} />
          <StatCard label={t('sellerMachinery.outOnRentToday')} value={stats.activeRentalsToday} />
          <StatCard label={t('sellerMachinery.earnings30d')} value={formatINR(stats.revenueLast30Days)} />
        </div>
      )}

      <Link
        to="/seller/analytics"
        className="mb-5 flex items-center justify-between rounded-2xl border border-ink-100 bg-surface p-3.5 text-sm hover:shadow-card"
      >
        <span className="flex items-center gap-2 font-medium text-ink-800">
          <BarChart3 className="h-4 w-4 text-brand-600" aria-hidden="true" />
          {t('sellerMachinery.totalEarnings')}
        </span>
        <span className="font-semibold text-ink-900">{stats ? formatINR(stats.totalRevenue) : '—'}</span>
      </Link>

      <div className="mb-4 flex gap-1 rounded-full bg-surface-sunk p-1">
        <button
          type="button"
          onClick={() => setTab('listings')}
          className={cn('flex-1 rounded-full py-2 text-xs font-semibold', tab === 'listings' ? 'bg-surface shadow-card text-ink-900' : 'text-ink-500')}
        >
          {t('sellerMachinery.myMachineryTab', { count: listings.length })}
        </button>
        <button
          type="button"
          onClick={() => setTab('bookings')}
          className={cn('flex-1 rounded-full py-2 text-xs font-semibold', tab === 'bookings' ? 'bg-surface shadow-card text-ink-900' : 'text-ink-500')}
        >
          {pendingCount > 0
            ? t('sellerMachinery.bookingsTabPending', { count: pendingCount })
            : t('sellerMachinery.bookingsTab', { count: bookings.length })}
        </button>
      </div>

      {tab === 'listings' ? (
        listings.length === 0 ? (
          <EmptyState t={t} />
        ) : (
          <div className="space-y-2">
            {listings.map((listing) => (
              <div key={listing.id} className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-surface p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-sunk text-brand-600">
                  {listing.images?.[0] ? (
                    <img src={listing.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  ) : (
                    <Tractor className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-ink-900">{formatMachineryName(listing.name, language, listing.translations)}</p>
                  <p className="text-xs text-ink-400">
                    {formatINR(listing.pricePerDay)}{t('sellerMachinery.perDay')} · {listing.totalUnits > 1 ? t('sellerMachinery.machinesCountPlural', { count: listing.totalUnits }) : t('sellerMachinery.machinesCount', { count: listing.totalUnits })}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize',
                    listing.available ? 'bg-brand-50 text-brand-700' : 'bg-ink-100 text-ink-500',
                  )}
                >
                  {listing.available ? t('sellerMachinery.active') : t('sellerMachinery.inactive')}
                </span>
                <button
                  type="button"
                  onClick={() => handleToggleActive(listing)}
                  disabled={busyId === listing.id}
                  className={cn(
                    'shrink-0 text-xs font-semibold hover:underline disabled:opacity-50',
                    listing.available ? 'text-ink-500' : 'text-brand-600',
                  )}
                >
                  {listing.available ? t('sellerMachinery.deactivate') : t('sellerMachinery.activate')}
                </button>
                <Link
                  to={`/seller/edit-machinery/${listing.slug}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-600 hover:bg-brand-50"
                  aria-label={t('profile.edit')}
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(listing)}
                  disabled={busyId === listing.id}
                  aria-label={t('sellerMachinery.deleteListing')}
                  className="shrink-0 text-danger-500 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <Calendar className="mb-3 h-10 w-10 text-ink-300" aria-hidden="true" />
          <p className="text-sm text-ink-500">{t('sellerMachinery.noBookingsYet')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-2xl border border-ink-100 bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink-900">{booking.machineryName}</p>
                  <p className="mt-0.5 text-xs text-ink-500">
                    {booking.renterName}
                    {booking.renterPhone ? ` · ${booking.renterPhone}` : ''}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-500">
                    {new Date(booking.startDate).toLocaleDateString(localeCode)} – {new Date(booking.endDate).toLocaleDateString(localeCode)}
                    {booking.quantity > 1 ? ` · ${t('sellerMachinery.machinesCountPlural', { count: booking.quantity })}` : ''}
                  </p>
                </div>
                <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize', STATUS_STYLE[booking.status])}>
                  {bookingStatusLabels[booking.status] || booking.status}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink-800">{formatINR(booking.totalPrice)}</span>
                <span className="text-[11px] text-ink-400">#{booking.bookingNumber}</span>
              </div>

              {nextActions[booking.status] && (
                <div className="mt-3 flex gap-2">
                  {nextActions[booking.status]!.map((action) => (
                    <button
                      key={action.status}
                      type="button"
                      disabled={busyId === booking.id}
                      onClick={() => handleBookingAction(booking, action.status)}
                      className={cn(
                        'flex-1 rounded-full py-2 text-xs font-semibold disabled:opacity-50',
                        action.variant === 'primary' ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-danger-50 text-danger-500 hover:bg-danger-100',
                      )}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-surface p-3.5">
      <p className="text-lg font-semibold text-ink-900">{value}</p>
      <p className="mt-0.5 text-[11px] text-ink-500">{label}</p>
    </div>
  )
}

function EmptyState({ t }: { t: (key: any) => string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <Tractor className="mb-3 h-10 w-10 text-ink-300" aria-hidden="true" />
      <p className="text-sm text-ink-500">{t('sellerMachinery.noMachinesYet')}</p>
      <Link to="/seller/add-machinery" className="mt-4 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
        {t('sellerMachinery.addAMachine')}
      </Link>
    </div>
  )
}

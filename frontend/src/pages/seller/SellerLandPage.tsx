import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Plus,
  CalendarCheck,
  CheckCircle2,
  Trash2,
  Phone,
  Mail,
  ChevronLeft,
} from 'lucide-react'
import { useLand } from '@/context/LandContext'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { formatLandTitle } from '@/utils/localize'
import { formatINR, toIntlLocale } from '@/utils/format'
import { cn } from '@/utils/cn'
import type { BackendVisitStatus } from '@/services/landService'

type Tab = 'listings' | 'visits'

export default function SellerLandPage() {
  const {
    sellerListings,
    fetchSellerListings,
    sellerVisitRequests,
    fetchSellerVisitRequests,
    updateVisitStatus,
    updateLand,
    deleteLand,
    isLoading,
    isActionLoading,
  } = useLand()

  const { user } = useAuth()
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState<Tab>('listings')
  const [visitStatusFilter, setVisitStatusFilter] = useState<BackendVisitStatus | 'ALL'>('ALL')
  
  // State for updating a visit request status with a seller note
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null)
  const [responseNote, setResponseNote] = useState('')
  const [updatingVisit, setUpdatingVisit] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchSellerListings()
      fetchSellerVisitRequests()
    }
  }, [user, fetchSellerListings, fetchSellerVisitRequests])

  const pendingVisitsCount = sellerVisitRequests.filter((v) => v.status === 'PENDING').length

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await updateLand(id, { isActive: !currentActive })
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : t('sellerLand.updateListingStatusFailed'))
    }
  }

  const handleDeleteListing = async (id: string) => {
    if (!window.confirm(t('sellerLand.confirmDelete'))) return
    try {
      await deleteLand(id)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : t('sellerLand.deleteListingFailed'))
    }
  }

  const handleUpdateVisit = async (visitId: string, status: BackendVisitStatus) => {
    setUpdatingVisit(true)
    setErrorMsg(null)
    try {
      await updateVisitStatus(visitId, status, responseNote.trim() || undefined)
      setSelectedVisitId(null)
      setResponseNote('')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : t('sellerLand.updateVisitRequestStatusFailed'))
    } finally {
      setUpdatingVisit(false)
    }
  }

  const filteredVisits = sellerVisitRequests.filter((v) =>
    visitStatusFilter === 'ALL' ? true : v.status === visitStatusFilter,
  )

  const localeCode = toIntlLocale(language)

  const statusLabels: Record<string, string> = {
    ALL: t('sellerLand.statusAll'),
    PENDING: t('sellerLand.statusPending'),
    ACCEPTED: t('sellerLand.statusAccepted'),
    REJECTED: t('sellerLand.statusRejected'),
    COMPLETED: t('sellerLand.statusCompleted'),
    CANCELLED: t('sellerLand.statusCancelled'),
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 md:px-6 md:py-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/seller" className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">
            <ChevronLeft className="h-4 w-4" /> {t('sellerLand.sellerHub')}
          </Link>
          <h1 className="text-2xl font-extrabold text-ink-900">{t('sellerLand.title')}</h1>
          <p className="text-xs text-ink-500">
            {t('sellerLand.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/seller/add-land"
            className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" /> {t('sellerLand.postLandListing')}
          </Link>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-2xl border border-danger-200 bg-danger-50 p-3 text-xs text-danger-700">
          {errorMsg}
        </div>
      )}

      {/* Primary Navigation Tabs */}
      <div className="mb-6 flex border-b border-ink-200">
        <button
          type="button"
          onClick={() => setActiveTab('listings')}
          className={cn(
            'flex items-center gap-2 border-b-2 py-3 px-4 text-sm font-bold transition',
            activeTab === 'listings'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-ink-500 hover:text-ink-900',
          )}
        >
          <MapPin className="h-4 w-4" />
          {t('sellerLand.myLandListingsTab', { count: sellerListings.length })}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('visits')}
          className={cn(
            'relative flex items-center gap-2 border-b-2 py-3 px-4 text-sm font-bold transition',
            activeTab === 'visits'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-ink-500 hover:text-ink-900',
          )}
        >
          <CalendarCheck className="h-4 w-4" />
          {t('sellerLand.visitRequestsTab', { count: sellerVisitRequests.length })}
          {pendingVisitsCount > 0 && (
            <span className="ml-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] text-white font-extrabold">
              {t('sellerLand.newPendingVisits', { count: pendingVisitsCount })}
            </span>
          )}
        </button>
      </div>

      {/* MY LISTINGS TAB */}
      {activeTab === 'listings' && (
        <div>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl border border-ink-100 bg-surface" />
              ))}
            </div>
          ) : sellerListings.length === 0 ? (
            <div className="mx-auto my-12 max-w-sm rounded-3xl border border-dashed border-ink-200 p-8 text-center">
              <MapPin className="mx-auto h-10 w-10 text-soil-400" />
              <h3 className="mt-2 text-sm font-bold text-ink-900">{t('sellerLand.noLandListingsYet')}</h3>
              <p className="mt-1 text-xs text-ink-500">{t('sellerLand.noLandListingsDesc')}</p>
              <Link
                to="/seller/add-land"
                className="mt-4 inline-block rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-brand-700"
              >
                {t('sellerLand.createFirstLandListing')}
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {sellerListings.map((land) => {
                const primaryImg = land.images?.find((img) => img.isPrimary)?.url || land.images?.[0]?.url
                const priceNum = typeof land.price === 'string' ? parseFloat(land.price) : land.price
                const areaNum = typeof land.areaAcres === 'string' ? parseFloat(land.areaAcres) : land.areaAcres

                return (
                  <div
                    key={land.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-ink-100 bg-surface p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-2xl bg-soil-50 border border-ink-100">
                        {primaryImg ? (
                          <img src={primaryImg} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-soil-400">
                            <MapPin className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-base font-bold text-ink-900">{formatLandTitle(land.title, language, land.translations)}</h3>
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase',
                              land.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-ink-100 text-ink-500',
                            )}
                          >
                            {land.isActive ? t('sellerLand.active') : t('sellerLand.inactive')}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-ink-500">
                          {land.location} · {areaNum} {t('sellerLand.acres')} · {land.dealType === 'SALE' ? t('sellerLand.forSale') : t('sellerLand.forLease')}
                        </p>
                        <p className="mt-1 text-sm font-extrabold text-ink-900">
                          {formatINR(priceNum)}
                          {land.dealType === 'LEASE' && <span className="text-xs font-normal text-ink-400">{t('sellerLand.perYear')}</span>}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-ink-100">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(land.id, land.isActive)}
                        className={cn(
                          'rounded-xl border px-3 py-1.5 text-xs font-semibold transition',
                          land.isActive
                            ? 'border-ink-200 text-ink-700 hover:bg-ink-50'
                            : 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
                        )}
                      >
                        {land.isActive ? t('sellerLand.deactivate') : t('sellerLand.activate')}
                      </button>
                      <Link
                        to={`/land/${land.slug || land.id}`}
                        className="rounded-xl border border-ink-200 bg-surface px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-ink-50"
                      >
                        {t('sellerLand.view')}
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteListing(land.id)}
                        className="rounded-xl border border-danger-200 p-1.5 text-danger-600 hover:bg-danger-50"
                        title={t('sellerLand.deleteListing')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* VISIT REQUESTS TAB */}
      {activeTab === 'visits' && (
        <div>
          {/* Sub-filter tabs for visit status */}
          <div className="mb-4 flex flex-wrap gap-1 rounded-2xl bg-surface-sunk p-1">
            {(['ALL', 'PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setVisitStatusFilter(status)}
                className={cn(
                  'rounded-xl px-3 py-1.5 text-xs font-semibold transition',
                  visitStatusFilter === status ? 'bg-surface shadow-card text-ink-900' : 'text-ink-500 hover:text-ink-900',
                )}
              >
                {statusLabels[status] ?? status}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-2xl border border-ink-100 bg-surface" />
              ))}
            </div>
          ) : filteredVisits.length === 0 ? (
            <div className="mx-auto my-12 max-w-sm rounded-3xl border border-dashed border-ink-200 p-8 text-center">
              <CalendarCheck className="mx-auto h-10 w-10 text-ink-300" />
              <h3 className="mt-2 text-sm font-bold text-ink-900">{t('sellerLand.noVisitRequests')}</h3>
              <p className="mt-1 text-xs text-ink-500">{t('sellerLand.noVisitRequestsDesc')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVisits.map((visit) => (
                <div key={visit.id} className="rounded-3xl border border-ink-100 bg-surface p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{t('sellerLand.landListingLabel')}</span>
                      <h3 className="text-base font-bold text-ink-900">{visit.land?.title || t('sellerLand.landPlotFallback')}</h3>
                      <p className="text-xs text-ink-500">{visit.land?.location}</p>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-extrabold uppercase',
                        visit.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : visit.status === 'ACCEPTED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : visit.status === 'COMPLETED'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-ink-100 text-ink-600',
                      )}
                    >
                      {statusLabels[visit.status] ?? visit.status}
                    </span>
                  </div>

                  {/* Buyer details */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-ink-500">{t('sellerLand.buyerName')} </span>
                      <span className="font-bold text-ink-900">{visit.buyer?.name || t('sellerLand.interestedBuyer')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {visit.buyer?.phone && (
                        <a
                          href={`tel:${visit.buyer.phone}`}
                          className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline"
                        >
                          <Phone className="h-3.5 w-3.5" /> {visit.buyer.phone}
                        </a>
                      )}
                      {visit.buyer?.email && (
                        <a
                          href={`mailto:${visit.buyer.email}`}
                          className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline"
                        >
                          <Mail className="h-3.5 w-3.5" /> {t('sellerLand.email')}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 rounded-2xl bg-surface-sunk p-3 text-xs">
                    <p>
                      <span className="font-bold text-ink-900">{t('sellerLand.requestedVisitDate')} </span>
                      <span className="font-bold text-brand-700">{new Date(visit.visitDate).toLocaleDateString(localeCode)}</span> {t('sellerLand.at')}{' '}
                      <span className="font-bold text-brand-700">{visit.visitTime}</span>
                    </p>
                    {visit.message && (
                      <p className="mt-1.5 italic text-ink-600">"{visit.message}"</p>
                    )}
                  </div>

                  {visit.responseNote && (
                    <div className="mt-3 text-xs text-ink-700">
                      <span className="font-bold">{t('sellerLand.sellerNoteProvided')}</span> {visit.responseNote}
                    </div>
                  )}

                  {/* Seller Action Controls */}
                  {visit.status === 'PENDING' && (
                    <div className="mt-4 border-t border-ink-100 pt-3">
                      {selectedVisitId === visit.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder={t('sellerLand.responseNotePlaceholder')}
                            value={responseNote}
                            onChange={(e) => setResponseNote(e.target.value)}
                            className="w-full rounded-xl border border-ink-200 px-3 py-1.5 text-xs text-ink-900 focus:outline-none focus:ring-1 focus:ring-brand-500"
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedVisitId(null)}
                              className="rounded-xl px-3 py-1.5 text-xs font-semibold text-ink-500 hover:bg-ink-50"
                            >
                              {t('sellerLand.cancel')}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateVisit(visit.id, 'REJECTED')}
                              disabled={updatingVisit}
                              className="rounded-xl bg-danger-600 px-4 py-1.5 text-xs font-semibold text-white shadow hover:bg-danger-700 disabled:opacity-50"
                            >
                              {t('sellerLand.rejectVisit')}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateVisit(visit.id, 'ACCEPTED')}
                              disabled={updatingVisit}
                              className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-700 disabled:opacity-50"
                            >
                              {t('sellerLand.approveVisit')}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedVisitId(visit.id)
                              setResponseNote('')
                            }}
                            className="rounded-xl bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white shadow hover:bg-brand-700"
                          >
                            {t('sellerLand.respondToVisitRequest')}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {visit.status === 'ACCEPTED' && (
                    <div className="mt-3 flex justify-end border-t border-ink-100 pt-3">
                      <button
                        type="button"
                        onClick={() => updateVisitStatus(visit.id, 'COMPLETED')}
                        disabled={isActionLoading}
                        className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow hover:bg-blue-700"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> {t('sellerLand.markVisitCompleted')}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

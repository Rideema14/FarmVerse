import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { IndianRupee, List, PackageCheck, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/common/StatCard'
import { sellerService, type SellerAnalytics, type SellerDashboard } from '@/services/sellerService'
import { formatINR, formatNumberIN } from '@/utils/format'
import { formatProductName } from '@/utils/localize'
import { useLanguage } from '@/context/LanguageContext'

export default function SellerDashboardPage() {
  const { t, language } = useLanguage()
  const [dashboard, setDashboard] = useState<SellerDashboard | null>(null)
  const [analytics, setAnalytics] = useState<SellerAnalytics | null>(null)

  const refresh = () => {
    let cancelled = false
    Promise.all([sellerService.getDashboard(), sellerService.getAnalytics(90, 5)]).then(([d, a]) => {
      if (cancelled) return
      setDashboard(d)
      setAnalytics(a)
    })
    return () => {
      cancelled = true
    }
  }

  useEffect(() => {
    const cleanup = refresh()

    const handleUpdate = () => {
      console.log('[SellerDashboard] Auto-refreshing due to socket event')
      refresh()
    }

    window.addEventListener('socket:seller:newOrder', handleUpdate)
    window.addEventListener('socket:seller:listingUpdated', handleUpdate)

    return () => {
      if (cleanup) cleanup()
      window.removeEventListener('socket:seller:newOrder', handleUpdate)
      window.removeEventListener('socket:seller:listingUpdated', handleUpdate)
    }
  }, [])

  const localeCode = language === 'hi' ? 'hi-IN' : 'en-IN'

  const chartData = analytics?.salesTrend.map((point) => ({
    ...point,
    dayLabel: new Intl.DateTimeFormat(localeCode, { day: 'numeric', month: 'short' }).format(new Date(point.date)),
  }))
  const totalUnitsSold = analytics?.topProducts.reduce((sum, p) => sum + p.unitsSold, 0) ?? 0

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 md:px-6 md:py-8">
      <h1 className="mb-5 text-xl font-bold text-ink-900">{t('sellerDashboard.title')}</h1>

      {!dashboard || !analytics ? (
        <p className="py-10 text-center text-sm text-ink-400">{t('sellerDashboard.loading')}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label={t('sellerDashboard.activeListings')} value={String(dashboard.activeListings)} icon={List} accent="bg-brand-50 text-brand-700" />
            <StatCard label={t('sellerDashboard.ordersToFulfill')} value={String(dashboard.ordersToFulfill)} icon={PackageCheck} accent="bg-gold-50 text-gold-700" />
            <StatCard label={t('sellerDashboard.revenue30d')} value={formatINR(dashboard.revenueLast30Days)} icon={IndianRupee} accent="bg-sky-50 text-sky-700" />
            <StatCard label={t('sellerDashboard.unitsSold90d')} value={formatNumberIN(totalUnitsSold)} icon={TrendingUp} accent="bg-soil-50 text-soil-700" />
          </div>

          <div className="mt-5 rounded-2xl border border-ink-100 bg-surface p-4">
            <h2 className="mb-3 text-sm font-semibold text-ink-800">{t('sellerDashboard.salesTrend')}</h2>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-ink-100)" />
                  <XAxis dataKey="dayLabel" tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }} interval="preserveStartEnd" />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-ink-100)', fontSize: 12 }} />
                  <Bar dataKey="orderCount" fill="var(--color-brand-500)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 bg-surface p-4">
              <h2 className="mb-3 text-sm font-semibold text-ink-800">{t('sellerDashboard.revenueTrend')}</h2>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-ink-100)" />
                    <XAxis dataKey="dayLabel" tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }} interval="preserveStartEnd" />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }} />
                    <Tooltip formatter={(v) => formatINR(Number(v))} contentStyle={{ borderRadius: 12, border: '1px solid var(--color-ink-100)', fontSize: 12 }} />
                    <Bar dataKey="revenue" fill="var(--color-gold-400)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-ink-100 bg-surface p-4">
              <h2 className="mb-3 text-sm font-semibold text-ink-800">{t('sellerDashboard.topProducts')}</h2>
              {analytics.topProducts.length === 0 ? (
                <p className="text-xs text-ink-400">{t('sellerDashboard.noSalesYet')}</p>
              ) : (
                <ul className="space-y-2">
                  {analytics.topProducts.map((p, index) => (
                    <li key={p.id} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-ink-700">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-sunk text-[10px] font-bold text-ink-500">
                          {index + 1}
                        </span>
                        {formatProductName(p.name, language)}
                      </span>
                      <span className="text-xs text-ink-400">{t('sellerDashboard.unitsSold', { count: p.unitsSold })}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <Link to="/seller/analytics" className="mt-5 block text-center text-xs font-semibold text-brand-600 hover:underline">
            {t('sellerDashboard.viewFullAnalytics')}
          </Link>
        </>
      )}
    </div>
  )
}

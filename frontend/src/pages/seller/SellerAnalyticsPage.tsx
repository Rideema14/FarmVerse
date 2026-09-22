import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { IndianRupee, PackageCheck, ShoppingCart, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/common/StatCard'
import { sellerService, type SellerAnalytics } from '@/services/sellerService'
import { useLanguage } from '@/context/LanguageContext'
import { formatINR, formatNumberIN } from '@/utils/format'
import { formatProductName } from '@/utils/localize'

export default function SellerAnalyticsPage() {
  const { t, language } = useLanguage()
  const [analytics, setAnalytics] = useState<SellerAnalytics | null>(null)

  useEffect(() => {
    let cancelled = false
    sellerService.getAnalytics(180, 10).then((data) => {
      if (!cancelled) setAnalytics(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!analytics) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-sm text-ink-400">{t('sellerAnalytics.loading')}</p>
      </div>
    )
  }

  const localeCode = language === 'hi' ? 'hi-IN' : 'en-IN'

  const totalRevenue = analytics.salesTrend.reduce((s, p) => s + p.revenue, 0)
  const totalOrders = analytics.salesTrend.reduce((s, p) => s + p.orderCount, 0)
  const totalUnitsSold = analytics.topProducts.reduce((s, p) => s + p.unitsSold, 0)
  const chartData = analytics.salesTrend.map((point) => ({
    ...point,
    dateLabel: new Intl.DateTimeFormat(localeCode, { day: 'numeric', month: 'short' }).format(new Date(point.date)),
  }))

  return (
    <div className="mx-auto max-w-4xl px-4 py-5 md:px-6 md:py-8">
      <h1 className="mb-5 text-xl font-bold text-ink-900">{t('sellerAnalytics.title')}</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={t('sellerAnalytics.totalRevenue6mo')} value={formatINR(totalRevenue)} icon={IndianRupee} accent="bg-brand-50 text-brand-700" />
        <StatCard label={t('sellerAnalytics.unitsSold')} value={formatNumberIN(totalUnitsSold)} icon={TrendingUp} accent="bg-gold-50 text-gold-700" />
        <StatCard label={t('sellerAnalytics.orders6mo')} value={formatNumberIN(totalOrders)} icon={ShoppingCart} accent="bg-sky-50 text-sky-700" />
        <StatCard
          label={t('sellerAnalytics.fulfilled')}
          value={String(analytics.statusBreakdown.find((s) => s.status === 'DELIVERED')?.count ?? 0)}
          icon={PackageCheck}
          accent="bg-soil-50 text-soil-700"
        />
      </div>

      <div className="mt-5 rounded-2xl border border-ink-100 bg-surface p-4">
        <h2 className="mb-3 text-sm font-semibold text-ink-800">{t('sellerAnalytics.revenueOverTime')}</h2>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-ink-100)" />
              <XAxis dataKey="dateLabel" tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }} />
              <Tooltip formatter={(v) => formatINR(Number(v))} contentStyle={{ borderRadius: 12, border: '1px solid var(--color-ink-100)', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="var(--color-brand-600)" fill="url(#revenueFill)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-ink-100 bg-surface p-4">
        <h2 className="mb-3 text-sm font-semibold text-ink-800">{t('sellerAnalytics.topProducts')}</h2>
        {analytics.topProducts.length === 0 ? (
          <p className="text-xs text-ink-400">{t('sellerAnalytics.noSalesYet')}</p>
        ) : (
          <div className="divide-y divide-ink-100">
            {analytics.topProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-ink-700">{formatProductName(p.name, language)}</span>
                <span className="text-ink-400">{t('sellerAnalytics.unitsCount', { count: p.unitsSold })}</span>
                <span className="font-semibold text-ink-900">{formatINR(p.revenue)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 rounded-2xl bg-surface-sunk p-4">
        <h2 className="mb-2 text-xs font-semibold text-ink-700">{t('sellerAnalytics.ordersByStatus')}</h2>
        <div className="flex flex-wrap gap-2">
          {analytics.statusBreakdown.map((row) => (
            <span key={row.status} className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink-700">
              {row.status.toLowerCase()}: <strong className="text-ink-900">{row.count}</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

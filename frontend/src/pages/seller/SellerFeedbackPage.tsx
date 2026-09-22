import { useEffect, useMemo, useState } from 'react'
import { MessageSquareText, Star } from 'lucide-react'
import { sellerService, type SellerReview } from '@/services/sellerService'
import { useLanguage } from '@/context/LanguageContext'
import { formatProductName } from '@/utils/localize'

type RatingFilter = 'all' | 'positive' | 'neutral' | 'negative' | '1' | '2' | '3' | '4' | '5'
type SortOrder = 'newest' | 'highest' | 'lowest'

function matchesRating(rating: number, filter: RatingFilter) {
  if (filter === 'all') return true
  if (filter === 'positive') return rating >= 4
  if (filter === 'neutral') return rating === 3
  if (filter === 'negative') return rating <= 2
  return rating === Number(filter)
}

export default function SellerFeedbackPage() {
  const { t, language } = useLanguage()
  const [reviews, setReviews] = useState<SellerReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')

  useEffect(() => {
    let cancelled = false
    sellerService
      .getReviews({ limit: 100 })
      .then(({ items }) => {
        if (!cancelled) setReviews(items)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const feedback = useMemo(() => {
    return reviews
      .filter((item) => matchesRating(item.rating, ratingFilter))
      .sort((a, b) => {
        if (sortOrder === 'highest') return b.rating - a.rating
        if (sortOrder === 'lowest') return a.rating - b.rating
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }, [reviews, ratingFilter, sortOrder])

  const localeCode = language === 'hi' ? 'hi-IN' : 'en-IN'

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 md:px-6 md:py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink-900">{t('sellerFeedback.title')}</h1>
          <p className="mt-1 text-sm text-ink-500">{t('sellerFeedback.subtitle')}</p>
        </div>
        <div className="rounded-xl bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700">
          {feedback.length === 1
            ? t('sellerFeedback.feedbacksCount', { count: feedback.length })
            : t('sellerFeedback.feedbacksCountPlural', { count: feedback.length })}
        </div>
      </div>

      <section aria-label="Filter feedback" className="mt-5 grid gap-3 rounded-2xl border border-ink-100 bg-surface p-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-ink-600">
          {t('sellerFeedback.filterTypeRating')}
          <select value={ratingFilter} onChange={(event) => setRatingFilter(event.target.value as RatingFilter)} className="mt-1.5 w-full rounded-lg border border-ink-200 bg-surface px-3 py-2 text-sm text-ink-800">
            <option value="all">{t('sellerFeedback.allFeedback')}</option>
            <option value="positive">{t('sellerFeedback.goodStars')}</option>
            <option value="neutral">{t('sellerFeedback.averageStars')}</option>
            <option value="negative">{t('sellerFeedback.poorStars')}</option>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating === 1 ? t('sellerFeedback.star', { count: rating }) : t('sellerFeedback.stars', { count: rating })}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-ink-600">
          {t('sellerFeedback.sortBy')}
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)} className="mt-1.5 w-full rounded-lg border border-ink-200 bg-surface px-3 py-2 text-sm text-ink-800">
            <option value="newest">{t('sellerFeedback.newestFirst')}</option>
            <option value="highest">{t('sellerFeedback.highestRating')}</option>
            <option value="lowest">{t('sellerFeedback.lowestRating')}</option>
          </select>
        </label>
      </section>

      <div className="mt-5 space-y-3">
        {isLoading ? (
          <p className="py-10 text-center text-sm text-ink-400">{t('sellerFeedback.loading')}</p>
        ) : (
          <>
            {feedback.map((item) => (
              <article key={item.id} className="rounded-2xl border border-ink-100 bg-surface p-4 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{item.user.name}</p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {t('sellerFeedback.feedbackFor')} <span className="font-medium text-ink-700">{formatProductName(item.product.name, language)}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-gold-50 px-2.5 py-1 text-xs font-semibold text-gold-700" aria-label={`${item.rating} out of 5 stars`}>
                    <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" aria-hidden="true" /> {item.rating}/5
                  </div>
                </div>
                {item.comment && <p className="mt-3 text-sm leading-6 text-ink-600">{item.comment}</p>}
                <time dateTime={item.createdAt} className="mt-3 block text-xs text-ink-400">
                  {new Intl.DateTimeFormat(localeCode, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(item.createdAt))}
                </time>
              </article>
            ))}
            {feedback.length === 0 && (
              <div className="rounded-2xl border border-dashed border-ink-200 bg-surface p-10 text-center text-sm text-ink-500">
                <MessageSquareText className="mx-auto mb-3 h-7 w-7 text-ink-300" aria-hidden="true" />
                {t('sellerFeedback.noFeedbackMatching')}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

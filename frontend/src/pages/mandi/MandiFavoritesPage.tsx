import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, MapPin } from 'lucide-react'
import { useMandi } from '@/context/MandiContext'
import { useLanguage } from '@/context/LanguageContext'
import { formatLocationName, formatMandiMarket } from '@/utils/localize'

export default function MandiFavoritesPage() {
  const { favorites, toggleFavorite, refreshFavorites, isLoading } = useMandi()
  const { t, language } = useLanguage()

  useEffect(() => {
    refreshFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center">
        <p className="text-ink-500">{t('mandiFavorites.loading')}</p>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <Heart className="mb-3 h-12 w-12 text-ink-300" aria-hidden="true" />
        <h1 className="text-lg">{t('mandiFavorites.emptyTitle')}</h1>
        <p className="mt-1 text-sm text-ink-500">{t('mandiFavorites.emptySubtitle')}</p>
        <Link to="/mandi" className="mt-5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
          {t('mandiFavorites.browseMandi')}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 md:px-6 md:py-8">
      <h1 className="mb-1 text-xl">{t('mandiFavorites.title')}</h1>
      <p className="mb-5 text-sm text-ink-500">{t('mandiFavorites.subtitle')}</p>
      <div className="space-y-2">
        {favorites.map((fav) => {
          return (
            <div key={fav.id} className="flex items-center justify-between rounded-2xl border border-ink-100 bg-surface p-4">
              <div>
                <p className="text-sm font-semibold text-ink-900">{fav.mandi?.name ? formatMandiMarket(fav.mandi.name, language) : t('mandi.unknownMandi')}</p>
                <div className="flex items-center gap-1 text-xs text-ink-400 mt-1">
                  <MapPin className="h-3 w-3" />
                  {fav.mandi?.district ? formatLocationName(fav.mandi.district, language) : ''}, {fav.mandi?.state ? formatLocationName(fav.mandi.state, language) : ''}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/mandi"
                  className="text-xs font-medium text-brand-600 hover:underline"
                >
                  {t('mandiFavorites.viewPrices')}
                </Link>
                <button
                  type="button"
                  onClick={() => toggleFavorite(fav.mandiId)}
                  aria-label="Remove from favorites"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-100 text-danger-500"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

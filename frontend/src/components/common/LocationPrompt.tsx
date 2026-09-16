import { Loader2, MapPin, RotateCw, WifiOff } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import type { GeoStatus } from '@/hooks/useGeolocation'
import { cn } from '@/utils/cn'

interface LocationPromptProps {
  status: GeoStatus
  onRequest: () => void
  /** Name currently shown while we don't have a precise location (e.g. "New Delhi (Fallback)"). */
  fallbackLabel: string
  className?: string
  /** Compact = small pill for tight headers (e.g. Marketplace "Nearby" section). Full = banner with explanation. */
  variant?: 'compact' | 'full'
}

/**
 * A tap-driven "use my location" control. Deliberately NOT auto-triggered —
 * see useGeolocation.ts for why mobile browsers need an explicit user
 * gesture. Shows a plain-language reason when location can't be used so
 * people aren't left guessing why they're seeing prices/weather for a city
 * they've never been to.
 */
export function LocationPrompt({ status, onRequest, fallbackLabel, className, variant = 'full' }: LocationPromptProps) {
  const { t } = useLanguage()

  if (status === 'success') return null

  const isLocating = status === 'locating'

  const errorMessage =
    status === 'insecure'
      ? t('weather.locationInsecure')
      : status === 'denied'
        ? t('weather.locationDenied')
        : status === 'timeout'
          ? t('weather.locationTimeout')
          : status === 'unavailable'
            ? t('weather.locationGenericError')
            : null

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={onRequest}
        disabled={isLocating}
        className={cn(
          'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[#d8d0bf] bg-white px-3 text-[11px] font-semibold text-[#3f4a36] transition-colors hover:bg-[#f0eee0] disabled:opacity-60',
          className,
        )}
      >
        {isLocating ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        ) : errorMessage ? (
          <WifiOff className="h-3.5 w-3.5 text-[#8a513d]" aria-hidden="true" />
        ) : (
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {isLocating ? t('weather.locating') : t('weather.useMyLocation')}
      </button>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-[18px] border border-[#e0dac8] bg-[#fbf8ee] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efe9d6] text-[#8a6a2e]">
          {isLocating ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <MapPin className="h-4 w-4" aria-hidden="true" />
          )}
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-[#292c23]">
            {isLocating ? t('weather.locating') : t('weather.locationUnavailableTitle', { location: fallbackLabel })}
          </p>
          {errorMessage && <p className="mt-0.5 text-[12px] leading-snug text-[#716d63]">{errorMessage}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={onRequest}
        disabled={isLocating || status === 'insecure'}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#2B3024] px-4 text-[12.5px] font-semibold text-[#F5F2E9] transition-colors hover:bg-[#3a412f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'denied' || status === 'timeout' || status === 'unavailable' ? (
          <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {status === 'idle' ? t('weather.useMyLocation') : t('weather.retry')}
      </button>
    </div>
  )
}

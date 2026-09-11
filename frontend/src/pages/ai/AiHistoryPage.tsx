import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Droplets, FlaskConical, History, Leaf, MessageCircle, RefreshCw, ScanEye, Sprout } from 'lucide-react'
import { useAi } from '@/context/AiContext'
import { formatDateLabel } from '@/utils/format'
import type { HistoryItem } from '@/services/aiService'
import { useLanguage } from '@/context/LanguageContext'

type FilterKey = 'ALL' | 'CHAT' | 'SOIL_REPORT' | 'CROP_ADVISOR' | 'DISEASE_DETECTION' | 'FERTILIZER_ADVICE' | 'IRRIGATION_ADVICE' | 'CROP_ROTATION' | 'WEATHER_ADVICE'

const SUBTYPE_ICON: Record<string, typeof History> = {
  CROP_ADVISOR: Sprout,
  DISEASE_DETECTION: ScanEye,
  FERTILIZER_ADVICE: Leaf,
  IRRIGATION_ADVICE: Droplets,
  CROP_ROTATION: RefreshCw,
  WEATHER_ADVICE: FlaskConical,
}

function iconFor(item: HistoryItem) {
  if (item.kind === 'SOIL_REPORT') return FlaskConical
  if (item.kind === 'CHAT') return MessageCircle
  return SUBTYPE_ICON[item.subtype ?? ''] ?? History
}

/** Which filter key a given history item belongs to. */
function filterKeyFor(item: HistoryItem): FilterKey {
  if (item.kind === 'CHAT') return 'CHAT'
  if (item.kind === 'SOIL_REPORT') return 'SOIL_REPORT'
  return (item.subtype as FilterKey) ?? 'ALL'
}
/** Where tapping this item should take the person — every kind is openable. */
function linkFor(item: HistoryItem): string {
  if (item.kind === 'CHAT') return `/ai/chat/${item.id}`
  if (item.kind === 'SOIL_REPORT') return `/ai/history/soil/${item.id}`
  return `/ai/history/crop/${item.id}`
}

export default function AiHistoryPage() {
  const { t } = useLanguage()
  const { history, isLoadingHistory } = useAi()
  const [filter, setFilter] = useState<FilterKey>('ALL')

  const filterLabels: Record<FilterKey, string> = {
    ALL: t('aiHistory.filterAll'),
    CHAT: t('aiHistory.filterChat'),
    CROP_ADVISOR: t('aiHistory.filterCropAdvisor'),
    DISEASE_DETECTION: t('aiHistory.filterDisease'),
    SOIL_REPORT: t('aiHistory.filterSoil'),
    FERTILIZER_ADVICE: t('aiHistory.filterFertilizer'),
    IRRIGATION_ADVICE: t('aiHistory.filterIrrigation'),
    CROP_ROTATION: t('aiHistory.filterCropRotation'),
    WEATHER_ADVICE: t('aiHistory.filterWeather'),
  }

  const FILTERS: { key: FilterKey; label: string; icon: typeof History }[] = [
    { key: 'ALL', label: filterLabels.ALL, icon: History },
    { key: 'CHAT', label: filterLabels.CHAT, icon: MessageCircle },
    { key: 'CROP_ADVISOR', label: filterLabels.CROP_ADVISOR, icon: Sprout },
    { key: 'DISEASE_DETECTION', label: filterLabels.DISEASE_DETECTION, icon: ScanEye },
    { key: 'SOIL_REPORT', label: filterLabels.SOIL_REPORT, icon: FlaskConical },
    { key: 'FERTILIZER_ADVICE', label: filterLabels.FERTILIZER_ADVICE, icon: Leaf },
    { key: 'IRRIGATION_ADVICE', label: filterLabels.IRRIGATION_ADVICE, icon: Droplets },
    { key: 'CROP_ROTATION', label: filterLabels.CROP_ROTATION, icon: RefreshCw },
    { key: 'WEATHER_ADVICE', label: filterLabels.WEATHER_ADVICE, icon: FlaskConical },
  ]

  function labelFor(item: HistoryItem) {
    if (item.kind === 'SOIL_REPORT') return t('aiHistory.filterSoil')
    if (item.kind === 'CHAT') return t('aiHistory.filterChat')
    const subtype = item.subtype as FilterKey | undefined
    return (subtype && filterLabels[subtype]) || t('aiHistory.title')
  }

  const availableFilters = useMemo(() => {
    const present = new Set(history.map(filterKeyFor))
    return FILTERS.filter((f) => f.key === 'ALL' || present.has(f.key))
  }, [history, FILTERS])

  const filtered = useMemo(
    () => (filter === 'ALL' ? history : history.filter((item) => filterKeyFor(item) === filter)),
    [history, filter]
  )

  if (isLoadingHistory && history.length === 0) {
    return <div className="flex min-h-[60vh] items-center justify-center text-sm text-ink-400">{t('common.loading')}</div>
  }

  if (history.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <History className="mb-3 h-12 w-12 text-ink-300" aria-hidden="true" />
        <p className="text-sm text-ink-500">{t('aiHistory.emptyTitle')}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl">{t('aiHistory.title')}</h1>

      {/* Filter by AI tool — only shows tools that actually appear in this person's history */}
      {availableFilters.length > 2 && (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {availableFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === f.key ? 'bg-brand-600 text-white' : 'bg-surface-sunk text-ink-600 hover:bg-ink-100'
              }`}
            >
              <f.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {f.label}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-ink-400">{t('aiHistory.noEntries')}</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((entry) => {
            const Icon = iconFor(entry)
            return (
              <Link
                key={entry.id}
                to={linkFor(entry)}
                className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-surface p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-sunk text-brand-700">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-ink-900">{labelFor(entry)}</p>
                    <span className="shrink-0 text-[11px] text-ink-400">{formatDateLabel(entry.createdAt)}</span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-ink-500">{entry.summary}</p>
                </div>
                <ChevronRight className="mt-1.5 h-4 w-4 shrink-0 text-ink-300" aria-hidden="true" />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

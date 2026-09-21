import { useEffect, useState, type FormEvent } from 'react'
import { AlertTriangle, RefreshCw, Sprout } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { SelectField } from '@/components/common/FormField'
import { useAi } from '@/context/AiContext'
import { useLanguage } from '@/context/LanguageContext'
import { cropAnalysisService, type AdvisoryResult } from '@/services/aiService'
import { getApiErrorMessage } from '@/services/api'
import { mandiService } from '@/services/mandiService'
import { formatCropName, formatSoilName } from '@/utils/localize'

export default function CropRotationPage() {
  const { t, language } = useLanguage()
  const [crops, setCrops] = useState<string[]>([])
  const [current, setCurrent] = useState('')
  const [soil, setSoil] = useState('Black soil')
  const [result, setResult] = useState<AdvisoryResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { refreshHistory } = useAi()

  useEffect(() => {
    let cancelled = false
    mandiService.getCrops()
      .then((response) => {
        const items = response?.data ?? response ?? []
        const names = Array.isArray(items)
          ? items.map((item: { name?: string } | string) => typeof item === 'string' ? item : item.name).filter((name): name is string => Boolean(name))
          : []
        if (!cancelled) {
          setCrops(names)
          if (names.length > 0) {
            setCurrent(names[0])
          }
        }
      })
      .catch((err) => {
        console.error('Failed to load crops', err)
      })
    return () => { cancelled = true }
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const advice = await cropAnalysisService.cropRotation({ currentCrop: current, soilType: soil, language })
      setResult(advice)
      refreshHistory()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not build a rotation plan right now.'))
    } finally {
      setIsLoading(false)
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-md px-4 py-6 md:px-6 md:py-8">
        <h1 className="mb-1 text-xl">{t('cropRotation.planTitle')}</h1>
        <p className="mb-4 text-xs text-ink-400">
          {t('cropRotation.currentlyGrowing', { crop: formatCropName(current, language) })}
        </p>

        {result.suggestedNextCrops && result.suggestedNextCrops.length > 0 && (
          <div className="mb-4 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">{t('cropRotation.suggestedNext')}</span>
            <div className="flex flex-wrap justify-center gap-2">
              {result.suggestedNextCrops.map((c) => (
                <span key={c} className="flex items-center gap-1.5 rounded-2xl border border-brand-300 bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-800">
                  <Sprout className="h-4 w-4" aria-hidden="true" />
                  {formatCropName(c, language)}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm leading-relaxed text-ink-700">{result.summary}</p>

        {result.rotationPlan && (
          <div className="mt-4 rounded-2xl bg-brand-50 p-3.5 text-sm text-brand-800">{result.rotationPlan}</div>
        )}

        {result.recommendations && result.recommendations.length > 0 && (
          <div className="mt-3 space-y-2">
            {result.recommendations.map((r) => (
              <div key={r} className="rounded-2xl border border-ink-100 bg-surface p-3.5 text-sm text-ink-700">
                {r}
              </div>
            ))}
          </div>
        )}

        {result.warnings && result.warnings.length > 0 && (
          <div className="mt-3 space-y-2">
            {result.warnings.map((w) => (
              <div key={w} className="flex items-start gap-2 rounded-xl bg-gold-50 p-3 text-sm text-gold-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {w}
              </div>
            ))}
          </div>
        )}

        <Button variant="secondary" className="mt-5" onClick={() => setResult(null)}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {t('cropRotation.planAnother')}
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-1 text-xl">{t('cropRotation.title')}</h1>
      <p className="mb-6 text-sm text-ink-500">{t('cropRotation.subtitle')}</p>

      <form onSubmit={handleSubmit}>
        <SelectField id="current" label={t('cropRotation.currentCropLabel')} value={current} onChange={(e) => setCurrent(e.target.value)}>
          {crops.map((c) => (
            <option key={c} value={c}>{formatCropName(c, language)}</option>
          ))}
        </SelectField>
        <SelectField id="soil" label={t('cropRotation.soilTypeLabel')} value={soil} onChange={(e) => setSoil(e.target.value)}>
          {['Black soil', 'Alluvial soil', 'Red soil', 'Loamy soil'].map((s) => (
            <option key={s} value={s}>{formatSoilName(s, language)}</option>
          ))}
        </SelectField>
        {error && <p className="mb-3 text-xs font-medium text-danger-500">{error}</p>}
        <Button type="submit" fullWidth loading={isLoading} disabled={!crops.length || !current.trim()}>
          {t('cropRotation.getRotationPlan')}
        </Button>
      </form>
    </div>
  )
}

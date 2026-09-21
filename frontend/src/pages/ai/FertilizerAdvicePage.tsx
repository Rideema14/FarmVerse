import { useEffect, useState, type FormEvent } from 'react'
import { AlertTriangle, Leaf, RotateCcw } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { SelectField } from '@/components/common/FormField'
import { useAi } from '@/context/AiContext'
import { useLanguage } from '@/context/LanguageContext'
import { cropAnalysisService, type AdvisoryResult } from '@/services/aiService'
import { getApiErrorMessage } from '@/services/api'
import { mandiService } from '@/services/mandiService'
import { formatCropName, formatGrowthStage, formatSoilName } from '@/utils/localize'

const STAGES = ['Sowing', 'Vegetative growth', 'Flowering', 'Grain filling']

export default function FertilizerAdvicePage() {
  const { t, language } = useLanguage()
  const [crops, setCrops] = useState<string[]>([])
  const [crop, setCrop] = useState('')
  const [soil, setSoil] = useState('Black soil')
  const [stage, setStage] = useState(STAGES[0])
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
            setCrop(names[0])
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
      const advice = await cropAnalysisService.fertilizerAdvice({ cropType: crop, soilType: soil, growthStage: stage, language })
      setResult(advice)
      refreshHistory()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not get fertilizer advice right now.'))
    } finally {
      setIsLoading(false)
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-lg px-4 py-6 md:px-6 md:py-8">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-50 text-gold-600">
          <Leaf className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className="text-xs text-ink-400">
          {t('fertilizerAdvice.stageInfo', { crop: formatCropName(crop, language), stage: formatGrowthStage(stage, language) })}
        </p>
        <h1 className="mt-1 text-xl">{result.summary}</h1>

        {result.npkGuidance && (
          <div className="mt-5 rounded-2xl border border-ink-100 bg-surface p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{t('fertilizerAdvice.npkGuidance')}</p>
            <p className="mt-1 text-sm text-ink-700">{result.npkGuidance}</p>
          </div>
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
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {t('fertilizerAdvice.newRecommendation')}
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-1 text-xl">{t('fertilizerAdvice.title')}</h1>
      <p className="mb-5 text-sm text-ink-500">{t('fertilizerAdvice.subtitle')}</p>
      <form onSubmit={handleSubmit}>
        <SelectField id="crop" label={t('fertilizerAdvice.cropLabel')} value={crop} onChange={(e) => setCrop(e.target.value)}>
          {crops.map((c) => (
            <option key={c} value={c}>{formatCropName(c, language)}</option>
          ))}
        </SelectField>
        <SelectField id="soil" label={t('fertilizerAdvice.soilTypeLabel')} value={soil} onChange={(e) => setSoil(e.target.value)}>
          {['Black soil', 'Alluvial soil', 'Red soil', 'Loamy soil'].map((s) => (
            <option key={s} value={s}>{formatSoilName(s, language)}</option>
          ))}
        </SelectField>
        <SelectField id="stage" label={t('fertilizerAdvice.growthStageLabel')} value={stage} onChange={(e) => setStage(e.target.value)}>
          {STAGES.map((s) => (
            <option key={s} value={s}>{formatGrowthStage(s, language)}</option>
          ))}
        </SelectField>
        {error && <p className="mb-3 text-xs font-medium text-danger-500">{error}</p>}
        <Button type="submit" fullWidth loading={isLoading} disabled={!crops.length || !crop.trim()}>
          {t('fertilizerAdvice.getAdvice')}
        </Button>
      </form>
    </div>
  )
}

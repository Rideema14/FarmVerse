import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle, Banknote, Check, Landmark, MapPin, Sprout, User, X } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { formatDateLabel } from '@/utils/format'
import { cn } from '@/utils/cn'
import type { SellerApplication } from '@/services/sellerService'

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-gold-50 text-gold-700',
  APPROVED: 'bg-brand-50 text-brand-700',
  REJECTED: 'bg-danger-50 text-danger-500',
}

interface Row {
  label: string
  value: string
}

function DetailSection({ icon, title, rows }: { icon: ReactNode; title: string; rows: Row[] }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-surface-sunk/40 p-4">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">
        {icon}
        {title}
      </p>
      <dl className="space-y-1.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
            <dt className="text-ink-500">{row.label}</dt>
            <dd className="text-right font-medium text-ink-900">{row.value || '—'}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

interface SellerDetailModalProps {
  application: SellerApplication | null
  busy: boolean
  onClose: () => void
  onApprove: (id: string) => Promise<void>
  onReject: (id: string, note: string) => Promise<void>
  onRevoke: (id: string, note: string) => Promise<void>
}

export function SellerDetailModal({ application, busy, onClose, onApprove, onReject, onRevoke }: SellerDetailModalProps) {
  const [mode, setMode] = useState<'view' | 'reject' | 'revoke'>('view')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setMode('view')
    setReason('')
    setError('')
  }, [application?.id])

  useEffect(() => {
    if (!application) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [application, onClose])

  if (!application) return null

  async function submitReason(action: 'reject' | 'revoke') {
    const trimmed = reason.trim()
    if (trimmed.length < 3) {
      setError('Enter a reason (at least 3 characters).')
      return
    }
    setError('')
    if (action === 'reject') await onReject(application!.id, trimmed)
    else await onRevoke(application!.id, trimmed)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seller-detail-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-ink-100 bg-surface px-5 py-4">
          <div className="min-w-0">
            <h2 id="seller-detail-title" className="truncate text-base font-semibold text-ink-900">
              {application.businessName}
            </h2>
            <p className="mt-1">
              <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize', STATUS_STYLES[application.status])}>
                {application.status.toLowerCase()}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-surface-sunk hover:text-ink-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-3 px-5 py-4">
          <DetailSection
            icon={<User className="h-3.5 w-3.5" aria-hidden="true" />}
            title="Applicant"
            rows={[
              { label: 'Name', value: application.applicantName },
              { label: 'Email', value: application.applicantEmail },
              { label: 'Phone', value: application.applicantPhone ?? '' },
              { label: 'Applied', value: formatDateLabel(application.createdAt) },
              ...(application.reviewedAt ? [{ label: 'Last reviewed', value: formatDateLabel(application.reviewedAt) }] : []),
            ]}
          />

          <DetailSection
            icon={<Sprout className="h-3.5 w-3.5" aria-hidden="true" />}
            title="Farming details"
            rows={[
              { label: 'Farm size', value: application.farmSizeAcres != null ? `${application.farmSizeAcres} acres` : '' },
              { label: 'Primary crop', value: application.primaryCrop ?? '' },
              { label: 'GST number', value: application.gstNumber ?? '' },
            ]}
          />

          <DetailSection
            icon={<MapPin className="h-3.5 w-3.5" aria-hidden="true" />}
            title="Location"
            rows={[{ label: 'Village / Town', value: application.village ?? '' }]}
          />

          <DetailSection
            icon={<Landmark className="h-3.5 w-3.5" aria-hidden="true" />}
            title="Bank / payout details"
            rows={[
              { label: 'Account holder', value: application.bankAccountHolder ?? '' },
              { label: 'Bank name', value: application.bankName ?? '' },
              { label: 'Account number', value: application.bankAccountNumber ?? '' },
              { label: 'IFSC code', value: application.bankIfscCode ?? '' },
            ]}
          />

          {application.verificationNote && (
            <div className="rounded-2xl border border-ink-100 bg-surface-sunk/40 p-4">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">
                <Banknote className="h-3.5 w-3.5" aria-hidden="true" />
                Note on file
              </p>
              <p className="text-sm text-ink-700">{application.verificationNote}</p>
            </div>
          )}

          {mode !== 'view' && (
            <div className="rounded-2xl border border-danger-100 bg-danger-50/60 p-4">
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-danger-600">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                {mode === 'reject' ? 'Reason for rejecting' : 'Reason for removing this seller'}
              </p>
              <textarea
                autoFocus
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={mode === 'reject' ? 'e.g. Bank details do not match account holder name.' : 'e.g. Repeated buyer complaints about product quality.'}
                className="w-full rounded-xl border border-ink-200 bg-surface p-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none"
              />
              {error && <p className="mt-1.5 text-xs text-danger-600">{error}</p>}
              {mode === 'revoke' && (
                <p className="mt-1.5 text-xs text-ink-500">This demotes them to a buyer and deactivates all of their product listings.</p>
              )}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex flex-wrap gap-2 border-t border-ink-100 bg-surface px-5 py-4">
          {mode === 'view' && application.status === 'PENDING' && (
            <>
              <Button
                variant="primary"
                className="flex-1"
                disabled={busy}
                loading={busy}
                onClick={() => onApprove(application.id)}
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                Approve
              </Button>
              <Button variant="danger" className="flex-1" disabled={busy} onClick={() => setMode('reject')}>
                <X className="h-4 w-4" aria-hidden="true" />
                Reject
              </Button>
            </>
          )}

          {mode === 'view' && application.status === 'APPROVED' && (
            <Button variant="danger" fullWidth disabled={busy} onClick={() => setMode('revoke')}>
              Remove Seller
            </Button>
          )}

          {mode === 'view' && application.status === 'REJECTED' && (
            <p className="text-sm text-ink-500">This applicant can re-submit from their end; no action needed here.</p>
          )}

          {mode !== 'view' && (
            <>
              <Button variant="secondary" className="flex-1" disabled={busy} onClick={() => { setMode('view'); setReason(''); setError('') }}>
                Cancel
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                disabled={busy}
                loading={busy}
                onClick={() => submitReason(mode)}
              >
                {mode === 'reject' ? 'Confirm Rejection' : 'Confirm Removal'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

import { useState } from 'react'
import { Eye } from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'
import { formatDateLabel } from '@/utils/format'
import { cn } from '@/utils/cn'
import type { SellerApplication } from '@/services/sellerService'
import { SellerDetailModal } from './SellerDetailModal'

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-gold-50 text-gold-700',
  APPROVED: 'bg-brand-50 text-brand-700',
  REJECTED: 'bg-danger-50 text-danger-500',
}

export default function AdminSellersPage() {
  const { sellerApplications, isLoadingApplications, approveApplication, rejectApplication, revokeSeller } = useAdmin()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const selected: SellerApplication | null = sellerApplications.find((a) => a.id === selectedId) ?? null

  async function handleApprove(id: string) {
    setBusyId(id)
    try {
      await approveApplication(id)
      setSelectedId(null)
    } finally {
      setBusyId(null)
    }
  }

  async function handleReject(id: string, note: string) {
    setBusyId(id)
    try {
      await rejectApplication(id, note)
      setSelectedId(null)
    } finally {
      setBusyId(null)
    }
  }

  async function handleRevoke(id: string, note: string) {
    setBusyId(id)
    try {
      await revokeSeller(id, note)
      setSelectedId(null)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 md:px-6 md:py-8">
      <h1 className="mb-1 text-xl">Sellers</h1>
      <p className="mb-5 text-sm text-ink-500">Review seller applications and verification status. Open a seller to see their full details before approving, rejecting, or removing them.</p>

      {isLoadingApplications ? (
        <p className="py-10 text-center text-sm text-ink-400">Loading…</p>
      ) : sellerApplications.length === 0 ? (
        <p className="py-10 text-center text-sm text-ink-500">No seller applications yet.</p>
      ) : (
        <div className="space-y-2">
          {sellerApplications.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => setSelectedId(app.id)}
              className="flex w-full items-center justify-between rounded-2xl border border-ink-100 bg-surface p-4 text-left transition-colors hover:bg-surface-sunk"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink-900">{app.businessName}</p>
                <p className="truncate text-xs text-ink-500">{app.applicantName} · {app.applicantEmail}</p>
                <p className="text-[11px] text-ink-400">Applied {formatDateLabel(app.createdAt)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize', STATUS_STYLES[app.status])}>
                  {app.status.toLowerCase()}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sunk text-ink-600">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      <SellerDetailModal
        application={selected}
        busy={busyId === selected?.id}
        onClose={() => setSelectedId(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        onRevoke={handleRevoke}
      />
    </div>
  )
}

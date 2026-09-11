import { api } from './api'

export type SellerVerificationStatus = 'UNSUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED'

export interface SellerApplyInput {
  businessName: string
  gstNumber?: string
  farmSizeAcres: number
  primaryCrop: string
  village: string
  bankAccountHolder: string
  bankAccountNumber: string
  bankIfscCode: string
  bankName: string
}

export interface SellerProfile {
  id: string
  userId: string
  businessName: string
  farmSizeAcres?: number | null
  primaryCrop?: string | null
  village?: string | null
  bankAccountHolder?: string | null
  bankAccountNumber?: string | null
  bankIfscCode?: string | null
  bankName?: string | null
  verificationStatus: SellerVerificationStatus
  verificationNote?: string | null
  createdAt: string
}

export interface SellerDashboard {
  activeListings: number
  totalListings: number
  ordersToFulfill: number
  totalRevenue: number
  revenueLast30Days: number
}

export interface SalesTrendPoint {
  date: string
  revenue: number
  orderCount: number
}
export interface TopProduct {
  id: string
  name: string
  slug: string
  unitsSold: number
  revenue: number
}
export interface StatusBreakdownRow {
  status: string
  count: number
}
export interface SellerAnalytics {
  salesTrend: SalesTrendPoint[]
  topProducts: TopProduct[]
  statusBreakdown: StatusBreakdownRow[]
}

export interface SellerReview {
  id: string
  rating: number
  comment?: string | null
  createdAt: string
  user: { id: string; name: string; profileImage?: string | null }
  product: { id: string; name: string; slug: string; images: { url: string }[] }
}

interface BackendSellerApplication {
  id: string
  businessName: string
  businessDescription?: string | null
  gstNumber?: string | null
  farmSizeAcres?: number | null
  primaryCrop?: string | null
  village?: string | null
  bankAccountHolder?: string | null
  bankAccountNumber?: string | null
  bankIfscCode?: string | null
  bankName?: string | null
  verificationStatus: SellerVerificationStatus
  verificationNote?: string | null
  reviewedAt?: string | null
  createdAt: string
  user: { id: string; name: string; email: string; phone?: string | null }
}

// Full detail the admin sees when reviewing a single seller — everything
// they submitted, not just the summary shown in the list row.
export interface SellerApplication {
  id: string
  userId: string
  businessName: string
  status: SellerVerificationStatus
  createdAt: string
  reviewedAt?: string | null
  verificationNote?: string | null
  applicantName: string
  applicantEmail: string
  applicantPhone?: string | null
  gstNumber?: string | null
  farmSizeAcres?: number | null
  primaryCrop?: string | null
  village?: string | null
  bankAccountHolder?: string | null
  bankAccountNumber?: string | null
  bankIfscCode?: string | null
  bankName?: string | null
}

function mapApplication(a: BackendSellerApplication): SellerApplication {
  return {
    id: a.id,
    userId: a.user.id,
    businessName: a.businessName,
    status: a.verificationStatus,
    createdAt: a.createdAt,
    reviewedAt: a.reviewedAt,
    verificationNote: a.verificationNote,
    applicantName: a.user.name,
    applicantEmail: a.user.email,
    applicantPhone: a.user.phone,
    gstNumber: a.gstNumber,
    farmSizeAcres: a.farmSizeAcres,
    primaryCrop: a.primaryCrop,
    village: a.village,
    bankAccountHolder: a.bankAccountHolder,
    bankAccountNumber: a.bankAccountNumber,
    bankIfscCode: a.bankIfscCode,
    bankName: a.bankName,
  }
}

export const sellerService = {
  async getMyProfile(): Promise<SellerProfile> {
    const res = await api.get<{ data: SellerProfile }>('/sellers/me')
    return res.data.data
  },

  async apply(input: SellerApplyInput): Promise<SellerProfile> {
    const res = await api.post<{ data: SellerProfile }>('/sellers/apply', input)
    return res.data.data
  },

  async getDashboard(): Promise<SellerDashboard> {
    const res = await api.get<{ data: SellerDashboard }>('/sellers/dashboard')
    return res.data.data
  },

  async getAnalytics(days = 180, topProductsLimit = 8): Promise<SellerAnalytics> {
    const res = await api.get<{ data: SellerAnalytics }>('/sellers/analytics', { params: { days, topProductsLimit } })
    return res.data.data
  },

  async getReviews(params: { page?: number; limit?: number } = {}): Promise<{ items: SellerReview[]; meta: { totalItems: number } }> {
    const res = await api.get<{ data: SellerReview[]; meta: { pagination: { totalItems: number } } }>('/sellers/reviews', { params })
    return { items: res.data.data, meta: { totalItems: res.data.meta.pagination.totalItems } }
  },

  async listApplications(status?: SellerVerificationStatus): Promise<SellerApplication[]> {
    const res = await api.get<{ data: BackendSellerApplication[] }>('/sellers/applications', {
      params: { status, limit: 100 },
    })
    return res.data.data
      .map(mapApplication)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  async reviewApplication(id: string, decision: 'APPROVE' | 'REJECT', note?: string): Promise<SellerVerificationStatus> {
    const res = await api.patch<{ data: { verificationStatus: SellerVerificationStatus } }>(
      `/sellers/applications/${id}/review`,
      { decision, note },
    )
    return res.data.data.verificationStatus
  },

  /** Removes an already-approved seller: demotes them to a buyer and deactivates their listings. */
  async revoke(id: string, note: string): Promise<SellerVerificationStatus> {
    const res = await api.post<{ data: { verificationStatus: SellerVerificationStatus } }>(
      `/sellers/applications/${id}/revoke`,
      { note },
    )
    return res.data.data.verificationStatus
  },
}

import type { ComponentType } from 'react'
import type { TranslationKey } from '@/context/LanguageContext'
import { AdminSellerNavIcon } from '@/components/layout/AdminSellerNavIcon'
import {
  HomeIcon,
  MarketIcon,
  LandIcon,
  OrdersIcon,
  MandiIcon,
  MachineryIcon,
  WeatherIcon,
  AiIcon,
  SeedsIcon,
  NotificationsIcon,
  SettingsIcon,
  DashboardIcon,
  ListingsIcon,
  AddProductIcon,
  AnalyticsIcon,
  UsersIcon,
  CategoriesIcon,
  ReviewsIcon,
  PayoutsIcon,
  ShipmentsIcon,
  FeedbackIcon,
  type NavIconProps,
} from '@/components/layout/CategoryIcons'

/** Any component that can render into the nav's icon slot: our own
 *  pictorial icons (fixed props), or a lucide-react icon / custom badge
 *  icon like AdminSellerNavIcon (which accepts extra SVG props too). */
export type NavIconComponent = ComponentType<NavIconProps>

export interface NavItem {
  path: string
  labelKey: TranslationKey
  icon: NavIconComponent
  /** Soft tile background tint for this item, so every icon sits inside
   *  its own colour — the "Blinkit/Instamart" look — instead of every tile
   *  being the same flat grey until tapped. */
  color: string
}

export const buyNavItems: NavItem[] = [
  { path: '/home', labelKey: 'nav.home', icon: HomeIcon, color: '#1E9E5A' },
  { path: '/market', labelKey: 'nav.market', icon: MarketIcon, color: '#E4572E' },
  { path: '/land', labelKey: 'nav.land', icon: LandIcon, color: '#7BAE44' },
  { path: '/orders', labelKey: 'nav.orders', icon: OrdersIcon, color: '#3FA34D' },
  { path: '/mandi', labelKey: 'nav.mandi', icon: MandiIcon, color: '#7C3AED' },
  { path: '/machinery', labelKey: 'nav.machinery', icon: MachineryIcon, color: '#DC2626' },
  { path: '/weather', labelKey: 'nav.weather', icon: WeatherIcon, color: '#0284C7' },
  { path: '/ai', labelKey: 'nav.ai', icon: AiIcon, color: '#0D9488' },
  { path: '/seeds', labelKey: 'nav.seeds', icon: SeedsIcon, color: '#CA8A04' },
]

export const sellNavItems: NavItem[] = [
  { path: '/seller/dashboard', labelKey: 'nav.sellerDashboard', icon: DashboardIcon, color: '#0D9488' },
  { path: '/seller/listings', labelKey: 'nav.myListings', icon: ListingsIcon, color: '#4F46E5' },
  { path: '/seller/add-product', labelKey: 'nav.addProduct', icon: AddProductIcon, color: '#16A34A' },
  { path: '/seller/land', labelKey: 'nav.land', icon: LandIcon, color: '#7BAE44' },
  { path: '/seller/machinery', labelKey: 'nav.machinery', icon: MachineryIcon, color: '#DC2626' },
  { path: '/seller/orders', labelKey: 'nav.sellerOrders', icon: OrdersIcon, color: '#3FA34D' },
  { path: '/seller/analytics', labelKey: 'nav.analytics', icon: AnalyticsIcon, color: '#7C3AED' },
  { path: '/mandi', labelKey: 'nav.mandi', icon: MandiIcon, color: '#7C3AED' },
]

export const sellerUtilityNavItems: NavItem[] = [
  { path: '/seller/feedback', labelKey: 'nav.sellerFeedback', icon: FeedbackIcon, color: '#EC4899' },
]

export const adminNavItems: NavItem[] = [
  { path: '/admin', labelKey: 'nav.adminDashboard', icon: DashboardIcon, color: '#0D9488' },
  { path: '/admin/users', labelKey: 'nav.adminUsers', icon: UsersIcon, color: '#2563EB' },
  { path: '/admin/sellers', labelKey: 'nav.adminSellers', icon: AdminSellerNavIcon, color: '#4F46E5' },
  { path: '/admin/products', labelKey: 'nav.adminProducts', icon: MarketIcon, color: '#E4572E' },
  { path: '/admin/categories', labelKey: 'nav.adminCategories', icon: CategoriesIcon, color: '#CA8A04' },
  { path: '/admin/reviews', labelKey: 'nav.adminReviews', icon: ReviewsIcon, color: '#D97706' },
  { path: '/admin/seeds', labelKey: 'nav.adminSeeds', icon: SeedsIcon, color: '#CA8A04' },
  { path: '/admin/analytics', labelKey: 'nav.adminAnalytics', icon: AnalyticsIcon, color: '#7C3AED' },
  { path: '/admin/payouts', labelKey: 'nav.adminPayouts', icon: PayoutsIcon, color: '#059669' },
  { path: '/admin/orders', labelKey: 'nav.adminShipments', icon: ShipmentsIcon, color: '#EA580C' },
]

export const utilityNavItems: NavItem[] = [
  { path: '/notifications', labelKey: 'nav.notifications', icon: NotificationsIcon, color: '#DC2626' },
  { path: '/settings', labelKey: 'nav.settings', icon: SettingsIcon, color: '#475569' },
]

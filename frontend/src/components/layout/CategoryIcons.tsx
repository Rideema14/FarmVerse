/**
 * Pictorial, always-colorful navigation icons — the "Blinkit / Instamart"
 * look the person asked for: each one is a small multi-colour illustration
 * (a basket, a tractor, a sun-behind-cloud, a seed packet...) rather than a
 * single-tone line icon that only picks up colour when active.
 *
 * Every icon is self-contained (fixed fill colours, not `currentColor`) so
 * it reads the same whether its nav item is active or not — exactly like a
 * grocery app's category tiles stay colourful all the time.
 *
 * Shared prop shape so these can drop into the same `icon: ...` slot as a
 * lucide-react icon (which is how navConfig.ts still uses a couple, e.g.
 * AdminSellerNavIcon for the live pending-seller badge).
 */
export interface NavIconProps {
  className?: string
}

export function HomeIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 5 L35 17 V33 a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V17Z" fill="#FBEBD0" />
      <path d="M4 18 L20 5 L36 18" fill="none" stroke="#1E9E5A" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="17" y="22" width="6.5" height="13" rx="1.2" fill="#8A5A2B" />
      <circle cx="21.5" cy="28.5" r="0.9" fill="#FBEBD0" />
      <circle cx="12.5" cy="22" r="2.3" fill="#8ED1FC" />
    </svg>
  )
}

export function MarketIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 17 L11 33.5a2 2 0 0 0 2 1.8h14a2 2 0 0 0 2-1.8L31 17Z" fill="#E9C79A" />
      <path d="M9 17h22" stroke="#8A5A2B" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M14 17c0-5 3-9 6-9s6 4 6 9" fill="none" stroke="#8A5A2B" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="17" cy="24" r="3.2" fill="#E4572E" />
      <path d="M16 21.5c.3-1.6 1.6-2.6 2.6-2.6" stroke="#3FA34D" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M24 22 L27.4 22 L26.2 28 L23.8 28 Z" fill="#F2994A" />
      <path d="M25.5 22 C25.5 20 26.5 19 27.3 18.8" stroke="#3FA34D" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function LandIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 26c4-3 8-3 12 0s8 3 12 0 8-3 8-3v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" fill="#A3672E" />
      <path d="M4 21c4-3 8-3 12 0s8 3 12 0 8-3 8-3v6c-4 3-8 3-12 0s-8-3-12 0-8 3-8 3Z" fill="#7BAE44" />
      <path d="M20 18v-6" stroke="#3FA34D" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 12c0-2.5 2-4 4-4-0 2.5-1.5 4-4 4Z" fill="#3FA34D" />
      <path d="M20 14c0-2.2-1.8-3.6-3.6-3.6.2 2.2 1.4 3.6 3.6 3.6Z" fill="#57C26B" />
    </svg>
  )
}

export function OrdersIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 13 L20 7 L33 13 V28 L20 34 L7 28 Z" fill="#E9C79A" />
      <path d="M7 13 L20 19 L33 13 M20 19 V34" fill="none" stroke="#8A5A2B" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13.5 10 L26.5 16" stroke="#8A5A2B" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="29" cy="26" r="7" fill="#3FA34D" />
      <path d="M25.8 26.2 L27.8 28.4 L32.2 23.6" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MandiIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 19 L19 6 h13a2 2 0 0 1 2 2v13 L21 34a2 2 0 0 1-2.8 0L6 21.8a2 2 0 0 1 0-2.8Z" fill="#B197FC" />
      <circle cx="27" cy="13" r="2.6" fill="#FFFFFF" />
      <path d="M14 26 v-4 M18.5 26 v-7 M23 26 v-10" stroke="#4C1D95" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function MachineryIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="16" y="10" width="12" height="9" rx="1.5" fill="#DC2626" />
      <rect x="18.5" y="12.3" width="7" height="4" rx="0.6" fill="#FCA5A5" />
      <path d="M22 19h9a2 2 0 0 1 2 2v3H22Z" fill="#B91C1C" />
      <circle cx="13" cy="27" r="6.4" fill="#1F2937" />
      <circle cx="13" cy="27" r="2.6" fill="#9CA3AF" />
      <circle cx="30" cy="28" r="4.2" fill="#1F2937" />
      <circle cx="30" cy="28" r="1.7" fill="#9CA3AF" />
      <rect x="6" y="24" width="6" height="2.4" rx="1.2" fill="#4B5563" />
    </svg>
  )
}

export function WeatherIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="14" r="7" fill="#FBBF24" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1={16 + Math.cos((deg * Math.PI) / 180) * 10.5}
          y1={14 + Math.sin((deg * Math.PI) / 180) * 10.5}
          x2={16 + Math.cos((deg * Math.PI) / 180) * 13}
          y2={14 + Math.sin((deg * Math.PI) / 180) * 13}
          stroke="#FBBF24"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      <path
        d="M11 32c-3.3 0-6-2.4-6-5.4 0-2.7 2.1-5 4.8-5.4C10.5 18 13.4 16 17 16c4 0 7.3 2.7 8 6.3 3 .3 5.3 2.6 5.3 5.5 0 3-2.7 5.4-6 5.4Z"
        fill="#E0F2FE"
        stroke="#7DD3FC"
        strokeWidth="1.4"
      />
    </svg>
  )
}

export function AiIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 12a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H18l-6 5v-5h-3a4 4 0 0 1-4-4Z" fill="#0D9488" />
      <path d="M20 10.5 L21.6 14.4 L25.5 16 L21.6 17.6 L20 21.5 L18.4 17.6 L14.5 16 L18.4 14.4 Z" fill="#FDE68A" />
      <circle cx="25.5" cy="10.5" r="1.6" fill="#FDE68A" />
    </svg>
  )
}

export function SeedsIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 12 L20 6 L31 12 V30a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2Z" fill="#E9B949" />
      <path d="M9 12 L20 18 L31 12" fill="none" stroke="#A66A0F" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="14" y="22" width="12" height="3.2" rx="1.6" fill="#FFF6E0" />
      <path d="M20 22v-4" stroke="#3FA34D" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 18c0-1.8 1.4-3 3-3-.1 1.8-1.3 3-3 3Z" fill="#57C26B" />
      <path d="M20 19.4c0-1.6-1.2-2.7-2.6-2.7.1 1.6 1.1 2.7 2.6 2.7Z" fill="#3FA34D" />
    </svg>
  )
}

export function NotificationsIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M20 6c-4 0-7 3.2-7 7.2v5.4c0 1.6-.6 3.1-1.7 4.3l-1 1.1c-1 1.1-.2 2.9 1.3 2.9h16.8c1.5 0 2.3-1.8 1.3-2.9l-1-1.1a6.4 6.4 0 0 1-1.7-4.3v-5.4C27 9.2 24 6 20 6Z"
        fill="#F87171"
      />
      <path d="M16.5 29a3.5 3.5 0 0 0 7 0Z" fill="#DC2626" />
      <circle cx="27.5" cy="9" r="3.3" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="1.4" />
    </svg>
  )
}

export function SettingsIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M22.3 6.5l.7 3a10 10 0 0 1 2.9 1.7l2.9-1 2 3.4-2.3 2.1a10 10 0 0 1 0 3.4l2.3 2.1-2 3.4-2.9-1a10 10 0 0 1-2.9 1.7l-.7 3h-4.6l-.7-3a10 10 0 0 1-2.9-1.7l-2.9 1-2-3.4 2.3-2.1a10 10 0 0 1 0-3.4L9.5 13.6l2-3.4 2.9 1a10 10 0 0 1 2.9-1.7l.7-3Z"
        fill="#64748B"
      />
      <circle cx="20" cy="20" r="5.4" fill="#F1F5F9" />
      <circle cx="20" cy="20" r="3.1" fill="#475569" />
    </svg>
  )
}

export function DashboardIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="6" width="13" height="10" rx="2.4" fill="#0D9488" />
      <rect x="21" y="6" width="13" height="16" rx="2.4" fill="#5EEAD4" />
      <rect x="6" y="18" width="13" height="16" rx="2.4" fill="#5EEAD4" />
      <rect x="21" y="24" width="13" height="10" rx="2.4" fill="#0D9488" />
    </svg>
  )
}

export function ListingsIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="5" width="24" height="30" rx="3" fill="#E0E7FF" />
      <rect x="14" y="4" width="12" height="5" rx="2" fill="#4F46E5" />
      <rect x="12" y="16" width="16" height="2.6" rx="1.3" fill="#4F46E5" />
      <rect x="12" y="21.5" width="16" height="2.6" rx="1.3" fill="#818CF8" />
      <rect x="12" y="27" width="10" height="2.6" rx="1.3" fill="#818CF8" />
    </svg>
  )
}

export function AddProductIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 13 L20 7 L33 13 V28 L20 34 L7 28 Z" fill="#BBF7D0" />
      <path d="M7 13 L20 19 L33 13 M20 19 V34" fill="none" stroke="#15803D" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="29" cy="26" r="7.4" fill="#16A34A" stroke="#FFFFFF" strokeWidth="1.6" />
      <path d="M29 22.4v7.2M25.4 26h7.2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function AnalyticsIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="24" width="7" height="10" rx="1.6" fill="#C4B5FD" />
      <rect x="16.5" y="16" width="7" height="18" rx="1.6" fill="#A78BFA" />
      <rect x="27" y="9" width="7" height="25" rx="1.6" fill="#7C3AED" />
      <path d="M7 20 L15 13 L21 16 L32 6" fill="none" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function UsersIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="15" cy="14" r="5.4" fill="#2563EB" />
      <path d="M6 32c0-5.5 4-9 9-9s9 3.5 9 9Z" fill="#93C5FD" />
      <circle cx="27" cy="16" r="4.4" fill="#60A5FA" />
      <path d="M20.5 32c.6-4.6 3.6-7.4 8-7.4s7.7 3 8.2 7.4Z" fill="#BFDBFE" />
    </svg>
  )
}

export function SellersIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 10h26l2 8a4 4 0 0 1-7 2.6A4 4 0 0 1 21 23a4 4 0 0 1-7-2.4A4 4 0 0 1 5 18Z" fill="#4F46E5" />
      <rect x="9" y="20.4" width="22" height="13.6" rx="2" fill="#E0E7FF" />
      <rect x="17" y="24" width="6" height="10" rx="1.4" fill="#4F46E5" />
    </svg>
  )
}

export function CategoriesIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 12l10-5 10 5-10 5Z" fill="#FDE68A" stroke="#CA8A04" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 19l10-5 10 5-10 5Z" fill="#FCD34D" stroke="#CA8A04" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 26l10-5 10 5-10 5Z" fill="#F59E0B" stroke="#CA8A04" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="30" cy="22" r="2" fill="#A16207" />
    </svg>
  )
}

export function ReviewsIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M20 6 L24.7 15 L34.6 16.4 L27.3 23.3 L29 33 L20 28.3 L11 33 L12.7 23.3 L5.4 16.4 L15.3 15 Z"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PayoutsIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="11" width="28" height="20" rx="3" fill="#6EE7B7" />
      <path d="M5 16h28" stroke="#047857" strokeWidth="1.8" />
      <circle cx="26" cy="23" r="4" fill="#FFFFFF" stroke="#047857" strokeWidth="1.6" />
      <path d="M8 11c1-3 3.5-5 7-5h11" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ShipmentsIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="14" width="18" height="12" rx="1.6" fill="#EA580C" />
      <path d="M21 18h6l5 4v4h-11Z" fill="#FDBA74" />
      <rect x="3" y="14" width="18" height="12" rx="1.6" fill="none" stroke="#C2410C" strokeWidth="1" />
      <circle cx="10" cy="29" r="3.4" fill="#1F2937" />
      <circle cx="27" cy="29" r="3.4" fill="#1F2937" />
      <circle cx="10" cy="29" r="1.3" fill="#9CA3AF" />
      <circle cx="27" cy="29" r="1.3" fill="#9CA3AF" />
    </svg>
  )
}

export function FeedbackIcon({ className }: NavIconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 10a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H18l-6 5v-5h-0a4 4 0 0 1-4-4Z" fill="#EC4899" />
      <path
        d="M20 12.6c-1-1.6-3.6-1.6-4.4.2-.7 1.6.4 3 4.4 6 4-3 5.1-4.4 4.4-6-.8-1.8-3.4-1.8-4.4-.2Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

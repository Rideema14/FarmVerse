import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
export function RequireAuth() {
  const { isAuthenticated, isAdmin, isSeller } = useAuth()
  const location = useLocation()
  if (!isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?next=${next}`} replace />
  }
  if (location.pathname.startsWith('/admin') && !isAdmin) return <Navigate to="/home" replace />
  // Onboarding is how a buyer BECOMES a seller, so it must stay reachable
  // for non-sellers. Every other /seller/* route still requires isSeller.
  const isOnboardingRoute = location.pathname.startsWith('/seller/onboarding')
  if (location.pathname.startsWith('/seller') && !isOnboardingRoute && !isSeller) {
    return <Navigate to="/home" replace />
  }
  return <Outlet />
}

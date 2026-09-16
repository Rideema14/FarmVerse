import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Why "it works on my laptop but not on a farmer's phone":
 *
 * 1. SECURE CONTEXT — Chrome/Safari on mobile refuse to run the Geolocation
 *    API at all on a plain "http://" page. Desktop Chrome quietly makes an
 *    exception for "http://localhost", so a dev testing on their own
 *    machine never notices — but the same dev server opened from a phone
 *    (e.g. "http://192.168.x.x:5173", or any non-HTTPS production URL)
 *    fails silently. `window.isSecureContext` tells us this up front so we
 *    can show a real message instead of a permanently-loading spinner.
 *
 * 2. USER GESTURE — iOS Safari and most in-app browsers (WhatsApp,
 *    Instagram, Facebook) will silently ignore a `getCurrentPosition()`
 *    call that fires automatically on page load / in a `useEffect`. It
 *    only reliably prompts when called directly inside a click/tap
 *    handler. So we only auto-fire when the Permissions API confirms
 *    access is *already* granted; otherwise we wait for the person to tap
 *    an explicit "Use my location" button.
 *
 * 3. SILENT FAILURE — the old code treated every failure the same way
 *    (fall back to Delhi, no explanation). Farmers then see numbers for a
 *    city they've never been to with no indication anything went wrong.
 *    This hook reports *why* it failed so the UI can explain it and offer
 *    a retry or a manual location instead.
 */

export type GeoStatus =
  | 'idle'
  | 'locating'
  | 'success'
  | 'denied'
  | 'unavailable'
  | 'insecure'
  | 'timeout'

export interface GeoCoords {
  latitude: number
  longitude: number
}

interface GeoState {
  status: GeoStatus
  coords: GeoCoords | null
}

interface UseGeolocationOptions {
  /** Auto-fetch on mount, but ONLY if the browser reports permission is
   *  already 'granted' (checked via the Permissions API where supported).
   *  Never auto-fires a fresh prompt, since mobile browsers routinely
   *  swallow those. Default true. */
  autoRequestIfGranted?: boolean
  timeout?: number
  maximumAge?: number
}

const STORAGE_KEY = 'farmverse.lastKnownLocation'

function readLastKnown(): GeoCoords | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as GeoCoords) : null
  } catch {
    return null
  }
}

function writeLastKnown(coords: GeoCoords) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(coords))
  } catch {
    // Private browsing / storage quota — not critical, ignore.
  }
}

export function useGeolocation(options: UseGeolocationOptions = {}) {
  const { autoRequestIfGranted = true, timeout = 10000, maximumAge = 5 * 60 * 1000 } = options

  const isSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator
  const isSecureContext = typeof window !== 'undefined' ? window.isSecureContext : true

  const [state, setState] = useState<GeoState>({ status: 'idle', coords: null })
  const didAutoCheck = useRef(false)

  const requestLocation = useCallback(() => {
    if (!isSupported) {
      setState({ status: 'unavailable', coords: null })
      return
    }
    if (!isSecureContext) {
      setState({ status: 'insecure', coords: null })
      return
    }

    setState((prev) => ({ ...prev, status: 'locating' }))

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
        writeLastKnown(coords)
        setState({ status: 'success', coords })
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({ status: 'denied', coords: null })
        } else if (err.code === err.TIMEOUT) {
          setState({ status: 'timeout', coords: null })
        } else {
          setState({ status: 'unavailable', coords: null })
        }
      },
      { enableHighAccuracy: false, timeout, maximumAge },
    )
  }, [isSupported, isSecureContext, timeout, maximumAge])

  useEffect(() => {
    if (didAutoCheck.current) return
    didAutoCheck.current = true

    if (!autoRequestIfGranted || !isSupported || !isSecureContext) return

    const permissions = (navigator as Navigator & { permissions?: Permissions }).permissions
    if (!permissions?.query) return // e.g. iOS Safari — wait for an explicit tap

    permissions
      .query({ name: 'geolocation' as PermissionName })
      .then((result) => {
        if (result.state === 'granted') requestLocation()
      })
      .catch(() => {
        /* Permissions API present but geolocation query unsupported — fine, wait for a tap. */
      })
  }, [autoRequestIfGranted, isSupported, isSecureContext, requestLocation])

  return {
    status: state.status,
    coords: state.coords,
    isSupported,
    isSecureContext,
    requestLocation,
    lastKnownLocation: readLastKnown,
  }
}

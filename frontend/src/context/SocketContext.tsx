import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '@/context/AuthContext'
import { getAccessToken } from '@/services/api'

interface SocketContextValue {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextValue>({ socket: null, isConnected: false })

export function SocketProvider({ children }: { children: ReactNode }) {
  const { isSeller } = useAuth()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Only connect if the user is a seller, as requested.
    if (!isSeller) {
      if (socket) {
        socket.disconnect()
        setSocket(null)
        setIsConnected(false)
      }
      return
    }

    const token = getAccessToken()
    if (!token) return

    // Connect to the backend — IMPORTANT: Socket.IO needs the server root,
    // NOT the /api/v1 path that the REST API uses.
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'
    console.log('[Socket] Connecting to', socketUrl)

    const newSocket = io(socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
    })

    newSocket.on('connect_error', (err) => {
      console.error('[Socket] Connection error:', err.message)
    })

    newSocket.on('connect', () => {
      console.log('[Socket] Connected')
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      console.log('[Socket] Disconnected')
      setIsConnected(false)
    })

    // Listen to seller-specific events and dispatch CustomEvents so the Providers can refresh
    newSocket.on('seller:newOrder', () => {
      console.log('[Socket] seller:newOrder received')
      window.dispatchEvent(new CustomEvent('socket:seller:newOrder'))
    })

    newSocket.on('seller:listingUpdated', () => {
      console.log('[Socket] seller:listingUpdated received')
      window.dispatchEvent(new CustomEvent('socket:seller:listingUpdated'))
    })

    newSocket.on('notification:new', () => {
      console.log('[Socket] notification:new received')
      window.dispatchEvent(new CustomEvent('socket:notification:new'))
    })

    setSocket(newSocket)

    // Cleanup on unmount or role change
    return () => {
      newSocket.disconnect()
    }
  }, [isSeller]) // Do NOT include socket in dependency array to avoid reconnect loops

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  return useContext(SocketContext)
}

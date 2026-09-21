"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type PhantomEvent = "connect" | "disconnect" | "accountChanged"

type PhantomProvider = {
  isPhantom?: boolean
  publicKey?: { toString: () => string } | null
  isConnected?: boolean
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>
  disconnect: () => Promise<void>
  on?: (event: PhantomEvent, handler: (...args: any[]) => void) => void
  removeListener?: (event: PhantomEvent, handler: (...args: any[]) => void) => void
}

declare global {
  interface Window {
    solana?: PhantomProvider
    phantom?: { solana?: PhantomProvider }
  }
}

type WalletStatus = "idle" | "connecting" | "connected"

type WalletContextValue = {
  address: string | null
  network: string | null
  status: WalletStatus
  error: string | null
  hasWallet: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextValue | null>(null)

function getProvider(): PhantomProvider | undefined {
  if (typeof window === "undefined") return undefined
  if (window.phantom?.solana?.isPhantom) return window.phantom.solana
  if (window.solana?.isPhantom) return window.solana
  return undefined
}

export function networkName(network: string | null): string {
  return network ?? ""
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}…${address.slice(-4)}`
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [network, setNetwork] = useState<string | null>(null)
  const [status, setStatus] = useState<WalletStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const [hasWallet, setHasWallet] = useState(false)

  useEffect(() => {
    const provider = getProvider()
    setHasWallet(Boolean(provider))
    if (!provider) return

    // Restore an already-trusted connection silently.
    provider
      .connect({ onlyIfTrusted: true })
      .then(({ publicKey }) => {
        setAddress(publicKey.toString())
        setNetwork("Solana")
        setStatus("connected")
      })
      .catch(() => {})

    const handleConnect = (publicKey: { toString: () => string } | null) => {
      if (publicKey) {
        setAddress(publicKey.toString())
        setNetwork("Solana")
        setStatus("connected")
      }
    }
    const handleDisconnect = () => {
      setAddress(null)
      setNetwork(null)
      setStatus("idle")
    }
    const handleAccountChanged = (publicKey: { toString: () => string } | null) => {
      if (publicKey) {
        setAddress(publicKey.toString())
        setStatus("connected")
      } else {
        setAddress(null)
        setStatus("idle")
      }
    }

    provider.on?.("connect", handleConnect)
    provider.on?.("disconnect", handleDisconnect)
    provider.on?.("accountChanged", handleAccountChanged)

    return () => {
      provider.removeListener?.("connect", handleConnect)
      provider.removeListener?.("disconnect", handleDisconnect)
      provider.removeListener?.("accountChanged", handleAccountChanged)
    }
  }, [])

  const connect = useCallback(async () => {
    const provider = getProvider()
    if (!provider) {
      window.open("https://phantom.app/download", "_blank", "noopener,noreferrer")
      return
    }
    setError(null)
    setStatus("connecting")
    try {
      const { publicKey } = await provider.connect()
      setAddress(publicKey.toString())
      setNetwork("Solana")
      setStatus("connected")
    } catch (err) {
      const message =
        err && typeof err === "object" && "code" in err && (err as { code: number }).code === 4001
          ? "Connection request rejected."
          : "Could not connect to Phantom. Please try again."
      setError(message)
      setStatus("idle")
    }
  }, [])

  const disconnect = useCallback(() => {
    const provider = getProvider()
    provider?.disconnect().catch(() => {})
    setAddress(null)
    setNetwork(null)
    setStatus("idle")
    setError(null)
  }, [])

  const value = useMemo(
    () => ({ address, network, status, error, hasWallet, connect, disconnect }),
    [address, network, status, error, hasWallet, connect, disconnect],
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider")
  return ctx
}

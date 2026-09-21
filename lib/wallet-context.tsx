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

type Eip1193Provider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  on?: (event: string, handler: (...args: any[]) => void) => void
  removeListener?: (event: string, handler: (...args: any[]) => void) => void
  isMetaMask?: boolean
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider
  }
}

type WalletStatus = "idle" | "connecting" | "connected"

type WalletContextValue = {
  address: string | null
  chainId: string | null
  status: WalletStatus
  error: string | null
  hasWallet: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextValue | null>(null)

const CHAIN_NAMES: Record<string, string> = {
  "0x1": "Ethereum",
  "0x89": "Polygon",
  "0xa4b1": "Arbitrum",
  "0xa": "Optimism",
  "0x2105": "Base",
  "0x38": "BNB Chain",
}

export function chainName(chainId: string | null): string {
  if (!chainId) return ""
  return CHAIN_NAMES[chainId] ?? `Chain ${Number.parseInt(chainId, 16)}`
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [status, setStatus] = useState<WalletStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const [hasWallet, setHasWallet] = useState(false)

  useEffect(() => {
    const provider = typeof window !== "undefined" ? window.ethereum : undefined
    setHasWallet(Boolean(provider))
    if (!provider) return

    // Restore an already-authorized connection silently.
    provider
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        const list = accounts as string[]
        if (list.length > 0) {
          setAddress(list[0])
          setStatus("connected")
          provider
            .request({ method: "eth_chainId" })
            .then((id) => setChainId(id as string))
            .catch(() => {})
        }
      })
      .catch(() => {})

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setAddress(null)
        setStatus("idle")
      } else {
        setAddress(accounts[0])
        setStatus("connected")
      }
    }
    const handleChainChanged = (id: string) => setChainId(id)

    provider.on?.("accountsChanged", handleAccountsChanged)
    provider.on?.("chainChanged", handleChainChanged)

    return () => {
      provider.removeListener?.("accountsChanged", handleAccountsChanged)
      provider.removeListener?.("chainChanged", handleChainChanged)
    }
  }, [])

  const connect = useCallback(async () => {
    const provider = typeof window !== "undefined" ? window.ethereum : undefined
    if (!provider) {
      window.open("https://metamask.io/download/", "_blank", "noopener,noreferrer")
      return
    }
    setError(null)
    setStatus("connecting")
    try {
      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[]
      const id = (await provider.request({ method: "eth_chainId" })) as string
      setAddress(accounts[0] ?? null)
      setChainId(id)
      setStatus(accounts.length > 0 ? "connected" : "idle")
    } catch (err) {
      const message =
        err && typeof err === "object" && "code" in err && (err as { code: number }).code === 4001
          ? "Connection request rejected."
          : "Could not connect to your wallet. Please try again."
      setError(message)
      setStatus("idle")
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
    setChainId(null)
    setStatus("idle")
    setError(null)
  }, [])

  const value = useMemo(
    () => ({ address, chainId, status, error, hasWallet, connect, disconnect }),
    [address, chainId, status, error, hasWallet, connect, disconnect],
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider")
  return ctx
}

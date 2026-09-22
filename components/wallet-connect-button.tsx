"use client"

import { useEffect, useRef, useState } from "react"
import { Check, ChevronDown, Copy, LogOut, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { chainName, shortenAddress, useWallet } from "@/lib/wallet-context"
import { cn } from "@/lib/utils"

export function WalletConnectButton({ className }: { className?: string }) {
  const { address, chainId, status, error, hasWallet, connect, disconnect } = useWallet()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  async function copyAddress() {
    if (!address) return
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (status === "connected" && address) {
    return (
      <div ref={menuRef} className={cn("relative", className)}>
        <Button
          variant="secondary"
          onClick={() => setOpen((v) => !v)}
          className="h-10 gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 font-mono text-sm text-foreground hover:bg-primary/20"
        >
          <span className="size-2 rounded-full bg-accent shadow-[0_0_8px] shadow-accent" aria-hidden />
          {shortenAddress(address)}
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
        </Button>

        {open && (
          <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
            <div className="border-b border-border p-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Connected wallet</p>
              <p className="mt-1 font-mono text-sm text-foreground">{shortenAddress(address)}</p>
              {chainId && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  {chainName(chainId)}
                </span>
              )}
            </div>
            <div className="p-1.5">
              <button
                type="button"
                onClick={copyAddress}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
              >
                {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy address"}
              </button>
              <button
                type="button"
                onClick={() => {
                  disconnect()
                  setOpen(false)
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="size-4" />
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-end gap-1", className)}>
      <Button
        onClick={connect}
        disabled={status === "connecting"}
        className="h-10 gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
      >
        <Wallet className="size-4" />
        {status === "connecting" ? "Connecting…" : hasWallet ? "Connect Wallet" : "Get a Wallet"}
      </Button>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  )
}

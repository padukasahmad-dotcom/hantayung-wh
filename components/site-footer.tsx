import { Mountain } from "lucide-react"
import { WalletConnectButton } from "@/components/wallet-connect-button"

const LINKS = [
  {
    heading: "Project",
    items: [
      { label: "About", href: "#about" },
      { label: "Utility", href: "#utility" },
      { label: "Tokenomics", href: "#tokenomics" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    heading: "Community",
    items: [
      { label: "X / Twitter", href: "#" },
      { label: "Discord", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Whitepaper", href: "#" },
      { label: "Audit report", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Brand kit", href: "#" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <h2 className="mx-auto max-w-2xl text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Ready to begin the ascent?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Connect your wallet to join the Bukit Hantayung community, stake $HTYG, and
            help decide where the summit leads next.
          </p>
          <div className="mt-9 flex justify-center">
            <WalletConnectButton />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <Mountain className="size-5 text-primary" />
              </span>
              <span className="font-serif text-lg font-semibold text-foreground">Bukit Hantayung</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A community-owned Web3 project inspired by the ancient layered stone hills
              of South Kalimantan.
            </p>
          </div>

          {LINKS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold text-foreground">{group.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bukit Hantayung. Community-run. Not financial advice.
          </p>
          <p className="text-xs text-muted-foreground">
            Crypto assets are volatile. Do your own research.
          </p>
        </div>
      </div>
    </footer>
  )
}

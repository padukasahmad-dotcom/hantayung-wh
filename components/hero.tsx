import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import heroImage from "@/public/images/hero-bukit.png"

const STATS = [
  { value: "1.2M+", label: "Tokens staked" },
  { value: "8,400", label: "Holders" },
  { value: "45.7°", label: "Legendary incline" },
]

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      <Image
        src={heroImage || "/placeholder.svg"}
        alt="The layered stone cliffs of Bukit Hantayung rising above a sea of clouds at golden hour"
        fill
        priority
        placeholder="blur"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pt-24 pb-16 sm:px-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
          <Sparkles className="size-3.5" />
          South Kalimantan · On-Chain
        </span>

        <h1 className="mt-6 max-w-3xl text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          The ancient stone hill,
          <span className="block text-primary">reborn on-chain.</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Bukit Hantayung is a community-owned Web3 project inspired by the legendary
          layered rock formations of Kalimantan. Stake, govern, and climb together —
          every holder shapes the summit.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <WalletConnectButton />
          <Button
            render={<a href="#about" />}
            variant="outline"
            className="h-10 gap-2 rounded-full border-border bg-transparent px-5 text-foreground hover:bg-secondary"
          >
            Explore the project
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-serif text-3xl font-semibold text-foreground">{stat.value}</dd>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

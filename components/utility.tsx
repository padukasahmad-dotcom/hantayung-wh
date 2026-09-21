import { Coins, Leaf, ShieldCheck, Users, Vote, Zap } from "lucide-react"

const FEATURES = [
  {
    icon: Vote,
    title: "On-Chain Governance",
    body: "Hold $HTYG to propose and vote on treasury spend, listings, and partnerships. One climber, one voice.",
  },
  {
    icon: Coins,
    title: "Staking Rewards",
    body: "Lock your tokens to earn from the protocol fee pool. The longer the climb, the greater the reward.",
  },
  {
    icon: Leaf,
    title: "Conservation Fund",
    body: "1% of every transaction routes to a transparent wallet funding Meratus reforestation efforts.",
  },
  {
    icon: ShieldCheck,
    title: "Audited & Renounced",
    body: "The contract is third-party audited, liquidity is locked, and ownership is renounced.",
  },
  {
    icon: Users,
    title: "Community Treasury",
    body: "A multisig treasury funds grants, events, and creators — every disbursement is public.",
  },
  {
    icon: Zap,
    title: "Low Fees, Fast Chain",
    body: "Deployed on Base for near-instant, sub-cent transactions so everyone can participate.",
  },
]

export function Utility() {
  return (
    <section id="utility" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">Utility</span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            More than a token — a toolkit for the climb
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            $HTYG is designed for real participation. Connect your wallet to unlock
            governance, staking, and community perks the moment you hold.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
                <feature.icon className="size-5 text-primary" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

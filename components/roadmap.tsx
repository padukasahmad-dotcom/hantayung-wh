import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const PHASES = [
  {
    phase: "Phase 1 — Base Camp",
    status: "done" as const,
    items: ["Contract deployed & audited", "Liquidity locked", "Community channels opened"],
  },
  {
    phase: "Phase 2 — The Ascent",
    status: "active" as const,
    items: ["Staking dashboard launch", "On-chain governance v1", "First conservation grant"],
  },
  {
    phase: "Phase 3 — The Ridge",
    status: "upcoming" as const,
    items: ["CEX listings", "Mobile companion app", "Cross-chain bridge to Ethereum"],
  },
  {
    phase: "Phase 4 — The Summit",
    status: "upcoming" as const,
    items: ["DAO fully self-governed", "Real-world Meratus expedition", "Treasury-funded creator fund"],
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">Roadmap</span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            The path to the summit
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Every milestone is proposed and ratified by holders. This is where we are on
            the climb.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase) => (
            <li
              key={phase.phase}
              className={cn(
                "rounded-2xl border bg-card p-6",
                phase.status === "active" ? "border-primary/50 ring-1 ring-primary/20" : "border-border",
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full",
                    phase.status === "done" && "bg-accent/20 text-accent",
                    phase.status === "active" && "bg-primary/20 text-primary",
                    phase.status === "upcoming" && "bg-secondary text-muted-foreground",
                  )}
                >
                  {phase.status === "done" ? <Check className="size-4" /> : <Circle className="size-3" />}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium uppercase tracking-wider",
                    phase.status === "active" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {phase.status === "done" ? "Complete" : phase.status === "active" ? "In progress" : "Upcoming"}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{phase.phase}</h3>
              <ul className="mt-4 space-y-2.5">
                {phase.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

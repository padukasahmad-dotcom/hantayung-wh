const ALLOCATIONS = [
  { label: "Liquidity Pool (locked)", pct: 40, color: "var(--color-chart-1)" },
  { label: "Community Rewards & Staking", pct: 30, color: "var(--color-chart-2)" },
  { label: "Treasury (multisig)", pct: 15, color: "var(--color-chart-3)" },
  { label: "Conservation Fund", pct: 10, color: "var(--color-chart-5)" },
  { label: "Contributors (vested)", pct: 5, color: "var(--color-chart-4)" },
]

const DETAILS = [
  { label: "Token", value: "$HTYG" },
  { label: "Total supply", value: "100,000,000" },
  { label: "Network", value: "Base" },
  { label: "Transaction fee", value: "2%" },
]

export function Tokenomics() {
  let cumulative = 0
  const segments = ALLOCATIONS.map((a) => {
    const start = cumulative
    cumulative += a.pct
    return { ...a, start }
  })
  const gradient = segments
    .map((s) => `${s.color} ${s.start}% ${s.start + s.pct}%`)
    .join(", ")

  return (
    <section id="tokenomics" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="max-w-2xl">
        <span className="text-sm font-medium uppercase tracking-widest text-primary">Tokenomics</span>
        <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Transparent from the first block
        </h2>
        <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
          A fixed supply and a clear distribution. Nothing minted after launch, nothing
          hidden from the ledger.
        </p>
      </div>

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex justify-center">
          <div
            className="relative flex size-64 items-center justify-center rounded-full sm:size-72"
            style={{ background: `conic-gradient(${gradient})` }}
            role="img"
            aria-label="Token distribution donut chart"
          >
            <div className="flex size-40 flex-col items-center justify-center rounded-full bg-background sm:size-44">
              <span className="font-serif text-3xl font-semibold text-foreground">100M</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Fixed supply</span>
            </div>
          </div>
        </div>

        <div>
          <ul className="space-y-3">
            {ALLOCATIONS.map((a) => (
              <li key={a.label} className="flex items-center gap-3">
                <span className="size-3.5 shrink-0 rounded-sm" style={{ background: a.color }} aria-hidden />
                <span className="flex-1 text-sm text-foreground">{a.label}</span>
                <span className="font-mono text-sm font-medium text-muted-foreground">{a.pct}%</span>
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {DETAILS.map((d) => (
              <div key={d.label} className="bg-card p-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{d.label}</dt>
                <dd className="mt-1 font-mono text-lg font-semibold text-foreground">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

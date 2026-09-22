import Image from "next/image"
import galleryImage from "@/public/images/gallery-1.png"

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
          <Image
            src={galleryImage || "/placeholder.svg"}
            alt="Detail of the striped, layered rock face of Bukit Hantayung in warm morning light"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <span className="text-sm font-medium uppercase tracking-widest text-primary">The Legend</span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            A monument carved by time, told by the community
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            Deep in the Meratus Mountains of South Kalimantan, Bukit Hantayung rises as
            a wall of tilted stone — its dramatic parallel layers folded over millions of
            years. For generations, its slopes have drawn climbers, storytellers, and
            seekers chasing the sunrise above the clouds.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            We&apos;ve translated that spirit of the ascent into an open, transparent
            protocol. $HTYG is not a promise from a founder — it&apos;s a shared summit,
            governed on-chain by the people who choose to climb it. No hidden treasury,
            no locked backroom, just verifiable ledgers and a community roadmap.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Fully on-chain", body: "Every allocation and vote lives on a public ledger." },
              { title: "Community-owned", body: "Governance keys held by holders, not insiders." },
              { title: "Renounced control", body: "Contract ownership renounced after launch." },
              { title: "Rooted in place", body: "A portion of fees funds Meratus conservation." },
            ].map((item) => (
              <li key={item.title} className="rounded-2xl border border-border bg-card p-4">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

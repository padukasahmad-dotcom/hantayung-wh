import Image from "next/image"
import gallery1 from "@/public/images/gallery-1.png"
import gallery2 from "@/public/images/gallery-2.png"
import gallery3 from "@/public/images/gallery-3.png"

const IMAGES = [
  { src: gallery2, alt: "A lone hiker on the peak of Bukit Hantayung above a sea of clouds at dawn", span: "lg:col-span-2 lg:row-span-2" },
  { src: gallery3, alt: "Misty tropical forest trail leading up toward the stone hills", span: "" },
  { src: gallery1, alt: "Close-up of the striped layered rock face in golden light", span: "" },
]

export function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="max-w-2xl">
        <span className="text-sm font-medium uppercase tracking-widest text-primary">Gallery</span>
        <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          The mountain that inspired us
        </h2>
      </div>

      <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {IMAGES.map((img) => (
          <div
            key={img.alt}
            className={`group relative overflow-hidden rounded-2xl border border-border ${img.span}`}
          >
            <Image
              src={img.src || "/placeholder.svg"}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  )
}

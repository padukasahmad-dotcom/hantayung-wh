import { WalletProvider } from "@/lib/wallet-context"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Utility } from "@/components/utility"
import { Tokenomics } from "@/components/tokenomics"
import { Roadmap } from "@/components/roadmap"
import { Gallery } from "@/components/gallery"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <WalletProvider>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Utility />
        <Tokenomics />
        <Roadmap />
        <Gallery />
      </main>
      <SiteFooter />
    </WalletProvider>
  )
}

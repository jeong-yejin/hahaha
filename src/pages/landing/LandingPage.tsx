import { GrainOverlay } from "@/app/effects/grain-overlay"
import { CursorGlow } from "@/shared/effects/cursor-glow"
import { HeroSection } from "@/Sections/hero/ui/hero-section"
import { PreFooterSection } from "@/Sections/pre-footer/ui/pre-footer-section"
import { ProductFeaturesSection } from "@/Sections/product-showcase/ui/product-features-section"
import { SubMessageSection } from "@/Sections/sub-message/ui/sub-message-section"
import { Footer } from "@/widgets/footer/ui/footer"
import { Navbar } from "@/widgets/navigation/ui/navbar"

export function LandingPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black focus:outline focus:outline-2 focus:outline-[#CAFF5D]"
      >
        Skip to content
      </a>
      <GrainOverlay />
      <CursorGlow />
      <Navbar />
      <main id="main" className="bg-[#0A0A0A]">
        <HeroSection />
        <SubMessageSection />
        <ProductFeaturesSection />
        <PreFooterSection />
        <Footer />
      </main>
    </>
  )
}

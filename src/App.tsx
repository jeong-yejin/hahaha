import { CursorGlow } from "@/components/ui/cursor-glow"
import { Navbar } from "@/components/ui/navbar"
import { Hero } from "@/components/sections/hero"
import { SubMessage } from "@/components/sections/sub-message"
import { Features } from "@/components/sections/features"
import { PreFooter } from "@/components/sections/pre-footer"
import { Footer } from "@/components/sections/footer"

export default function App() {
  return (
    <>
      {/* Grain noise overlay — fixed, pointer-events-none */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.032,
        }}
      />
      <CursorGlow />
      <Navbar />
      <main className="font-outfit bg-[#0A0A0A]">
        <Hero />
        <SubMessage />
        <Features />
        <PreFooter />
        <Footer />
      </main>
    </>
  )
}

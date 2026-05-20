import { ArrowRight } from "lucide-react"
import { useScrollThreshold } from "@/shared/hooks/use-scroll-threshold"
import { HoverButton } from "@/shared/ui/hover-button"
import { NAVIGATION_ITEMS } from "@/widgets/navigation/model/navigation-items"

export function Navbar() {
  const scrolled = useScrollThreshold(60)

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center pt-5">
      <div
        className={`flex items-center gap-2 rounded-full px-2 py-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-black/20 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="px-4 py-1.5 hover:opacity-70 transition-opacity duration-300"
        >
          <img src="/wordmark.svg" alt="ReboundX" className="h-5 w-auto" />
        </a>

        {/* Divider */}
        <div className="h-4 w-px bg-white/10" />

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAVIGATION_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="hidden md:block h-4 w-px bg-white/10" />

        {/* CTA — button-in-button pill */}
        <HoverButton
          href="#feature-terminal"
          className="group inline-flex items-center gap-1 rounded-full bg-[linear-gradient(160deg,#0d0d0d_0%,#111a05_100%)] pl-5 pr-1.5 py-1.5 text-[13px] font-semibold text-white"
        >
          Get Started
          <span className="flex h-7 w-7 items-center justify-center transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </HoverButton>
      </div>
    </header>
  )
}

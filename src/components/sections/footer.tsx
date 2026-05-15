const LINKS = {
  Products: [
    { label: "Terminal", href: "#" },
    { label: "Rebate", href: "#" },
    { label: "Labs", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#171717] py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        {/* Top: brand + nav */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-[16px] font-semibold text-white">ReboundX</p>
            <p className="mt-3 text-[14px] font-medium leading-[1.6] text-[#D4D4D4] max-w-[180px]">
              Infrastructure between traders and markets.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-[13px] font-bold text-white">{section}</p>
              <ul className="mt-4 space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] font-normal text-[#A3A3A3] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: copyright */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-[12px] font-normal text-[#A3A3A3]">
            © 2025 ReboundX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

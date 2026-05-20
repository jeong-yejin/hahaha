export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  label: string
  links: FooterLink[]
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    label: "Products",
    links: [
      { label: "Terminal", href: "#" },
      { label: "Rebate", href: "#" },
      { label: "Labs", href: "#" },
    ],
  },
]

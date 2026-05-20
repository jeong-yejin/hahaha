export interface FeatureItem {
  id: string
  product: string
  tagline: string
  description: string
  cta: string
  href: string
  bg: string
}

export const FEATURES: FeatureItem[] = [
  {
    id: "feature-terminal",
    product: "ReboundX Terminal",
    tagline: "Why trade across many tabs?",
    description: "Execution, position visibility, and settlement in one screen",
    cta: "Launch Terminal",
    href: "#",
    bg: "#0a0a0a",
  },
  {
    id: "feature-rebate",
    product: "ReboundX Rebate",
    tagline: "Why lose money on fees? ",
    description: "Automated rebate tracking and payout across all connected exchanges",
    cta: "Claim Rebate",
    href: "#",
    bg: "#0E0E0F",
  },
  {
    id: "feature-labs",
    product: "ReboundX Labs",
    tagline: "Why aren't you live in Korea yet?",
    description: "Distribution, compliance, and integration support for markets entering Korea",
    cta: "Get in Touch",
    href: "#",
    bg: "#0a0a0a",
  },
]

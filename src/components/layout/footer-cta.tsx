"use client"

import { usePathname } from "next/navigation"

/** Pages that already have an enquiry form don't need the footer call-to-action. */
const HIDDEN_ON = ["/", "/contact"]

export function FooterCta({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (HIDDEN_ON.includes(pathname)) return null
  return <>{children}</>
}

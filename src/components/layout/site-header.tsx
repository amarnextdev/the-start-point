"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { isActivePath, siteNav } from "@/config/nav"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"
import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <Container className="flex h-[74px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {siteNav.map((item) => {
            const active = isActivePath(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-[15px] font-semibold transition-colors hover:text-foreground",
                  "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-current after:transition-transform hover:after:scale-x-100",
                  active ? "text-foreground after:scale-x-100" : "text-foreground/75"
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/contact#enquire">Enquire now</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}

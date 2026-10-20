"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { isActivePath, siteNav } from "@/config/nav"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="soft" size="icon" className="rounded-xl md:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full bg-background sm:max-w-sm">
        <SheetHeader className="border-b">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Logo />
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col px-6">
          {siteNav.map((item) => {
            const active = isActivePath(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between border-b py-4 font-display text-2xl font-bold",
                  active ? "text-foreground" : "text-foreground/70"
                )}
              >
                {item.title}
                {active && <span className="size-2 rounded-full bg-coral" aria-hidden />}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto p-6">
          <Button asChild size="lg" className="w-full">
            <Link href="/contact#enquire" onClick={() => setOpen(false)}>
              Enquire now
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ExternalLink } from "lucide-react"

import { getAdminNav, isActivePath } from "@/config/nav"
import { cn } from "@/lib/utils"
import type { StaffRole } from "@/types"

import { Logo } from "./logo"

export function AdminNavLinks({ role, onNavigate }: { role: StaffRole; onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {getAdminNav(role).map(({ title, href, icon: Icon }) => {
        const active = isActivePath(pathname, href)
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-semibold transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:translate-x-0.5 hover:bg-white/10"
            )}
          >
            <Icon className="size-[18px]" aria-hidden />
            {title}
          </Link>
        )
      })}
    </nav>
  )
}

export function AdminSidebar({ role }: { role: StaffRole }) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-8 bg-sidebar px-4 py-6 text-white lg:flex">
      <Logo href="/admin" inverted subtitle="Admin" className="px-2" />
      <AdminNavLinks role={role} />
      <div className="mt-auto border-t border-sidebar-border pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-semibold text-sidebar-foreground hover:bg-white/10"
        >
          <ExternalLink className="size-[18px]" aria-hidden />
          View website
        </Link>
      </div>
    </aside>
  )
}

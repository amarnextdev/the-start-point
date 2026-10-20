import {
  CalendarDays,
  Inbox,
  LayoutDashboard,
  Settings,
  UserCog,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import type { StaffRole } from "@/types"

export type SiteNavItem = { title: string; href: string }

export const siteNav: SiteNavItem[] = [
  { title: "Home", href: "/" },
  { title: "Courses", href: "/courses" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
]

export type AdminNavItem = {
  title: string
  href: string
  icon: LucideIcon
  /** Roles allowed to see this item. */
  roles: StaffRole[]
}

export const adminNav: AdminNavItem[] = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ["owner", "staff"] },
  { title: "Enquiries", href: "/admin/enquiries", icon: Inbox, roles: ["owner", "staff"] },
  { title: "Batches", href: "/admin/batches", icon: CalendarDays, roles: ["owner", "staff"] },
  { title: "Students", href: "/admin/students", icon: Users, roles: ["owner", "staff"] },
  { title: "Fees", href: "/admin/fees", icon: Wallet, roles: ["owner", "staff"] },
  { title: "Staff", href: "/admin/staff", icon: UserCog, roles: ["owner"] },
  { title: "Settings", href: "/admin/settings", icon: Settings, roles: ["owner"] },
]

export function getAdminNav(role: StaffRole) {
  return adminNav.filter((item) => item.roles.includes(role))
}

/** Active-link check: exact match for root links, prefix match otherwise. */
export function isActivePath(pathname: string, href: string) {
  if (href === "/" || href === "/admin") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

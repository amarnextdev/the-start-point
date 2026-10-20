import type { Metadata } from "next"

import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { AdminTopbar } from "@/components/layout/admin-topbar"
import type { StaffRole } from "@/types"

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin" },
  robots: { index: false, follow: false },
}

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  // Phase 4 replaces this with the signed-in user from the session
  // and redirects to /admin/login when there is no session.
  const user = { name: "Admin", email: "admin@example.com", role: "owner" as StaffRole }

  return (
    <div className="flex min-h-dvh bg-background">
      <AdminSidebar role={user.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar user={user} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}

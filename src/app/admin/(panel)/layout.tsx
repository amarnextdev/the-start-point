import type { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { AdminTopbar } from "@/components/layout/admin-topbar"
import { AdminDataProvider } from "@/features/admin/store"
import { DEMO_ACCOUNT, DEMO_SESSION_COOKIE, isDemoLoginEnabled } from "@/features/auth/demo"

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin" },
  robots: { index: false, follow: false },
}

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  // Demo session for now; phase 4 replaces this with the real signed-in user.
  const store = await cookies()
  if (!isDemoLoginEnabled() || !store.has(DEMO_SESSION_COOKIE)) redirect("/admin/login")
  const user = { name: DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email, role: DEMO_ACCOUNT.role }

  return (
    <div className="flex min-h-dvh bg-background">
      <AdminSidebar role={user.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar user={user} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <AdminDataProvider>{children}</AdminDataProvider>
        </main>
      </div>
    </div>
  )
}

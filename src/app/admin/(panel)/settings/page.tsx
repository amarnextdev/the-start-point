import { redirect } from "next/navigation"

import { SettingsView } from "@/features/admin/components/settings-view"
import { DEMO_ACCOUNT } from "@/features/auth/demo"

export const metadata = { title: "Settings" }

export default function SettingsPage() {
  // Owner-only page (phase 4 reads the role from the real session).
  if (DEMO_ACCOUNT.role !== "owner") redirect("/admin")
  return <SettingsView />
}

import { redirect } from "next/navigation"

import { StaffView } from "@/features/admin/components/staff-view"
import { DEMO_ACCOUNT } from "@/features/auth/demo"

export const metadata = { title: "Staff" }

export default function StaffPage() {
  // Owner-only page (phase 4 reads the role from the real session).
  if (DEMO_ACCOUNT.role !== "owner") redirect("/admin")
  return <StaffView currentEmail={DEMO_ACCOUNT.email} />
}

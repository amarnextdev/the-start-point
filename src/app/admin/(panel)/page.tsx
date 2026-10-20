import { DashboardView } from "@/features/admin/components/dashboard-view"
import { DEMO_ACCOUNT } from "@/features/auth/demo"

export const metadata = { title: "Dashboard" }

export default function DashboardPage() {
  return <DashboardView userName={DEMO_ACCOUNT.name} />
}

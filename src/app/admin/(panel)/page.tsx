import { Database } from "lucide-react"

import { AdminPageHeader } from "@/components/shared/admin-page-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata = { title: "Dashboard" }

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Dashboard" description="Enquiries, students and batches at a glance." />
      <EmptyState
        icon={Database}
        title="Live stats arrive in phase 4"
        description="Once the database is connected, this page shows total enquiries, enrolled students, upcoming batches and the follow-up pipeline."
      />
    </div>
  )
}

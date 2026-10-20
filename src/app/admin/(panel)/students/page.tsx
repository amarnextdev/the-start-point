import { Suspense } from "react"

import { TableSkeleton } from "@/components/skeletons"
import { StudentsView } from "@/features/admin/components/students-view"

export const metadata = { title: "Students" }

export default function StudentsPage() {
  // StudentsView reads ?batch= from the URL, which needs a Suspense boundary.
  return (
    <Suspense fallback={<TableSkeleton />}>
      <StudentsView />
    </Suspense>
  )
}

"use client"

import Link from "next/link"
import { ArrowRight, CalendarDays, Inbox, IndianRupee, Phone, TriangleAlert, Users } from "lucide-react"
import { toast } from "sonner"

import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { formatDate, formatINR, formatMonth, toMonthKey } from "@/lib/utils"
import { ENQUIRY_STATUSES, type EnquiryStatus } from "@/types"

import { useAdminLookups, useAdminStore } from "../store"
import { DemoDataNote, Meter, Panel, PersonCell, StatCard } from "./admin-ui"

const pipelineTone: Record<EnquiryStatus, string> = {
  New: "bg-coral",
  Contacted: "bg-[#5b7bd5]",
  "Trial Class Scheduled": "bg-saffron",
  Joined: "bg-[#1f9d6d]",
}

export function DashboardView({ userName }: { userName: string }) {
  const { enquiries, students, batches, fees, markFeePaid } = useAdminStore()
  const { batchName, studentById } = useAdminLookups()

  const month = toMonthKey()
  const monthFees = fees.filter((f) => f.month === month)
  const collected = monthFees.filter((f) => f.status === "Paid").reduce((sum, f) => sum + f.amount, 0)
  const expected = monthFees.reduce((sum, f) => sum + f.amount, 0)
  const pendingFees = fees.filter((f) => f.status === "Pending")
  const pendingAmount = pendingFees.reduce((sum, f) => sum + f.amount, 0)
  const activeStudents = students.filter((s) => s.status === "Active")
  const newEnquiries = enquiries.filter((e) => e.status === "New")
  const today = new Date().toISOString().slice(0, 10)
  const followUpsDue = enquiries.filter((e) => e.followUpAt && e.followUpAt <= today && e.status !== "Joined")
  const conversion = enquiries.length ? Math.round((enquiries.filter((e) => e.status === "Joined").length / enquiries.length) * 100) : 0

  const liveBatches = batches.filter((b) => b.status !== "Completed")
  const enrolled = (batchId: string, fallback: number) => {
    const count = students.filter((s) => s.batchId === batchId && s.status === "Active").length
    return count || fallback
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{formatDate(new Date())}</p>
          <h1 className="mt-1 text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold">Welcome back, {userName.split(" ")[0]}</h1>
          <DemoDataNote />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="soft">
            <Link href="/admin/fees">
              <IndianRupee /> Record payment
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/admin/enquiries">
              <Inbox /> View enquiries
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Inbox}
          tone="coral"
          label="New enquiries"
          value={newEnquiries.length}
          hint={`${enquiries.length} this month · ${conversion}% joined`}
        />
        <StatCard
          icon={Users}
          tone="navy"
          label="Active students"
          value={activeStudents.length}
          hint={`Across ${batches.filter((b) => b.status === "Running").length} running batches`}
        />
        <StatCard
          icon={IndianRupee}
          tone="saffron"
          label={`Collected · ${formatMonth(month).split(" ")[0]}`}
          value={formatINR(collected)}
          hint={
            <span className="flex items-center gap-2">
              <Meter value={collected} max={expected} tone="green" className="w-20" />
              {expected ? Math.round((collected / expected) * 100) : 0}% of {formatINR(expected)}
            </span>
          }
        />
        <StatCard
          icon={TriangleAlert}
          tone="white"
          label="Fees pending"
          value={formatINR(pendingAmount)}
          hint={`${pendingFees.length} payments outstanding`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Recent enquiries"
          description="Newest first"
          action={
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/enquiries">
                See all <ArrowRight />
              </Link>
            </Button>
          }
        >
          <ul className="divide-y">
            {enquiries.slice(0, 6).map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
                <PersonCell name={e.name} sub={`${batchName(e.batchId)} · ${e.source}`} />
                <div className="flex items-center gap-3">
                  <span className="hidden text-xs text-muted-foreground sm:inline">{formatDate(e.createdAt)}</span>
                  <StatusBadge status={e.status} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Enquiry pipeline" description={`${enquiries.length} enquiries in total`}>
          <div className="flex flex-col gap-4 p-5">
            {ENQUIRY_STATUSES.map((status) => {
              const count = enquiries.filter((e) => e.status === status).length
              const pct = enquiries.length ? (count / enquiries.length) * 100 : 0
              return (
                <div key={status} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{status}</span>
                    <span className="font-bold tabular-nums">{count}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-navy/[0.06]">
                    <div className={`h-full rounded-full ${pipelineTone[status]}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
            <div className="mt-2 rounded-xl bg-muted/70 p-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Phone className="size-4 text-clay" aria-hidden />
                {followUpsDue.length} follow-up{followUpsDue.length === 1 ? "" : "s"} due today
              </div>
              {followUpsDue.length > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">{followUpsDue.map((e) => e.name).join(", ")}</p>
              )}
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel
          title="Batches"
          description="Running and upcoming"
          action={
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/batches">
                Manage <ArrowRight />
              </Link>
            </Button>
          }
        >
          <ul className="divide-y">
            {liveBatches.map((b) => {
              const total = b.totalSeats ?? 12
              const filled = b.status === "Running" ? enrolled(b.id, 0) : total - (b.seatsLeft ?? total)
              return (
                <li key={b.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-3.5 sm:grid-cols-[1fr_160px_auto]">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted">
                      <CalendarDays className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0 leading-tight">
                      <div className="truncate font-semibold">{b.name}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {b.days} · {b.timing}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
                    <Meter value={filled} max={total} tone={total - filled <= 2 ? "coral" : "navy"} />
                    <span className="text-xs font-semibold whitespace-nowrap tabular-nums">
                      {filled}/{total}
                    </span>
                  </div>
                  <StatusBadge status={b.status} className="col-start-2 row-start-1 sm:col-start-3" />
                </li>
              )
            })}
          </ul>
        </Panel>

        <Panel
          title="Fees due"
          description="Oldest first"
          action={
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/fees">
                All fees <ArrowRight />
              </Link>
            </Button>
          }
        >
          {pendingFees.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-muted-foreground">All fees are paid. Nice.</p>
          ) : (
            <ul className="divide-y">
              {[...pendingFees]
                .sort((a, b) => a.month.localeCompare(b.month))
                .slice(0, 6)
                .map((f) => {
                  const student = studentById.get(f.studentId)
                  if (!student) return null
                  return (
                    <li key={f.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
                      <PersonCell name={student.name} sub={`${formatMonth(f.month)} · ${batchName(student.batchId)}`} />
                      <div className="flex items-center gap-3">
                        <span className="font-bold tabular-nums">{formatINR(f.amount)}</span>
                        <Button
                          size="xs"
                          variant="soft"
                          onClick={() => {
                            markFeePaid(f.id, "UPI")
                            toast.success(`Marked ${student.name}'s ${formatMonth(f.month)} fee as paid (UPI)`)
                          }}
                        >
                          Mark paid
                        </Button>
                      </div>
                    </li>
                  )
                })}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  )
}

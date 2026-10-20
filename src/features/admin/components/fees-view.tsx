"use client"

import { useMemo, useState } from "react"
import { BellRing, CheckCircle2, Download, IndianRupee, Percent, Undo2, Wallet } from "lucide-react"
import { toast } from "sonner"

import { AdminPageHeader } from "@/components/shared/admin-page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn, formatDate, formatINR, formatMonth, toMonthKey } from "@/lib/utils"
import { PAYMENT_MODES, type FeeStatus, type PaymentMode } from "@/types"

import { useAdminLookups, useAdminStore } from "../store"
import type { FeeRecord } from "../types"
import { DemoDataNote, FilterPills, Meter, NoResults, PersonCell, SearchField, StatCard, whatsappHref } from "./admin-ui"

type StatusFilter = "all" | FeeStatus

export function FeesView() {
  const store = useAdminStore()
  const { studentById, batchName } = useAdminLookups()
  const months = useMemo(() => [...new Set(store.fees.map((f) => f.month))].sort().reverse(), [store.fees])
  const [month, setMonth] = useState(() => (months.includes(toMonthKey()) ? toMonthKey() : (months[0] ?? toMonthKey())))
  const [status, setStatus] = useState<StatusFilter>("all")
  const [query, setQuery] = useState("")
  const [paying, setPaying] = useState<FeeRecord | null>(null)

  const monthFees = store.fees.filter((f) => f.month === month)
  const expected = monthFees.reduce((sum, f) => sum + f.amount, 0)
  const collected = monthFees.filter((f) => f.status === "Paid").reduce((sum, f) => sum + f.amount, 0)
  const pending = expected - collected
  const rate = expected ? Math.round((collected / expected) * 100) : 0

  const rows = monthFees
    .map((f) => ({ fee: f, student: studentById.get(f.studentId) }))
    .filter(({ fee, student }) => {
      if (!student) return false
      const q = query.trim().toLowerCase()
      return (status === "all" || fee.status === status) && (!q || student.name.toLowerCase().includes(q))
    })
    .sort((a, b) => (a.fee.status === b.fee.status ? a.student!.name.localeCompare(b.student!.name) : a.fee.status === "Pending" ? -1 : 1))

  const exportCsv = () => {
    const header = ["Student", "Phone", "Batch", "Month", "Amount", "Status", "Paid on", "Mode"]
    const lines = monthFees.map((f) => {
      const s = studentById.get(f.studentId)
      return [s?.name ?? "", s?.phone ?? "", s ? batchName(s.batchId) : "", formatMonth(f.month), f.amount, f.status, f.paidAt ?? "", f.mode ?? ""]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    })
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `fees-${month}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Fees"
        description={`Monthly fee of ${formatINR(store.settings.monthlyFee)} per student.`}
        actions={
          <>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="h-10 w-44" aria-label="Billing month">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m}>
                    {formatMonth(m)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="soft" onClick={exportCsv}>
              <Download /> Export CSV
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Wallet} tone="cream" label="Expected" value={formatINR(expected)} hint={`${monthFees.length} students billed`} />
        <StatCard icon={CheckCircle2} tone="navy" label="Collected" value={formatINR(collected)} hint={`${monthFees.filter((f) => f.status === "Paid").length} payments received`} />
        <StatCard icon={IndianRupee} tone="coral" label="Pending" value={formatINR(pending)} hint={`${monthFees.filter((f) => f.status === "Pending").length} still to pay`} />
        <StatCard
          icon={Percent}
          tone="saffron"
          label="Collection rate"
          value={`${rate}%`}
          hint={<Meter value={rate} tone={rate >= 80 ? "green" : "coral"} className="mt-1" />}
        />
      </div>

      <div className="flex flex-col rounded-2xl border bg-card">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
          <FilterPills
            label="Filter by payment status"
            value={status}
            onChange={setStatus}
            options={[
              { value: "all", label: "All", count: monthFees.length },
              { value: "Pending", label: "Pending", count: monthFees.filter((f) => f.status === "Pending").length },
              { value: "Paid", label: "Paid", count: monthFees.filter((f) => f.status === "Paid").length },
            ]}
          />
          <SearchField value={query} onChange={setQuery} placeholder="Search student" />
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Student</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid on</TableHead>
                <TableHead className="pr-5 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(({ fee, student }) => (
                <TableRow key={fee.id}>
                  <TableCell className="pl-5">
                    <PersonCell name={student!.name} sub={student!.phone} />
                  </TableCell>
                  <TableCell className="font-medium">{batchName(student!.batchId)}</TableCell>
                  <TableCell className="font-bold tabular-nums">{formatINR(fee.amount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={fee.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {fee.status === "Paid" ? `${formatDate(fee.paidAt)} · ${fee.mode}` : "—"}
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex justify-end gap-1.5">
                      {fee.status === "Pending" ? (
                        <>
                          <Button asChild size="xs" variant="ghost">
                            <a
                              href={whatsappHref(
                                student!.phone,
                                `Hi ${student!.name.split(" ")[0]}, a gentle reminder that your ${formatMonth(fee.month)} fee of ${formatINR(fee.amount)} is due. Thank you!`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <BellRing /> Remind
                            </a>
                          </Button>
                          <Button size="xs" variant="secondary" onClick={() => setPaying(fee)}>
                            Mark paid
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => {
                            store.markFeeUnpaid(fee.id)
                            toast.success(`${student!.name}'s payment undone`)
                          }}
                        >
                          <Undo2 /> Undo
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {rows.length === 0 && <NoResults />}
        </div>
      </div>
      <DemoDataNote />

      <PaymentDialog fee={paying} onClose={() => setPaying(null)} />
    </div>
  )
}

function PaymentDialog({ fee, onClose }: { fee: FeeRecord | null; onClose: () => void }) {
  const { markFeePaid } = useAdminStore()
  const { studentById } = useAdminLookups()
  const [mode, setMode] = useState<PaymentMode>("UPI")
  const student = fee ? studentById.get(fee.studentId) : undefined

  return (
    <Dialog open={!!fee} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record payment</DialogTitle>
          <DialogDescription>
            {student?.name} · {fee ? formatMonth(fee.month) : ""} · {fee ? formatINR(fee.amount) : ""}
          </DialogDescription>
        </DialogHeader>
        <div role="radiogroup" aria-label="Payment mode" className="grid grid-cols-3 gap-2">
          {PAYMENT_MODES.map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "h-12 rounded-xl border text-sm font-bold transition-colors",
                mode === m ? "border-navy bg-navy text-white" : "bg-card hover:border-foreground/30"
              )}
            >
              {m}
            </button>
          ))}
        </div>
        <DialogFooter>
          <Button variant="soft" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (!fee) return
              markFeePaid(fee.id, mode)
              toast.success(`Payment recorded for ${student?.name} (${mode})`)
              onClose()
            }}
          >
            Confirm payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

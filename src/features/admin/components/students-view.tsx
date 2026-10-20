"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { MessageCircle, MoreHorizontal, Phone, Plus } from "lucide-react"
import { toast } from "sonner"

import { AdminPageHeader } from "@/components/shared/admin-page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate, formatINR, formatMonth, toMonthKey } from "@/lib/utils"
import { STUDENT_STATUSES, type StudentStatus } from "@/types"

import { useAdminLookups, useAdminStore } from "../store"
import type { AdminStudent } from "../types"
import { DemoDataNote, FilterPills, FormField, Meter, NoResults, PersonCell, SearchField, whatsappHref } from "./admin-ui"

type StatusFilter = "all" | StudentStatus

export function StudentsView() {
  const store = useAdminStore()
  const { batchName } = useAdminLookups()
  const params = useSearchParams()
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<StatusFilter>("Active")
  const [batch, setBatch] = useState(params.get("batch") ?? "all")
  const [addOpen, setAddOpen] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const month = toMonthKey()

  const feeFor = (studentId: string) => store.fees.find((f) => f.studentId === studentId && f.month === month)

  const inBatch = store.students.filter((s) => batch === "all" || s.batchId === batch)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return inBatch.filter(
      (s) =>
        (status === "all" || s.status === status) &&
        (!q || s.name.toLowerCase().includes(q) || s.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")))
    )
  }, [inBatch, query, status])

  const options = [
    { value: "all" as const, label: "All", count: inBatch.length },
    ...STUDENT_STATUSES.map((s) => ({ value: s, label: s, count: inBatch.filter((x) => x.status === s).length })),
  ]
  const openStudent = store.students.find((s) => s.id === openId) ?? null

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Students"
        description="Everyone enrolled, their batch, attendance and this month's fee."
        actions={
          <Button variant="secondary" onClick={() => setAddOpen(true)}>
            <Plus /> Add student
          </Button>
        }
      />

      <div className="flex flex-col rounded-2xl border bg-card">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
          <FilterPills label="Filter by status" options={options} value={status} onChange={setStatus} />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select value={batch} onValueChange={setBatch}>
              <SelectTrigger size="sm" className="h-10 sm:w-52" aria-label="Filter by batch">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All batches</SelectItem>
                {store.batches.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <SearchField value={query} onChange={setQuery} placeholder="Search name or phone" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[820px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Student</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-44">Attendance</TableHead>
                <TableHead>{formatMonth(month).split(" ")[0]} fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5 text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => {
                const fee = feeFor(s.id)
                return (
                  <TableRow key={s.id} className="cursor-pointer" onClick={() => setOpenId(s.id)}>
                    <TableCell className="pl-5">
                      <PersonCell name={s.name} sub={s.phone} />
                    </TableCell>
                    <TableCell className="font-medium">{batchName(s.batchId)}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(s.joinedAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Meter value={s.attendance} tone={s.attendance < 75 ? "coral" : "green"} />
                        <span className="w-9 text-right text-xs font-semibold tabular-nums">{s.attendance}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{fee ? <StatusBadge status={fee.status} /> : <span className="text-muted-foreground">—</span>}</TableCell>
                    <TableCell>
                      <StatusBadge status={s.status} />
                    </TableCell>
                    <TableCell className="pr-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <StudentActions student={s} onOpen={() => setOpenId(s.id)} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          {filtered.length === 0 && <NoResults />}
        </div>
      </div>
      <DemoDataNote />

      <AddStudentDialog open={addOpen} onOpenChange={setAddOpen} defaultBatch={batch === "all" ? "" : batch} />
      <StudentSheet student={openStudent} onClose={() => setOpenId(null)} />
    </div>
  )
}

function StudentActions({ student, onOpen }: { student: AdminStudent; onOpen: () => void }) {
  const { fees, markFeePaid, updateStudent } = useAdminStore()
  const pending = fees.find((f) => f.studentId === student.id && f.month === toMonthKey() && f.status === "Pending")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${student.name}`}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onSelect={onOpen}>View profile</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={whatsappHref(student.phone)} target="_blank" rel="noopener noreferrer">
            <MessageCircle /> WhatsApp
          </a>
        </DropdownMenuItem>
        {pending && (
          <DropdownMenuItem
            onSelect={() => {
              markFeePaid(pending.id, "UPI")
              toast.success(`${student.name}'s fee marked paid`)
            }}
          >
            Mark this month paid
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {student.status === "Active" ? (
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              updateStudent(student.id, { status: "Dropped" })
              toast.success(`${student.name} marked as dropped`)
            }}
          >
            Mark as dropped
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onSelect={() => {
              updateStudent(student.id, { status: "Active" })
              toast.success(`${student.name} is active again`)
            }}
          >
            Mark as active
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AddStudentDialog({
  open,
  onOpenChange,
  defaultBatch,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultBatch: string
}) {
  const { batches, settings, addStudent } = useAdminStore()
  const [batchId, setBatchId] = useState(defaultBatch)

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (o) setBatchId(defaultBatch)
        onOpenChange(o)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a student</DialogTitle>
          <DialogDescription>
            This month&apos;s fee ({formatINR(settings.monthlyFee)}) is added as pending.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            const f = new FormData(e.currentTarget)
            const name = String(f.get("name") ?? "").trim()
            const phone = String(f.get("phone") ?? "").trim()
            if (!name || !phone || !batchId) return
            addStudent({ name, phone, batchId })
            toast.success(`${name} added`)
            onOpenChange(false)
          }}
        >
          <FormField label="Full name" htmlFor="stu-name">
            <Input id="stu-name" name="name" required autoComplete="off" />
          </FormField>
          <FormField label="Phone" htmlFor="stu-phone">
            <Input id="stu-phone" name="phone" type="tel" required autoComplete="off" />
          </FormField>
          <FormField label="Batch" htmlFor="stu-batch">
            <Select value={batchId} onValueChange={setBatchId} required>
              <SelectTrigger id="stu-batch">
                <SelectValue placeholder="Choose a batch" />
              </SelectTrigger>
              <SelectContent>
                {batches
                  .filter((b) => b.status !== "Completed")
                  .map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </FormField>
          <DialogFooter>
            <Button type="button" variant="soft" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary" disabled={!batchId}>
              Add student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function StudentSheet({ student, onClose }: { student: AdminStudent | null; onClose: () => void }) {
  const { fees, batches, updateStudent, markFeePaid } = useAdminStore()
  const { batchName } = useAdminLookups()
  const history = student ? fees.filter((f) => f.studentId === student.id).sort((a, b) => b.month.localeCompare(a.month)) : []
  const paid = history.filter((f) => f.status === "Paid").reduce((sum, f) => sum + f.amount, 0)

  return (
    <Sheet open={!!student} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        {student && (
          <>
            <SheetHeader className="border-b p-6">
              <div className="flex items-center gap-2">
                <StatusBadge status={student.status} />
              </div>
              <SheetTitle className="font-display text-2xl">{student.name}</SheetTitle>
              <SheetDescription>
                {batchName(student.batchId)} · joined {formatDate(student.joinedAt)}
              </SheetDescription>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button asChild size="sm" variant="soft">
                  <a href={`tel:${student.phone.replace(/[^\d+]/g, "")}`}>
                    <Phone /> {student.phone}
                  </a>
                </Button>
                <Button asChild size="sm" variant="soft">
                  <a href={whatsappHref(student.phone)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> WhatsApp
                  </a>
                </Button>
              </div>
            </SheetHeader>

            <div className="flex flex-col gap-6 px-6 pb-8">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/70 p-4">
                  <div className="text-xs font-semibold text-muted-foreground">Attendance</div>
                  <div className="mt-1 font-display text-2xl font-extrabold">{student.attendance}%</div>
                  <Meter value={student.attendance} tone={student.attendance < 75 ? "coral" : "green"} className="mt-2" />
                </div>
                <div className="rounded-xl bg-muted/70 p-4">
                  <div className="text-xs font-semibold text-muted-foreground">Fees paid</div>
                  <div className="mt-1 font-display text-2xl font-extrabold">{formatINR(paid)}</div>
                  <div className="mt-2 text-xs text-muted-foreground">{history.length} months billed</div>
                </div>
              </div>

              <FormField label="Batch" htmlFor="sheet-batch">
                <Select
                  value={student.batchId}
                  onValueChange={(v) => {
                    updateStudent(student.id, { batchId: v })
                    toast.success(`Moved to ${batchName(v)}`)
                  }}
                >
                  <SelectTrigger id="sheet-batch" className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <section className="flex flex-col gap-3">
                <h3 className="text-sm font-bold">Fee history</h3>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No fees billed.</p>
                ) : (
                  <ul className="divide-y rounded-xl border">
                    {history.map((f) => (
                      <li key={f.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                        <div>
                          <div className="font-semibold">{formatMonth(f.month)}</div>
                          <div className="text-xs text-muted-foreground">
                            {f.status === "Paid" ? `Paid ${formatDate(f.paidAt)} · ${f.mode}` : "Not paid yet"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold tabular-nums">{formatINR(f.amount)}</span>
                          {f.status === "Pending" ? (
                            <Button
                              size="xs"
                              variant="soft"
                              onClick={() => {
                                markFeePaid(f.id, "UPI")
                                toast.success(`${formatMonth(f.month)} fee marked paid`)
                              }}
                            >
                              Mark paid
                            </Button>
                          ) : (
                            <StatusBadge status="Paid" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

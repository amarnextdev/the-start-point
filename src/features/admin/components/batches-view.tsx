"use client"

import Link from "next/link"
import { useState } from "react"
import { CalendarDays, Clock, MapPin, MoreHorizontal, Pencil, Plus, Users } from "lucide-react"
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
import { BATCH_STATUSES, type BatchStatus } from "@/types"

import { useAdminStore } from "../store"
import type { AdminBatch } from "../types"
import { DemoDataNote, FilterPills, FormField, Meter, PersonAvatar } from "./admin-ui"

type Filter = "all" | BatchStatus

export function BatchesView() {
  const { batches, students } = useAdminStore()
  const [filter, setFilter] = useState<Filter>("all")
  const [editing, setEditing] = useState<AdminBatch | "new" | null>(null)

  const options = [
    { value: "all" as const, label: "All", count: batches.length },
    ...BATCH_STATUSES.map((s) => ({ value: s, label: s, count: batches.filter((b) => b.status === s).length })),
  ]
  const order: Record<BatchStatus, number> = { Running: 0, Upcoming: 1, Completed: 2 }
  const visible = batches
    .filter((b) => filter === "all" || b.status === filter)
    .sort((a, b) => order[a.status] - order[b.status])

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Batches"
        description="Timings, seats and who is in each batch."
        actions={
          <Button variant="secondary" onClick={() => setEditing("new")}>
            <Plus /> New batch
          </Button>
        }
      />

      <FilterPills label="Filter by status" options={options} value={filter} onChange={setFilter} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((b) => {
          const members = students.filter((s) => s.batchId === b.id && s.status !== "Dropped")
          return <BatchCard key={b.id} batch={b} members={members.map((m) => m.name)} onEdit={() => setEditing(b)} />
        })}
      </div>
      {visible.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No batches here yet.</p>}
      <DemoDataNote />

      <BatchDialog
        key={editing === "new" ? "new" : (editing?.id ?? "closed")}
        batch={editing}
        onClose={() => setEditing(null)}
      />
    </div>
  )
}

function BatchCard({ batch, members, onEdit }: { batch: AdminBatch; members: string[]; onEdit: () => void }) {
  const { saveBatch } = useAdminStore()
  const total = batch.totalSeats ?? 12
  // Upcoming batches count seat bookings; running/completed ones count enrolled students.
  const filled = batch.status === "Upcoming" ? total - (batch.seatsLeft ?? total) : members.length
  const left = Math.max(0, total - filled)

  return (
    <article className="flex flex-col rounded-2xl border bg-card p-5 transition-shadow hover:shadow-[0_20px_40px_-28px_rgb(19_32_63/0.45)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={batch.status} />
            <span className="text-xs font-semibold text-muted-foreground">{batch.level}</span>
          </div>
          <h3 className="mt-2 truncate font-display text-lg font-bold">{batch.name}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${batch.name}`}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={onEdit}>
              <Pencil /> Edit batch
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/students?batch=${batch.id}`}>
                <Users /> View students
              </Link>
            </DropdownMenuItem>
            {batch.status !== "Completed" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    saveBatch({ ...batch, status: batch.status === "Upcoming" ? "Running" : "Completed" })
                    toast.success(`${batch.name} marked ${batch.status === "Upcoming" ? "running" : "completed"}`)
                  }}
                >
                  {batch.status === "Upcoming" ? "Start batch" : "Mark completed"}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ul className="mt-4 flex flex-col gap-2 text-sm">
        <li className="flex items-center gap-2.5">
          <CalendarDays className="size-4 text-clay" aria-hidden />
          Starts {batch.startDate} · {batch.duration}
        </li>
        <li className="flex items-center gap-2.5">
          <Clock className="size-4 text-clay" aria-hidden />
          {batch.days} · {batch.timing}
        </li>
        <li className="flex items-center gap-2.5">
          <MapPin className="size-4 text-clay" aria-hidden />
          {batch.location}
        </li>
      </ul>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">
            {filled}/{total} {batch.status === "Upcoming" ? "seats booked" : "students"}
          </span>
          {batch.status !== "Completed" && (
            <span className={left <= 2 ? "font-bold text-clay" : "text-muted-foreground"}>
              {left === 0 ? "Full" : `${left} left`}
            </span>
          )}
        </div>
        <Meter value={filled} max={total} tone={left <= 2 && batch.status !== "Completed" ? "coral" : "navy"} className="mt-2" />
        {members.length > 0 && (
          <div className="mt-4 flex items-center">
            {members.slice(0, 6).map((name) => (
              <PersonAvatar key={name} name={name} className="-ml-2 size-8 ring-2 ring-card first:ml-0" />
            ))}
            {members.length > 6 && <span className="ml-2 text-xs font-semibold text-muted-foreground">+{members.length - 6} more</span>}
          </div>
        )}
      </div>
    </article>
  )
}

const emptyBatch: Omit<AdminBatch, "id"> = {
  name: "",
  hint: "",
  level: "Beginner",
  startDate: "",
  days: "Mon, Wed, Fri",
  timing: "",
  duration: "12 weeks",
  location: "Main classroom",
  seatsLeft: 12,
  totalSeats: 12,
  status: "Upcoming",
}

function BatchDialog({ batch, onClose }: { batch: AdminBatch | "new" | null; onClose: () => void }) {
  const { saveBatch } = useAdminStore()
  const isNew = batch === "new"
  const initial = batch && batch !== "new" ? batch : emptyBatch
  const [status, setStatus] = useState<BatchStatus>(initial.status)
  const [level, setLevel] = useState(initial.level)

  return (
    <Dialog open={!!batch} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isNew ? "New batch" : "Edit batch"}</DialogTitle>
          <DialogDescription>Upcoming batches appear on the website for visitors to pick.</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            const f = new FormData(e.currentTarget)
            const get = (k: string) => String(f.get(k) ?? "").trim()
            const totalSeats = Number(get("totalSeats")) || 12
            const booked = initial.totalSeats != null && initial.seatsLeft != null ? initial.totalSeats - initial.seatsLeft : 0
            saveBatch({
              ...initial,
              id: isNew ? undefined : (batch as AdminBatch).id,
              name: get("name"),
              startDate: get("startDate"),
              days: get("days"),
              timing: get("timing"),
              duration: get("duration"),
              location: get("location"),
              totalSeats,
              seatsLeft: Math.max(0, totalSeats - booked),
              level,
              status,
            })
            toast.success(isNew ? "Batch created" : "Batch updated")
            onClose()
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Batch name" htmlFor="b-name" className="sm:col-span-2">
              <Input id="b-name" name="name" defaultValue={initial.name} required placeholder="e.g. Morning Batch · Dec" />
            </FormField>
            <FormField label="Start date" htmlFor="b-start">
              <Input id="b-start" name="startDate" defaultValue={initial.startDate} required placeholder="e.g. 1 Dec 2026" />
            </FormField>
            <FormField label="Duration" htmlFor="b-duration">
              <Input id="b-duration" name="duration" defaultValue={initial.duration} required />
            </FormField>
            <FormField label="Days" htmlFor="b-days">
              <Input id="b-days" name="days" defaultValue={initial.days} required placeholder="e.g. Mon, Wed, Fri" />
            </FormField>
            <FormField label="Timing" htmlFor="b-timing">
              <Input id="b-timing" name="timing" defaultValue={initial.timing} required placeholder="e.g. 7:00 – 8:30 PM" />
            </FormField>
            <FormField label="Level" htmlFor="b-level">
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger id="b-level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Beginner", "Intermediate", "Advanced"].map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Status" htmlFor="b-status">
              <Select value={status} onValueChange={(v) => setStatus(v as BatchStatus)}>
                <SelectTrigger id="b-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BATCH_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Total seats" htmlFor="b-seats">
              <Input id="b-seats" name="totalSeats" type="number" min={1} max={40} defaultValue={initial.totalSeats ?? 12} required />
            </FormField>
            <FormField label="Location" htmlFor="b-location">
              <Input id="b-location" name="location" defaultValue={initial.location} required />
            </FormField>
          </div>
          <DialogFooter>
            <Button type="button" variant="soft" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary">
              {isNew ? "Create batch" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

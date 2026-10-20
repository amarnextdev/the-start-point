"use client"

import { useMemo, useState } from "react"
import { MessageCircle, MoreHorizontal, Phone, Plus, Trash2, UserPlus } from "lucide-react"
import { toast } from "sonner"

import { AdminPageHeader } from "@/components/shared/admin-page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/utils"
import { ENQUIRY_SOURCES, ENQUIRY_STATUSES, type EnquirySource, type EnquiryStatus } from "@/types"

import { useAdminLookups, useAdminStore } from "../store"
import type { AdminEnquiry } from "../types"
import { DemoDataNote, FilterPills, FormField, NoResults, PersonCell, SearchField, whatsappHref } from "./admin-ui"

type StatusFilter = "all" | EnquiryStatus

export function EnquiriesView() {
  const store = useAdminStore()
  const { batchName } = useAdminLookups()
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<StatusFilter>("all")
  const [batch, setBatch] = useState("all")
  const [addOpen, setAddOpen] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return store.enquiries.filter(
      (e) =>
        (status === "all" || e.status === status) &&
        (batch === "all" || e.batchId === batch) &&
        (!q || e.name.toLowerCase().includes(q) || e.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")))
    )
  }, [store.enquiries, query, status, batch])

  const statusOptions = [
    { value: "all" as const, label: "All", count: store.enquiries.length },
    ...ENQUIRY_STATUSES.map((s) => ({
      value: s,
      label: s === "Trial Class Scheduled" ? "Trial booked" : s,
      count: store.enquiries.filter((e) => e.status === s).length,
    })),
  ]
  const openEnquiry = store.enquiries.find((e) => e.id === openId) ?? null

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Enquiries"
        description="Everyone who asked about classes, from the website, WhatsApp or a visit."
        actions={
          <Button variant="secondary" onClick={() => setAddOpen(true)}>
            <Plus /> Add enquiry
          </Button>
        }
      />

      <div className="flex flex-col gap-4 rounded-2xl border bg-card">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
          <FilterPills label="Filter by status" options={statusOptions} value={status} onChange={setStatus} />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select value={batch} onValueChange={setBatch}>
              <SelectTrigger size="sm" className="h-10 sm:w-48" aria-label="Filter by batch">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All batches</SelectItem>
                {store.batches
                  .filter((b) => b.status === "Upcoming")
                  .map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                <SelectItem value="unsure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <SearchField value={query} onChange={setQuery} placeholder="Search name or phone" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[860px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Name</TableHead>
                <TableHead>Preferred batch</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Follow-up</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5 text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id} className="cursor-pointer" onClick={() => setOpenId(e.id)}>
                  <TableCell className="pl-5">
                    <PersonCell name={e.name} sub={e.phone} />
                  </TableCell>
                  <TableCell className="font-medium">{batchName(e.batchId)}</TableCell>
                  <TableCell className="text-muted-foreground">{e.source}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(e.createdAt)}</TableCell>
                  <TableCell>
                    <FollowUp date={e.followUpAt} done={e.status === "Joined"} />
                  </TableCell>
                  <TableCell onClick={(ev) => ev.stopPropagation()}>
                    <StatusSelect value={e.status} onChange={(s) => store.setEnquiryStatus(e.id, s)} />
                  </TableCell>
                  <TableCell className="pr-5 text-right" onClick={(ev) => ev.stopPropagation()}>
                    <RowActions enquiry={e} onOpen={() => setOpenId(e.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && <NoResults />}
        </div>
      </div>
      <DemoDataNote />

      <AddEnquiryDialog open={addOpen} onOpenChange={setAddOpen} />
      <EnquirySheet enquiry={openEnquiry} onClose={() => setOpenId(null)} />
    </div>
  )
}

function FollowUp({ date, done }: { date?: string; done: boolean }) {
  if (!date || done) return <span className="text-muted-foreground">—</span>
  const today = new Date().toISOString().slice(0, 10)
  const overdue = date < today
  const isToday = date === today
  return (
    <span className={overdue ? "font-semibold text-destructive" : isToday ? "font-semibold text-clay" : "text-muted-foreground"}>
      {isToday ? "Today" : formatDate(date)}
      {overdue && " · overdue"}
    </span>
  )
}

function StatusSelect({ value, onChange }: { value: EnquiryStatus; onChange: (s: EnquiryStatus) => void }) {
  return (
    <Select
      value={value}
      onValueChange={(v) => {
        onChange(v as EnquiryStatus)
        toast.success(`Status changed to ${v}`)
      }}
    >
      <SelectTrigger size="sm" className="h-8 w-auto gap-1 border-none bg-transparent px-0 shadow-none" aria-label="Change status">
        <StatusBadge status={value} />
      </SelectTrigger>
      <SelectContent>
        {ENQUIRY_STATUSES.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function RowActions({ enquiry, onOpen }: { enquiry: AdminEnquiry; onOpen: () => void }) {
  const { deleteEnquiry } = useAdminStore()
  return (
    <div className="flex items-center justify-end gap-1">
      <Button asChild variant="ghost" size="icon-sm" aria-label={`Call ${enquiry.name}`}>
        <a href={`tel:${enquiry.phone.replace(/[^\d+]/g, "")}`}>
          <Phone />
        </a>
      </Button>
      <Button asChild variant="ghost" size="icon-sm" aria-label={`WhatsApp ${enquiry.name}`}>
        <a href={whatsappHref(enquiry.phone, `Hi ${enquiry.name.split(" ")[0]}, thanks for your enquiry about English classes.`)} target="_blank" rel="noopener noreferrer">
          <MessageCircle />
        </a>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="More actions">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={onOpen}>View details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              deleteEnquiry(enquiry.id)
              toast.success(`Deleted enquiry from ${enquiry.name}`)
            }}
          >
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function AddEnquiryDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { batches, addEnquiry } = useAdminStore()
  const [batchId, setBatchId] = useState("unsure")
  const [source, setSource] = useState<EnquirySource>("Walk-in")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an enquiry</DialogTitle>
          <DialogDescription>For walk-ins, calls and WhatsApp messages. Website enquiries arrive here on their own.</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            const form = new FormData(e.currentTarget)
            const name = String(form.get("name") ?? "").trim()
            const phone = String(form.get("phone") ?? "").trim()
            if (!name || !phone) return
            addEnquiry({ name, phone, batchId, source, note: String(form.get("note") ?? "").trim() || undefined })
            toast.success(`Added enquiry from ${name}`)
            onOpenChange(false)
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Full name" htmlFor="enq-name">
              <Input id="enq-name" name="name" required autoComplete="off" />
            </FormField>
            <FormField label="Phone" htmlFor="enq-phone">
              <Input id="enq-phone" name="phone" type="tel" required autoComplete="off" />
            </FormField>
            <FormField label="Preferred batch" htmlFor="enq-batch">
              <Select value={batchId} onValueChange={setBatchId}>
                <SelectTrigger id="enq-batch">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {batches
                    .filter((b) => b.status === "Upcoming")
                    .map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  <SelectItem value="unsure">Not sure yet</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Source" htmlFor="enq-source">
              <Select value={source} onValueChange={(v) => setSource(v as EnquirySource)}>
                <SelectTrigger id="enq-source">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ENQUIRY_SOURCES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <FormField label="Note (optional)" htmlFor="enq-note">
            <Textarea id="enq-note" name="note" rows={3} placeholder="e.g. Prefers evenings, works in sales" />
          </FormField>
          <DialogFooter>
            <Button type="button" variant="soft" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary">
              Add enquiry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EnquirySheet({ enquiry, onClose }: { enquiry: AdminEnquiry | null; onClose: () => void }) {
  const store = useAdminStore()
  const { batchName } = useAdminLookups()
  const [note, setNote] = useState("")
  const [convertBatch, setConvertBatch] = useState("")
  const joinable = store.batches.filter((b) => b.status !== "Completed")

  return (
    <Sheet open={!!enquiry} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        {enquiry && (
          <>
            <SheetHeader className="border-b p-6">
              <SheetTitle className="font-display text-2xl">{enquiry.name}</SheetTitle>
              <SheetDescription>
                Enquired {formatDate(enquiry.createdAt)} via {enquiry.source}
              </SheetDescription>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button asChild size="sm" variant="soft">
                  <a href={`tel:${enquiry.phone.replace(/[^\d+]/g, "")}`}>
                    <Phone /> {enquiry.phone}
                  </a>
                </Button>
                <Button asChild size="sm" variant="soft">
                  <a href={whatsappHref(enquiry.phone)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> WhatsApp
                  </a>
                </Button>
              </div>
            </SheetHeader>

            <div className="flex flex-col gap-6 px-6 pb-8">
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold text-muted-foreground">Preferred batch</dt>
                  <dd className="mt-1 font-semibold">{batchName(enquiry.batchId)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-muted-foreground">Status</dt>
                  <dd className="mt-1">
                    <StatusSelect value={enquiry.status} onChange={(s) => store.setEnquiryStatus(enquiry.id, s)} />
                  </dd>
                </div>
                <div className="col-span-2">
                  <FormField label="Next follow-up" htmlFor="enq-follow">
                    <Input
                      id="enq-follow"
                      type="date"
                      value={enquiry.followUpAt ?? ""}
                      onChange={(e) => store.setEnquiryFollowUp(enquiry.id, e.target.value || undefined)}
                      className="h-10"
                    />
                  </FormField>
                </div>
              </dl>

              <section className="flex flex-col gap-3">
                <h3 className="text-sm font-bold">Notes</h3>
                {enquiry.notes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No notes yet.</p>
                ) : (
                  <ol className="flex flex-col gap-3 border-l-2 border-border pl-4">
                    {enquiry.notes.map((n, i) => (
                      <li key={i} className="text-sm">
                        <span className="text-xs text-muted-foreground">{formatDate(n.at)}</span>
                        <p className="mt-0.5">{n.text}</p>
                      </li>
                    ))}
                  </ol>
                )}
                <form
                  className="flex flex-col gap-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!note.trim()) return
                    store.addEnquiryNote(enquiry.id, note.trim())
                    setNote("")
                  }}
                >
                  <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Add a note about this call or visit" aria-label="New note" />
                  <Button type="submit" size="sm" variant="soft" className="self-end" disabled={!note.trim()}>
                    Save note
                  </Button>
                </form>
              </section>

              {enquiry.status !== "Joined" && (
                <section className="flex flex-col gap-3 rounded-2xl bg-muted/70 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-bold">
                    <UserPlus className="size-4" aria-hidden /> Enrol as a student
                  </h3>
                  <p className="text-xs text-muted-foreground">Adds them to Students with this month&apos;s fee marked pending.</p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Select value={convertBatch} onValueChange={setConvertBatch}>
                      <SelectTrigger className="h-10 bg-card" aria-label="Batch to join">
                        <SelectValue placeholder="Choose a batch" />
                      </SelectTrigger>
                      <SelectContent>
                        {joinable.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="secondary"
                      disabled={!convertBatch}
                      onClick={() => {
                        store.convertEnquiry(enquiry.id, convertBatch)
                        toast.success(`${enquiry.name} added to ${batchName(convertBatch)}`)
                        setConvertBatch("")
                      }}
                    >
                      Enrol
                    </Button>
                  </div>
                </section>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

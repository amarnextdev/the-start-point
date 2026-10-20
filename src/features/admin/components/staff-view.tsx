"use client"

import { useState } from "react"
import { Check, Mail, Minus, Trash2, UserPlus } from "lucide-react"
import { toast } from "sonner"

import { AdminPageHeader } from "@/components/shared/admin-page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/utils"
import type { StaffRole } from "@/types"

import { useAdminStore } from "../store"
import type { StaffMember } from "../types"
import { DemoDataNote, FormField, Panel, PersonCell } from "./admin-ui"

const permissions: { label: string; owner: boolean; staff: boolean }[] = [
  { label: "View and update enquiries", owner: true, staff: true },
  { label: "Manage batches and students", owner: true, staff: true },
  { label: "Record fee payments", owner: true, staff: true },
  { label: "Invite or remove staff", owner: true, staff: false },
  { label: "Change website and fee settings", owner: true, staff: false },
]

const roleLabel: Record<StaffRole, string> = { owner: "Owner", staff: "Staff" }

export function StaffView({ currentEmail }: { currentEmail: string }) {
  const { staff, updateStaff, removeStaff } = useAdminStore()
  const [inviteOpen, setInviteOpen] = useState(false)
  const [removing, setRemoving] = useState<StaffMember | null>(null)

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Staff"
        description="People who can sign in to this dashboard."
        actions={
          <Button variant="secondary" onClick={() => setInviteOpen(true)}>
            <UserPlus /> Invite staff
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Team" description={`${staff.length} members`}>
          <ul className="divide-y">
            {staff.map((m) => {
              const isYou = m.email === currentEmail
              return (
                <li key={m.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                  <PersonCell
                    name={isYou ? `${m.name} (you)` : m.name}
                    sub={
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="size-3" aria-hidden /> {m.email}
                      </span>
                    }
                  />
                  <div className="flex items-center gap-2">
                    <span className="hidden text-xs text-muted-foreground md:inline">
                      {m.status === "Invited" ? "Invite sent" : `Active ${formatDate(m.lastActiveAt)}`}
                    </span>
                    <StatusBadge status={m.status} />
                    {isYou ? (
                      <span className="w-28 text-center text-sm font-semibold">{roleLabel[m.role]}</span>
                    ) : (
                      <Select
                        value={m.role}
                        onValueChange={(v) => {
                          updateStaff(m.id, { role: v as StaffRole })
                          toast.success(`${m.name} is now ${roleLabel[v as StaffRole]}`)
                        }}
                      >
                        <SelectTrigger size="sm" className="w-28" aria-label={`Role for ${m.name}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={isYou}
                      aria-label={`Remove ${m.name}`}
                      onClick={() => setRemoving(m)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </Panel>

        <Panel title="What each role can do">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="px-5 py-3 text-left font-semibold">Permission</th>
                <th className="px-3 py-3 font-semibold">Owner</th>
                <th className="px-5 py-3 font-semibold">Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {permissions.map((p) => (
                <tr key={p.label}>
                  <td className="px-5 py-3">{p.label}</td>
                  {[p.owner, p.staff].map((allowed, i) => (
                    <td key={i} className="px-3 py-3 text-center last:pr-5">
                      {allowed ? (
                        <Check className="mx-auto size-4 text-[#1f9d6d]" strokeWidth={3} aria-label="Allowed" />
                      ) : (
                        <Minus className="mx-auto size-4 text-muted-foreground/50" aria-label="Not allowed" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
      <DemoDataNote />

      <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} />

      <Dialog open={!!removing} onOpenChange={(open) => !open && setRemoving(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove {removing?.name}?</DialogTitle>
            <DialogDescription>They will no longer be able to sign in. You can invite them again later.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="soft" onClick={() => setRemoving(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!removing) return
                removeStaff(removing.id)
                toast.success(`${removing.name} removed`)
                setRemoving(null)
              }}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function InviteDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { inviteStaff } = useAdminStore()
  const [role, setRole] = useState<StaffRole>("staff")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite a team member</DialogTitle>
          <DialogDescription>They get an email with a link to set their password.</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            const f = new FormData(e.currentTarget)
            const name = String(f.get("name") ?? "").trim()
            const email = String(f.get("email") ?? "").trim()
            if (!name || !email) return
            inviteStaff({ name, email, role })
            toast.success(`Invite sent to ${email}`)
            onOpenChange(false)
          }}
        >
          <FormField label="Full name" htmlFor="inv-name">
            <Input id="inv-name" name="name" required autoComplete="off" />
          </FormField>
          <FormField label="Email" htmlFor="inv-email">
            <Input id="inv-email" name="email" type="email" required autoComplete="off" />
          </FormField>
          <FormField label="Role" htmlFor="inv-role">
            <Select value={role} onValueChange={(v) => setRole(v as StaffRole)}>
              <SelectTrigger id="inv-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <DialogFooter>
            <Button type="button" variant="soft" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary">
              Send invite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

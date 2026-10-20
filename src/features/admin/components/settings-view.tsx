"use client"

import { useState } from "react"
import { Building2, Bell, Database, GraduationCap, RotateCcw } from "lucide-react"
import { toast } from "sonner"

import { AdminPageHeader } from "@/components/shared/admin-page-header"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { useAdminStore } from "../store"
import type { AdminSettings } from "../types"
import { FormField, Panel } from "./admin-ui"

export function SettingsView() {
  const { settings } = useAdminStore()
  return <SettingsForms settings={settings} />
}

function SettingsForms({ settings }: { settings: AdminSettings }) {
  const { updateSettings, resetDemoData } = useAdminStore()
  const [draft, setDraft] = useState(settings)
  const [resetOpen, setResetOpen] = useState(false)
  const set = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => setDraft((d) => ({ ...d, [key]: value }))

  const save = (keys: (keyof AdminSettings)[], label: string) => {
    updateSettings(Object.fromEntries(keys.map((k) => [k, draft[k]])) as Partial<AdminSettings>)
    toast.success(`${label} saved`)
  }

  const text = (key: keyof AdminSettings, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <FormField label={label} htmlFor={`set-${key}`}>
      <Input id={`set-${key}`} value={String(draft[key])} onChange={(e) => set(key, e.target.value as never)} {...props} />
    </FormField>
  )

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Settings" description="Institute details, course fees and notifications." />

      <Tabs defaultValue="institute" className="gap-6">
        <div className="overflow-x-auto">
          <TabsList>
            <TabsTrigger value="institute">
              <Building2 /> Institute
            </TabsTrigger>
            <TabsTrigger value="course">
              <GraduationCap /> Course &amp; fees
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell /> Notifications
            </TabsTrigger>
            <TabsTrigger value="data">
              <Database /> Data
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="institute">
          <Panel title="Institute details" description="Shown on the website's contact section, footer and enquiry replies.">
            <form
              className="grid gap-5 p-5 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                save(["instituteName", "phone", "whatsapp", "email", "hours", "address", "landmark"], "Institute details")
              }}
            >
              {text("instituteName", "Institute name", { required: true })}
              {text("email", "Email", { type: "email", required: true })}
              {text("phone", "Phone", { type: "tel", required: true })}
              {text("whatsapp", "WhatsApp number", { type: "tel" })}
              <FormField label="Address" htmlFor="set-address" className="sm:col-span-2">
                <Textarea id="set-address" rows={2} value={draft.address} onChange={(e) => set("address", e.target.value)} />
              </FormField>
              {text("landmark", "Landmark")}
              {text("hours", "Opening hours")}
              <div className="flex justify-end sm:col-span-2">
                <Button type="submit" variant="secondary">
                  Save changes
                </Button>
              </div>
            </form>
          </Panel>
        </TabsContent>

        <TabsContent value="course">
          <Panel title="Course & fees" description="New fee amounts apply to fees billed from now on.">
            <form
              className="grid gap-5 p-5 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                save(["courseName", "monthlyFee", "durationWeeks", "classSize"], "Course settings")
              }}
            >
              <FormField label="Course name" htmlFor="set-courseName" className="sm:col-span-2">
                <Input id="set-courseName" value={draft.courseName} onChange={(e) => set("courseName", e.target.value)} required />
              </FormField>
              <FormField label="Monthly fee (₹)" htmlFor="set-monthlyFee">
                <Input
                  id="set-monthlyFee"
                  type="number"
                  min={0}
                  step={100}
                  value={draft.monthlyFee}
                  onChange={(e) => set("monthlyFee", Number(e.target.value))}
                  required
                />
              </FormField>
              <FormField label="Duration (weeks)" htmlFor="set-durationWeeks">
                <Input
                  id="set-durationWeeks"
                  type="number"
                  min={1}
                  value={draft.durationWeeks}
                  onChange={(e) => set("durationWeeks", Number(e.target.value))}
                  required
                />
              </FormField>
              <FormField label="Max students per batch" htmlFor="set-classSize">
                <Input
                  id="set-classSize"
                  type="number"
                  min={1}
                  value={draft.classSize}
                  onChange={(e) => set("classSize", Number(e.target.value))}
                  required
                />
              </FormField>
              <div className="flex justify-end sm:col-span-2">
                <Button type="submit" variant="secondary">
                  Save changes
                </Button>
              </div>
            </form>
          </Panel>
        </TabsContent>

        <TabsContent value="notifications">
          <Panel title="Notifications" description="How the dashboard keeps you posted.">
            <ul className="divide-y">
              {(
                [
                  ["notifyNewEnquiry", "Email me for every new enquiry", "Get an email as soon as someone fills in the website form."],
                  ["dailySummary", "Daily WhatsApp summary", "A short message each evening with new enquiries and fees received."],
                  ["autoFeeReminder", "Automatic fee reminders", "Remind students on the 5th if their monthly fee is still pending."],
                ] as const
              ).map(([key, title, description]) => (
                <li key={key} className="flex items-center justify-between gap-6 px-5 py-4">
                  <label htmlFor={`set-${key}`} className="cursor-pointer">
                    <span className="block font-semibold">{title}</span>
                    <span className="text-sm text-muted-foreground">{description}</span>
                  </label>
                  <Switch
                    id={`set-${key}`}
                    checked={draft[key]}
                    onCheckedChange={(checked) => {
                      set(key, checked)
                      updateSettings({ [key]: checked })
                      toast.success(`${title} ${checked ? "on" : "off"}`)
                    }}
                  />
                </li>
              ))}
            </ul>
          </Panel>
        </TabsContent>

        <TabsContent value="data">
          <Panel title="Demo data" description="The dashboard runs on sample records until the database is connected.">
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <p className="max-w-xl text-sm text-muted-foreground">
                Your changes are saved in this browser only. Resetting brings back the original sample enquiries, students, batches and fees.
              </p>
              <Button variant="soft" onClick={() => setResetOpen(true)}>
                <RotateCcw /> Reset demo data
              </Button>
            </div>
          </Panel>
        </TabsContent>
      </Tabs>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset demo data?</DialogTitle>
            <DialogDescription>Every change you made in this browser will be lost.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="soft" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                resetDemoData()
                setResetOpen(false)
                toast.success("Demo data reset")
              }}
            >
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

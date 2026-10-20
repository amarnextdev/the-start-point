"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react"

import { StatGridSkeleton, TableSkeleton } from "@/components/skeletons"
import { Skeleton } from "@/components/ui/skeleton"

import { toMonthKey } from "@/lib/utils"
import type { EnquirySource, EnquiryStatus, PaymentMode, StaffRole } from "@/types"

import { createDemoData } from "./data/demo-data"
import type { AdminBatch, AdminData, AdminEnquiry, AdminSettings, AdminStudent, StaffMember } from "./types"

/**
 * Client-side store for the admin panel's demo data. Changes are saved to localStorage
 * so they survive a refresh. Phase 3/4 swaps these actions for database calls.
 */
const STORAGE_KEY = "ce-admin-demo-v1"

const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
const nowIso = () => new Date().toISOString()

type AdminStore = AdminData & {
  ready: boolean
  addEnquiry: (input: { name: string; phone: string; batchId: string; source: EnquirySource; note?: string }) => void
  setEnquiryStatus: (id: string, status: EnquiryStatus) => void
  setEnquiryFollowUp: (id: string, date: string | undefined) => void
  addEnquiryNote: (id: string, text: string) => void
  convertEnquiry: (id: string, batchId: string) => void
  deleteEnquiry: (id: string) => void
  saveBatch: (batch: Omit<AdminBatch, "id"> & { id?: string }) => void
  addStudent: (input: { name: string; phone: string; batchId: string }) => void
  updateStudent: (id: string, patch: Partial<Omit<AdminStudent, "id">>) => void
  markFeePaid: (feeId: string, mode: PaymentMode) => void
  markFeeUnpaid: (feeId: string) => void
  inviteStaff: (input: { name: string; email: string; role: StaffRole }) => void
  updateStaff: (id: string, patch: Partial<Omit<StaffMember, "id">>) => void
  removeStaff: (id: string) => void
  updateSettings: (patch: Partial<AdminSettings>) => void
  resetDemoData: () => void
}

const AdminStoreContext = createContext<AdminStore | null>(null)

function loadSaved(): AdminData | null {
  if (typeof window === "undefined") return null
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as AdminData) : null
  } catch {
    // Corrupt or blocked storage: fall back to fresh demo data.
    return null
  }
}

const noopSubscribe = () => () => {}

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AdminData>(() => loadSaved() ?? createDemoData())
  // False during server rendering and hydration, true after. The views only render once
  // mounted, because the saved data lives in this browser and the server can't see it.
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false)

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // Storage full or blocked; changes still work for this session.
    }
  }, [data, ready])

  const update = useCallback((fn: (d: AdminData) => AdminData) => setData((d) => fn(d)), [])

  const addStudentTo = useCallback(
    (d: AdminData, input: { name: string; phone: string; batchId: string }): AdminData => {
      const student: AdminStudent = {
        id: newId("stu"),
        name: input.name,
        phone: input.phone,
        batchId: input.batchId,
        joinedAt: nowIso().slice(0, 10),
        status: "Active",
        attendance: 100,
      }
      return {
        ...d,
        students: [student, ...d.students],
        fees: [
          {
            id: newId("fee"),
            studentId: student.id,
            month: toMonthKey(),
            amount: d.settings.monthlyFee,
            status: "Pending",
          },
          ...d.fees,
        ],
      }
    },
    []
  )

  const actions = useMemo(
    () => ({
      addEnquiry: (input: { name: string; phone: string; batchId: string; source: EnquirySource; note?: string }) =>
        update((d) => ({
          ...d,
          enquiries: [
            {
              id: newId("enq"),
              name: input.name,
              phone: input.phone,
              batchId: input.batchId,
              source: input.source,
              status: "New",
              createdAt: nowIso(),
              notes: input.note ? [{ at: nowIso(), text: input.note }] : [],
            },
            ...d.enquiries,
          ],
        })),
      setEnquiryStatus: (id: string, status: EnquiryStatus) =>
        update((d) => ({ ...d, enquiries: d.enquiries.map((e) => (e.id === id ? { ...e, status } : e)) })),
      setEnquiryFollowUp: (id: string, date: string | undefined) =>
        update((d) => ({ ...d, enquiries: d.enquiries.map((e) => (e.id === id ? { ...e, followUpAt: date } : e)) })),
      addEnquiryNote: (id: string, text: string) =>
        update((d) => ({
          ...d,
          enquiries: d.enquiries.map((e) =>
            e.id === id ? { ...e, notes: [...e.notes, { at: nowIso(), text }] } : e
          ),
        })),
      convertEnquiry: (id: string, batchId: string) =>
        update((d) => {
          const enquiry = d.enquiries.find((e) => e.id === id)
          if (!enquiry) return d
          const withStudent = addStudentTo(d, { name: enquiry.name, phone: enquiry.phone, batchId })
          return {
            ...withStudent,
            enquiries: withStudent.enquiries.map((e) =>
              e.id === id
                ? { ...e, status: "Joined", notes: [...e.notes, { at: nowIso(), text: "Added as a student." }] }
                : e
            ),
          }
        }),
      deleteEnquiry: (id: string) => update((d) => ({ ...d, enquiries: d.enquiries.filter((e) => e.id !== id) })),
      saveBatch: (batch: Omit<AdminBatch, "id"> & { id?: string }) =>
        update((d) =>
          batch.id
            ? { ...d, batches: d.batches.map((b) => (b.id === batch.id ? { ...b, ...batch, id: b.id } : b)) }
            : { ...d, batches: [{ ...batch, id: newId("batch") }, ...d.batches] }
        ),
      addStudent: (input: { name: string; phone: string; batchId: string }) => update((d) => addStudentTo(d, input)),
      updateStudent: (id: string, patch: Partial<Omit<AdminStudent, "id">>) =>
        update((d) => ({ ...d, students: d.students.map((s) => (s.id === id ? { ...s, ...patch } : s)) })),
      markFeePaid: (feeId: string, mode: PaymentMode) =>
        update((d) => ({
          ...d,
          fees: d.fees.map((f) => (f.id === feeId ? { ...f, status: "Paid", mode, paidAt: nowIso().slice(0, 10) } : f)),
        })),
      markFeeUnpaid: (feeId: string) =>
        update((d) => ({
          ...d,
          fees: d.fees.map((f) => (f.id === feeId ? { ...f, status: "Pending", mode: undefined, paidAt: undefined } : f)),
        })),
      inviteStaff: (input: { name: string; email: string; role: StaffRole }) =>
        update((d) => ({ ...d, staff: [...d.staff, { id: newId("staff"), ...input, status: "Invited" }] })),
      updateStaff: (id: string, patch: Partial<Omit<StaffMember, "id">>) =>
        update((d) => ({ ...d, staff: d.staff.map((m) => (m.id === id ? { ...m, ...patch } : m)) })),
      removeStaff: (id: string) => update((d) => ({ ...d, staff: d.staff.filter((m) => m.id !== id) })),
      updateSettings: (patch: Partial<AdminSettings>) =>
        update((d) => ({ ...d, settings: { ...d.settings, ...patch } })),
      resetDemoData: () => setData(createDemoData()),
    }),
    [update, addStudentTo]
  )

  const value = useMemo<AdminStore>(() => ({ ...data, ready, ...actions }), [data, ready, actions])

  return (
    <AdminStoreContext.Provider value={value}>
      {ready ? (
        children
      ) : (
        <div role="status" aria-label="Loading" className="flex flex-col gap-6">
          <Skeleton className="h-9 w-48" />
          <StatGridSkeleton />
          <TableSkeleton />
        </div>
      )}
    </AdminStoreContext.Provider>
  )
}

export function useAdminStore() {
  const store = useContext(AdminStoreContext)
  if (!store) throw new Error("useAdminStore must be used inside <AdminDataProvider>")
  return store
}

/** Lookup helpers shared by the admin views. */
export function useAdminLookups() {
  const { batches, students } = useAdminStore()
  return useMemo(() => {
    const batchById = new Map(batches.map((b) => [b.id, b]))
    const studentById = new Map(students.map((s) => [s.id, s]))
    return {
      batchName: (id: string) => (id === "unsure" ? "Not sure yet" : (batchById.get(id)?.name ?? "Unknown batch")),
      batchById,
      studentById,
    }
  }, [batches, students])
}

export type { AdminEnquiry }

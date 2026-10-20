import type { Batch } from "@/features/batches/types"
import type {
  EnquirySource,
  EnquiryStatus,
  FeeStatus,
  PaymentMode,
  StaffRole,
  StaffStatus,
  StudentStatus,
} from "@/types"

export type AdminBatch = Batch

export type EnquiryNote = { at: string; text: string }

export type AdminEnquiry = {
  id: string
  name: string
  phone: string
  /** A batch id, or "unsure" when the visitor hasn't picked one. */
  batchId: string
  source: EnquirySource
  status: EnquiryStatus
  createdAt: string
  followUpAt?: string
  notes: EnquiryNote[]
}

export type AdminStudent = {
  id: string
  name: string
  phone: string
  batchId: string
  joinedAt: string
  status: StudentStatus
  /** Attendance so far, 0–100. */
  attendance: number
}

export type FeeRecord = {
  id: string
  studentId: string
  /** Billing month, e.g. "2026-10". */
  month: string
  amount: number
  status: FeeStatus
  paidAt?: string
  mode?: PaymentMode
}

export type StaffMember = {
  id: string
  name: string
  email: string
  role: StaffRole
  status: StaffStatus
  lastActiveAt?: string
}

export type AdminSettings = {
  instituteName: string
  phone: string
  whatsapp: string
  email: string
  address: string
  landmark: string
  hours: string
  courseName: string
  monthlyFee: number
  durationWeeks: number
  classSize: number
  notifyNewEnquiry: boolean
  dailySummary: boolean
  autoFeeReminder: boolean
}

export type AdminData = {
  enquiries: AdminEnquiry[]
  students: AdminStudent[]
  batches: AdminBatch[]
  fees: FeeRecord[]
  staff: StaffMember[]
  settings: AdminSettings
}

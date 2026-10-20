import { siteConfig } from "@/config/site"
import { DEMO_ACCOUNT } from "@/features/auth/demo"
import { placeholderBatches } from "@/features/batches/data/placeholder-batches"
import type { PaymentMode } from "@/types"

import type { AdminBatch, AdminData, AdminEnquiry, AdminStudent, FeeRecord, StaffMember } from "../types"

/**
 * Demo records for the admin panel, used until the database is connected.
 * Phone numbers use an obviously fake "+91 90000" range so no real person is contacted.
 */

const MONTHLY_FEE = 3000

const runningBatches: AdminBatch[] = [
  {
    id: "batch-sep-morning",
    name: "Morning Batch · Sep",
    hint: "Started 1 Sep",
    level: "Beginner",
    startDate: "1 Sep 2026",
    days: "Mon, Wed, Fri",
    timing: "7:00 – 8:30 AM",
    duration: "12 weeks",
    location: "Main classroom",
    seatsLeft: 1,
    totalSeats: 12,
    status: "Running",
  },
  {
    id: "batch-sep-evening",
    name: "Evening Batch · Sep",
    hint: "Started 2 Sep",
    level: "Beginner",
    startDate: "2 Sep 2026",
    days: "Tue, Thu, Sat",
    timing: "7:00 – 8:30 PM",
    duration: "12 weeks",
    location: "Main classroom",
    seatsLeft: 0,
    totalSeats: 12,
    status: "Running",
  },
  {
    id: "batch-jun-weekend",
    name: "Weekend Batch · Jun",
    hint: "Finished 23 Aug",
    level: "Intermediate",
    startDate: "6 Jun 2026",
    days: "Sat, Sun",
    timing: "10:00 AM – 12:15 PM",
    duration: "12 weeks",
    location: "Main classroom",
    seatsLeft: 4,
    totalSeats: 12,
    status: "Completed",
  },
]

const morningNames = [
  "Aarav Joshi", "Sneha Patil", "Rahul Deshmukh", "Isha Kulkarni", "Omkar Shinde", "Pooja Jadhav",
  "Siddharth Rao", "Ananya Gokhale", "Kunal Bhosale", "Riya Pawar", "Tejas More",
]
const eveningNames = [
  "Vikram Nair", "Meera Iyer", "Arjun Mehta", "Neha Sawant", "Rohit Chavan", "Kavya Menon",
  "Aditya Kale", "Shreya Bapat", "Nikhil Gaikwad", "Prachi Thakur", "Saurabh Kadam", "Divya Sharma",
]
const completedNames = [
  "Manasi Joshi", "Harsh Vora", "Swati Ranade", "Yash Agarwal", "Tanvi Paranjpe", "Akash Mane", "Rutuja Salunkhe", "Gaurav Pande",
]

let phoneSeq = 10100
const fakePhone = () => `+91 90000 ${phoneSeq++}`

function makeStudents(names: string[], batchId: string, joinedAt: string, status: AdminStudent["status"], offset: number) {
  return names.map<AdminStudent>((name, i) => ({
    id: `stu-${batchId}-${i + 1}`,
    name,
    phone: fakePhone(),
    batchId,
    joinedAt,
    status,
    attendance: 68 + ((i + offset) * 7) % 31,
  }))
}

const students: AdminStudent[] = [
  ...makeStudents(morningNames, "batch-sep-morning", "2026-08-28", "Active", 0),
  ...makeStudents(eveningNames, "batch-sep-evening", "2026-08-30", "Active", 3),
  ...makeStudents(completedNames, "batch-jun-weekend", "2026-06-02", "Completed", 5),
]
// One evening student stopped attending.
students[students.findIndex((s) => s.name === "Saurabh Kadam")]!.status = "Dropped"

const modes: PaymentMode[] = ["UPI", "UPI", "Cash", "UPI", "Card"]
const pendingInOctober = new Set(["Rahul Deshmukh", "Tejas More", "Meera Iyer", "Rohit Chavan", "Prachi Thakur", "Divya Sharma"])

const fees: FeeRecord[] = students
  .filter((s) => s.status !== "Completed")
  .flatMap((s, i) => {
    const september: FeeRecord = {
      id: `fee-${s.id}-2026-09`,
      studentId: s.id,
      month: "2026-09",
      amount: MONTHLY_FEE,
      status: s.name === "Saurabh Kadam" ? "Pending" : "Paid",
      paidAt: s.name === "Saurabh Kadam" ? undefined : `2026-09-0${(i % 7) + 1}`,
      mode: s.name === "Saurabh Kadam" ? undefined : modes[i % modes.length],
    }
    if (s.status === "Dropped") return [september]
    const pending = pendingInOctober.has(s.name)
    const october: FeeRecord = {
      id: `fee-${s.id}-2026-10`,
      studentId: s.id,
      month: "2026-10",
      amount: MONTHLY_FEE,
      status: pending ? "Pending" : "Paid",
      paidAt: pending ? undefined : `2026-10-0${(i % 8) + 1}`,
      mode: pending ? undefined : modes[(i + 2) % modes.length],
    }
    return [september, october]
  })

const enquiries: AdminEnquiry[] = [
  { id: "enq-16", name: "Aditi Kulkarni", phone: fakePhone(), batchId: "batch-morning", source: "Website", status: "New", createdAt: "2026-10-20T08:42:00", notes: [] },
  { id: "enq-15", name: "Farhan Shaikh", phone: fakePhone(), batchId: "batch-evening", source: "WhatsApp", status: "New", createdAt: "2026-10-19T19:10:00", notes: [] },
  { id: "enq-14", name: "Lata Deshpande", phone: fakePhone(), batchId: "batch-weekend", source: "Walk-in", status: "New", createdAt: "2026-10-19T11:25:00", notes: [{ at: "2026-10-19T11:30:00", text: "Visited with her daughter. Wants weekend timing." }] },
  { id: "enq-13", name: "Varun Hegde", phone: fakePhone(), batchId: "unsure", source: "Instagram", status: "New", createdAt: "2026-10-18T21:04:00", notes: [] },
  { id: "enq-12", name: "Simran Kaur", phone: fakePhone(), batchId: "batch-evening", source: "Website", status: "New", createdAt: "2026-10-18T16:40:00", notes: [] },
  { id: "enq-11", name: "Mayur Lokhande", phone: fakePhone(), batchId: "batch-morning", source: "Referral", status: "Contacted", createdAt: "2026-10-17T10:15:00", followUpAt: "2026-10-21", notes: [{ at: "2026-10-17T12:00:00", text: "Called. Will confirm after checking college timetable." }] },
  { id: "enq-10", name: "Nisha Verma", phone: fakePhone(), batchId: "batch-evening", source: "Website", status: "Contacted", createdAt: "2026-10-16T18:22:00", followUpAt: "2026-10-20", notes: [{ at: "2026-10-16T19:05:00", text: "Works in IT, wants evening. Sent fee details on WhatsApp." }] },
  { id: "enq-9", name: "Prakash Jagtap", phone: fakePhone(), batchId: "batch-weekend", source: "WhatsApp", status: "Contacted", createdAt: "2026-10-15T09:48:00", followUpAt: "2026-10-22", notes: [] },
  { id: "enq-8", name: "Rashmi Pillai", phone: fakePhone(), batchId: "unsure", source: "Website", status: "Contacted", createdAt: "2026-10-14T14:30:00", notes: [{ at: "2026-10-14T16:00:00", text: "Not sure of level. Suggested a 5-minute speaking check." }] },
  { id: "enq-7", name: "Abhishek Rane", phone: fakePhone(), batchId: "batch-evening", source: "Referral", status: "Trial Class Scheduled", createdAt: "2026-10-12T20:12:00", followUpAt: "2026-10-23", notes: [{ at: "2026-10-13T10:00:00", text: "Demo class booked for Thu 23 Oct, evening batch." }] },
  { id: "enq-6", name: "Gauri Phadke", phone: fakePhone(), batchId: "batch-morning", source: "Website", status: "Trial Class Scheduled", createdAt: "2026-10-11T07:55:00", followUpAt: "2026-10-22", notes: [] },
  { id: "enq-5", name: "Imran Qureshi", phone: fakePhone(), batchId: "batch-weekend", source: "Instagram", status: "Trial Class Scheduled", createdAt: "2026-10-09T13:05:00", followUpAt: "2026-10-25", notes: [] },
  { id: "enq-4", name: "Kirti Wagh", phone: fakePhone(), batchId: "batch-morning", source: "Walk-in", status: "Joined", createdAt: "2026-10-06T10:40:00", notes: [{ at: "2026-10-08T11:00:00", text: "Paid booking amount for Nov morning batch." }] },
  { id: "enq-3", name: "Sameer Khan", phone: fakePhone(), batchId: "batch-evening", source: "Website", status: "Joined", createdAt: "2026-10-04T17:30:00", notes: [] },
  { id: "enq-2", name: "Ankita Dhole", phone: fakePhone(), batchId: "batch-evening", source: "Referral", status: "Joined", createdAt: "2026-10-02T12:10:00", notes: [] },
  { id: "enq-1", name: "Ritesh Mahajan", phone: fakePhone(), batchId: "batch-weekend", source: "WhatsApp", status: "Joined", createdAt: "2026-10-01T09:00:00", notes: [] },
]

const staff: StaffMember[] = [
  { id: "staff-owner", name: DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email, role: "owner", status: "Active", lastActiveAt: "2026-10-20T09:15:00" },
  { id: "staff-rohan", name: "Rohan Mehta", email: "rohan@confidentenglish.in", role: "staff", status: "Active", lastActiveAt: "2026-10-19T18:40:00" },
  { id: "staff-priya", name: "Priya Nair", email: "priya@confidentenglish.in", role: "staff", status: "Invited" },
]

export function createDemoData(): AdminData {
  const { contact, course } = siteConfig
  return structuredClone({
    enquiries,
    students,
    batches: [...runningBatches.slice(0, 2), ...placeholderBatches, runningBatches[2]!],
    fees,
    staff,
    settings: {
      instituteName: siteConfig.name,
      phone: contact.phone,
      whatsapp: contact.whatsapp,
      email: contact.email,
      address: contact.address,
      landmark: contact.landmark,
      hours: contact.hours,
      courseName: course.name,
      monthlyFee: MONTHLY_FEE,
      durationWeeks: 12,
      classSize: Number(course.classSize),
      notifyNewEnquiry: true,
      dailySummary: false,
      autoFeeReminder: true,
    },
  })
}

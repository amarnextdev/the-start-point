import type { Batch } from "../types"

/**
 * Placeholder batches shown until the database is connected (phase 3).
 * After that, batches come from Admin → Batches.
 */
export const placeholderBatches: Batch[] = [
  {
    id: "batch-morning",
    name: "Morning Batch",
    hint: "Before college or office",
    level: "Beginner",
    startDate: "3 Nov 2026",
    days: "Mon, Wed, Fri",
    timing: "7:00 – 8:30 AM",
    duration: "12 weeks",
    location: "Main classroom",
    seatsLeft: 5,
    totalSeats: 12,
    status: "Upcoming",
  },
  {
    id: "batch-evening",
    name: "Evening Batch",
    hint: "For working professionals",
    tag: "Most popular",
    level: "Beginner",
    startDate: "4 Nov 2026",
    days: "Tue, Thu, Sat",
    timing: "7:00 – 8:30 PM",
    duration: "12 weeks",
    location: "Main classroom",
    seatsLeft: 2,
    totalSeats: 12,
    status: "Upcoming",
  },
  {
    id: "batch-weekend",
    name: "Weekend Batch",
    hint: "Longer classes, two days a week",
    level: "Intermediate",
    startDate: "8 Nov 2026",
    days: "Sat, Sun",
    timing: "10:00 AM – 12:15 PM",
    duration: "12 weeks",
    location: "Main classroom",
    seatsLeft: 8,
    totalSeats: 12,
    status: "Upcoming",
  },
]

/** Phase 3 swaps this for a MongoDB query; pages already call it as async. */
export async function getPublicBatches(): Promise<Batch[]> {
  return placeholderBatches
}

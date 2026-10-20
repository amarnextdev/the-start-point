import type { BatchStatus } from "@/types"

export type Batch = {
  id: string
  name: string
  /** Short hint shown under the name, e.g. "Morning batch". */
  hint?: string
  /** Optional highlight, e.g. "Most popular". The card is shown featured when set. */
  tag?: string
  level: string
  startDate: string
  days: string
  timing: string
  duration: string
  location: string
  seatsLeft?: number | null
  totalSeats?: number | null
  status: BatchStatus
}

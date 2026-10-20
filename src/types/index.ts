export const ENQUIRY_STATUSES = ["New", "Contacted", "Trial Class Scheduled", "Joined"] as const
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number]

export const BATCH_STATUSES = ["Upcoming", "Running", "Completed"] as const
export type BatchStatus = (typeof BATCH_STATUSES)[number]

export const FEE_STATUSES = ["Paid", "Pending"] as const
export type FeeStatus = (typeof FEE_STATUSES)[number]

export const STAFF_ROLES = ["owner", "staff"] as const
export type StaffRole = (typeof STAFF_ROLES)[number]

/** Standard JSON shape returned by API route handlers. */
export type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string }

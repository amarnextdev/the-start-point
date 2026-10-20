import type { EnquiryInput } from "./schema"

export type EnquiryField = keyof EnquiryInput

export type EnquiryFormState =
  | { status: "idle" }
  | {
      status: "error"
      message?: string
      fieldErrors: Partial<Record<EnquiryField, string>>
      values: Partial<EnquiryInput>
    }
  | { status: "success"; name: string; phone: string; batchLabel: string }

export const initialEnquiryState: EnquiryFormState = { status: "idle" }

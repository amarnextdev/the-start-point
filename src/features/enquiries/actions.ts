"use server"

import { z } from "zod"

import { getPublicBatches } from "@/features/batches/data/placeholder-batches"

import { enquirySchema, UNSURE_BATCH } from "./schema"
import type { EnquiryFormState } from "./types"

function field(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value : ""
}

export async function submitEnquiry(
  _prev: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const values = {
    name: field(formData, "name"),
    phone: field(formData, "phone"),
    batch: field(formData, "batch"),
  }

  // Honeypot: real visitors never see or fill this field.
  if (field(formData, "company")) {
    return { status: "success", name: values.name, phone: values.phone, batchLabel: "" }
  }

  const parsed = enquirySchema.safeParse(values)
  if (!parsed.success) {
    const errors = z.flattenError(parsed.error).fieldErrors
    return {
      status: "error",
      fieldErrors: {
        name: errors.name?.[0],
        phone: errors.phone?.[0],
        batch: errors.batch?.[0],
      },
      values,
    }
  }

  const batches = await getPublicBatches()
  const batchLabel =
    parsed.data.batch === UNSURE_BATCH
      ? "Not sure yet"
      : (batches.find((b) => b.id === parsed.data.batch)?.name ?? parsed.data.batch)

  // Phase 3: save the enquiry to MongoDB, rate-limit by IP and send the email alert.

  return { status: "success", name: parsed.data.name, phone: parsed.data.phone, batchLabel }
}

import { z } from "zod"

export const UNSURE_BATCH = "unsure"

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  phone: z
    .string()
    .trim()
    .refine((value) => {
      const digits = value.replace(/\D/g, "").length
      return digits >= 7 && digits <= 15
    }, "Please enter a valid phone number."),
  batch: z.string().trim().min(1, "Please choose a batch, or pick “Not sure”."),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

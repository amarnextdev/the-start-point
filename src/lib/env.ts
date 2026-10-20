import "server-only"

import { z } from "zod"

/**
 * Server environment variables, validated once on first use.
 * Values that later phases need are optional for now so the app runs during setup.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  MONGODB_URI: z.string().min(1).optional(),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters").optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  ENQUIRY_NOTIFY_EMAIL: z.email().optional(),
})

let cached: z.infer<typeof serverEnvSchema> | undefined

export function getServerEnv() {
  if (cached) return cached
  const parsed = serverEnvSchema.safeParse(process.env)
  if (!parsed.success) {
    console.error("Invalid environment variables:", z.flattenError(parsed.error).fieldErrors)
    throw new Error("Invalid environment variables — check .env.local")
  }
  cached = parsed.data
  return cached
}

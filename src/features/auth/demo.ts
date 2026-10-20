import type { StaffRole } from "@/types"

/**
 * Temporary demo sign-in, used until phase 4 adds real accounts and sessions.
 * It only works in development, or when ENABLE_DEMO_LOGIN=true is set on purpose.
 */
export const DEMO_ACCOUNT = {
  email: "demo@confidentenglish.in",
  password: "demo1234",
  name: "Neha Kapoor",
  role: "owner" as StaffRole,
}

export const DEMO_SESSION_COOKIE = "ce_demo_session"

export function isDemoLoginEnabled() {
  return process.env.NODE_ENV !== "production" || process.env.ENABLE_DEMO_LOGIN === "true"
}

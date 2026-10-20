"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { DEMO_ACCOUNT, DEMO_SESSION_COOKIE, isDemoLoginEnabled } from "./demo"

export type SignInState = { error?: string }

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  if (!isDemoLoginEnabled()) {
    return { error: "Sign-in isn't connected yet. It goes live once the dashboard is set up." }
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")
  if (email !== DEMO_ACCOUNT.email || password !== DEMO_ACCOUNT.password) {
    return { error: "That email and password don't match. Check them and try again." }
  }

  const store = await cookies()
  store.set(DEMO_SESSION_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  })
  redirect("/admin")
}

export async function signOut() {
  const store = await cookies()
  store.delete(DEMO_SESSION_COOKIE)
  redirect("/admin/login")
}

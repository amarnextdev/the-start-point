"use client"

import { useState } from "react"
import { ArrowRight, Eye, EyeOff, Info, KeyRound, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/** Sign-in form UI. Phase 4 connects it to the session (server action + rate limit). */
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  // Until phase 4 wires up auth, submitting explains that sign-in isn't live yet.
  const [notice, setNotice] = useState(false)

  return (
    <form
      className="flex w-full flex-col gap-5 rounded-[28px] border bg-card p-6 shadow-[0_30px_60px_-40px_rgb(19_32_63/0.45)] sm:p-9"
      onSubmit={(e) => {
        e.preventDefault()
        setNotice(true)
      }}
    >
      <div className="flex flex-col">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-bold">
          <Lock className="size-3.5 text-clay" aria-hidden /> Staff only
        </span>
        <h1 className="mt-5 text-[2.5rem] leading-none font-extrabold tracking-tight">Welcome back</h1>
        <p className="mt-3 text-muted-foreground">Sign in with your staff account to open the dashboard.</p>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="you@example.com"
            className="pl-11"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <KeyRound className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Your password"
            className="pr-12 pl-11"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" size="xl" variant="secondary" className="mt-2 w-full">
        Sign in <ArrowRight />
      </Button>

      {notice && (
        <p role="status" className="flex items-start gap-2.5 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden />
          Sign-in isn&apos;t connected yet. It goes live once the dashboard is set up.
        </p>
      )}

      <p className="border-t pt-5 text-center text-sm text-muted-foreground">
        Forgot your password? Contact the site administrator.
      </p>
    </form>
  )
}

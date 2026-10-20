"use client"

import { useState } from "react"
import { ArrowRight, Eye, EyeOff, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/** Sign-in form UI. Phase 4 connects it to the session (server action + rate limit). */
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className="flex w-full max-w-md flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-bold">
          <Lock className="size-3.5" aria-hidden /> Staff only
        </span>
        <h1 className="mt-2 text-4xl font-extrabold">Sign in</h1>
        <p className="text-muted-foreground">Use your staff account to open the dashboard.</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="username" placeholder="you@example.com" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" size="xl" variant="secondary" className="mt-2 w-full rounded-2xl" disabled>
        Sign in <ArrowRight />
      </Button>
      <p className="text-center text-xs text-muted-foreground">Sign-in is connected in phase 4.</p>
    </form>
  )
}

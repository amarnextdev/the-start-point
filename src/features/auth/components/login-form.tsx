"use client"

import { useActionState, useState } from "react"
import { ArrowRight, Eye, EyeOff, Info, KeyRound, Loader2, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signIn, type SignInState } from "../actions"

/** Sign-in form. Uses the demo account until phase 4 adds real sessions (server action + rate limit). */
export function LoginForm({ demo }: { demo?: { email: string; password: string } }) {
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction, pending] = useActionState<SignInState, FormData>(signIn, {})
  // Demo credentials are pre-filled for now so sign-in is one click.
  const [email, setEmail] = useState(demo?.email ?? "")
  const [password, setPassword] = useState(demo?.password ?? "")

  return (
    <form
      className="flex w-full flex-col gap-5"
      action={formAction}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      {state.error && (
        <p role="alert" className="flex items-start gap-2.5 rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {state.error}
        </p>
      )}

      <Button type="submit" size="xl" variant="secondary" className="mt-2 w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Signing in…
          </>
        ) : (
          <>
            Sign in <ArrowRight />
          </>
        )}
      </Button>

      {demo && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed bg-background px-4 py-3 text-sm">
          <span className="leading-snug">
            <strong className="block">Demo account</strong>
            <span className="text-muted-foreground">
              {demo.email} · {demo.password}
            </span>
          </span>
        </div>
      )}

      <p className="border-t pt-5 text-center text-sm text-muted-foreground">
        Forgot your password? Contact the site administrator.
      </p>
    </form>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Logo } from "@/components/layout/logo"
import { FloatingShape } from "@/components/motion/floating-shape"
import { LoginForm } from "@/features/auth/components/login-form"

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh flex-wrap">
      <aside className="relative flex min-h-80 flex-[1_1_420px] flex-col justify-between gap-12 overflow-hidden bg-navy p-8 text-white sm:p-12 lg:p-16">
        <FloatingShape className="top-[12%] right-[10%] size-36 rounded-[34px] bg-saffron" />
        <FloatingShape slow className="-bottom-20 -left-16 size-72 rounded-full bg-coral opacity-85" />
        <Logo inverted className="relative" />
        <div className="relative flex max-w-md flex-col gap-3">
          <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.02] font-extrabold">
            Your classes, all in one place.
          </h2>
          <p className="text-lg text-white/80">
            Follow up on enquiries, manage batches and keep student fee records up to date.
          </p>
        </div>
      </aside>
      <main className="grid flex-[1_1_480px] place-items-center px-4 py-12 sm:px-12">
        <div className="flex w-full max-w-md flex-col items-center gap-6">
          <LoginForm />
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
            Back to website
          </Link>
        </div>
      </main>
    </div>
  )
}

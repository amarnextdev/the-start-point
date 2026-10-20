import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <div className="flex max-w-md flex-col items-center gap-5 text-center">
        <span className="font-display text-7xl font-extrabold text-coral">404</span>
        <h1 className="text-3xl font-extrabold">This page doesn&apos;t exist.</h1>
        <p className="text-muted-foreground">
          The link may be broken or the page may have moved.
        </p>
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft /> Back to home
          </Link>
        </Button>
      </div>
    </main>
  )
}

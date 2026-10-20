"use client"

import { useActionState, useId, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "motion/react"
import { ArrowRight, Check, Loader2, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buildWhatsAppLink, enquiryWhatsAppMessage } from "@/lib/whatsapp"

import { submitEnquiry } from "../actions"
import { UNSURE_BATCH } from "../schema"
import { initialEnquiryState, type EnquiryField } from "../types"

export type BatchOption = { id: string; name: string }

type EnquiryFormProps = {
  batches: BatchOption[]
  className?: string
  title?: string
}

/** Public enquiry form. Wrap in <Suspense> — it reads ?batch= from the URL. */
export function EnquiryForm(props: EnquiryFormProps) {
  const [formKey, setFormKey] = useState(0)
  return <EnquiryFormInner key={formKey} {...props} onReset={() => setFormKey((k) => k + 1)} />
}

function EnquiryFormInner({
  batches,
  className,
  title = "Enquiry form",
  onReset,
}: EnquiryFormProps & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState)
  const searchParams = useSearchParams()
  const batchFromUrl = searchParams.get("batch") ?? ""
  const [batch, setBatch] = useState(batchFromUrl)
  const id = useId()

  // "Join this batch" links update ?batch= — keep the select in sync
  // (adjusting state during render, as recommended by React).
  const [syncedBatch, setSyncedBatch] = useState(batchFromUrl)
  if (batchFromUrl !== syncedBatch) {
    setSyncedBatch(batchFromUrl)
    if (batchFromUrl) setBatch(batchFromUrl)
  }

  if (state.status === "success") {
    const whatsapp = buildWhatsAppLink(
      siteConfig.contact.whatsapp,
      enquiryWhatsAppMessage(siteConfig.name, state.batchLabel || undefined)
    )
    return (
      <div role="status" className={cn("flex flex-col items-center gap-4 py-8 text-center", className)}>
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="grid size-20 place-items-center rounded-full bg-saffron text-navy"
        >
          <Check className="size-9" strokeWidth={2.6} />
        </motion.span>
        <h3 className="text-2xl font-extrabold">Thank you, {state.name}!</h3>
        <p className="max-w-sm text-muted-foreground">
          We&apos;ve received your enquiry{state.batchLabel ? <> for <strong className="text-foreground">{state.batchLabel}</strong></> : null}.
          We&apos;ll contact you on {state.phone} [RESPONSE TIME — e.g. within one working day].
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {whatsapp && (
            <Button asChild variant="secondary">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> Chat on WhatsApp
              </a>
            </Button>
          )}
          <Button variant="soft" onClick={onReset}>
            Send another enquiry
          </Button>
        </div>
      </div>
    )
  }

  const errors = state.status === "error" ? state.fieldErrors : {}
  const values = state.status === "error" ? state.values : {}
  const errorId = (f: EnquiryField) => `${id}-${f}-error`

  return (
    <form action={formAction} noValidate className={cn("flex flex-col gap-5", className)}>
      <h3 className="text-2xl font-bold">{title}</h3>

      {/* Honeypot — hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-name`}>Full name</Label>
        <Input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          defaultValue={values.name}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? errorId("name") : undefined}
        />
        <FieldError id={errorId("name")} message={errors.name} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-phone`}>Phone number</Label>
        <Input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Your phone number"
          defaultValue={values.phone}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? errorId("phone") : undefined}
        />
        <FieldError id={errorId("phone")} message={errors.phone} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-batch`}>Preferred batch</Label>
        <Select name="batch" value={batch || values.batch || ""} onValueChange={setBatch}>
          <SelectTrigger
            id={`${id}-batch`}
            aria-invalid={!!errors.batch}
            aria-describedby={errors.batch ? errorId("batch") : undefined}
          >
            <SelectValue placeholder="Choose a batch" />
          </SelectTrigger>
          <SelectContent>
            {batches.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
            <SelectSeparator />
            <SelectItem value={UNSURE_BATCH}>Not sure — help me choose</SelectItem>
          </SelectContent>
        </Select>
        <FieldError id={errorId("batch")} message={errors.batch} />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="mt-1 w-full">
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send enquiry <ArrowRight />
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        We only use your details to contact you about classes.
      </p>
    </form>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <motion.p
      id={id}
      role="alert"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm font-semibold text-destructive"
    >
      {message}
    </motion.p>
  )
}

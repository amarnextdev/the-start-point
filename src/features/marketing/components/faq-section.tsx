import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import type { FaqItem } from "../data/content"

export function FaqSection({
  items,
  title = "Questions, answered.",
  lead = "Can't find what you need?",
  className,
}: {
  items: FaqItem[]
  title?: string
  lead?: string
  className?: string
}) {
  const initials = siteConfig.teacherName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  return (
    <section id="faq" className={cn("py-16 sm:py-20 lg:py-24", className)}>
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal className="flex flex-col lg:sticky lg:top-12">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold">{title}</h2>
          <p className="mt-4 max-w-sm text-lg text-muted-foreground">
            The things people usually ask before joining. Tap a question to see the answer.
          </p>

          <div className="mt-9 max-w-sm rounded-3xl border bg-card p-6 shadow-[0_24px_44px_-34px_rgb(19_32_63/0.45)]">
            <div className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-extrabold text-white">
                {initials}
              </span>
              <span className="leading-tight">
                <strong className="block text-[15px]">{lead}</strong>
                <span className="text-sm text-muted-foreground">{siteConfig.teacherName} will answer personally.</span>
              </span>
            </div>
            <Link
              href="/contact"
              className="group mt-5 flex items-center justify-between rounded-2xl bg-background px-4 py-3 text-sm font-bold transition-colors hover:bg-muted"
            >
              Call or WhatsApp us
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible defaultValue="faq-0" className="flex flex-col gap-3">
            {items.map((item, i) => (
              <AccordionItem key={item.question} value={`faq-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-sm font-bold text-clay tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-14 sm:pr-16">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}

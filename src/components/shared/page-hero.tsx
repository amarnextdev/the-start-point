import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { FloatingShape } from "@/components/motion/floating-shape"

import { Container } from "./container"
import { Eyebrow } from "./eyebrow"
import { InfoChip } from "./info-chip"

type PageHeroProps = {
  breadcrumb: string
  eyebrow: string
  title: React.ReactNode
  description: React.ReactNode
  actions?: React.ReactNode
  chips?: { icon: LucideIcon; label: string }[]
}

/** Centered hero used on inner pages (Courses, About, Contact). */
export function PageHero({ breadcrumb, eyebrow, title, description, actions, chips }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-[138px] pb-16 sm:pt-[154px] sm:pb-20 lg:pt-[170px] lg:pb-24">
      <div aria-hidden className="bg-dots absolute inset-0" />
      <FloatingShape className="top-20 right-[9%] size-14 rounded-2xl bg-saffron" />
      <FloatingShape
        slow
        className="bottom-14 left-[7%] size-22 rounded-full border-[6px] border-navy opacity-[0.07]"
      />
      <FloatingShape slow className="top-1/2 left-[14%] size-3.5 rounded-full bg-coral" />

      <Container className="relative flex flex-col items-center gap-5 text-center">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page" className="text-foreground">
              {breadcrumb}
            </span>
          </nav>
        </Reveal>
        <Reveal delay={0.05}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="max-w-4xl text-[clamp(2.6rem,6.4vw,5.25rem)] leading-[0.98] font-extrabold">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
            {description}
          </p>
        </Reveal>
        {actions && (
          <Reveal delay={0.2} className="flex flex-wrap justify-center gap-3">
            {actions}
          </Reveal>
        )}
        {chips && chips.length > 0 && (
          <Reveal delay={0.25} className="flex flex-wrap justify-center gap-2.5 pt-2">
            {chips.map((chip) => (
              <InfoChip key={chip.label} icon={chip.icon}>
                {chip.label}
              </InfoChip>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  )
}

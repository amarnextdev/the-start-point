import Link from "next/link"
import { ChevronRight, type LucideIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { FloatingShape } from "@/components/motion/floating-shape"

import { Container } from "./container"
import { Eyebrow } from "./eyebrow"

type PageHeroProps = {
  /** Only for nested pages (e.g. Courses › IELTS); top-level pages leave it out. */
  breadcrumb?: { label: string; href?: string }[]
  eyebrow: string
  title: React.ReactNode
  description: React.ReactNode
  actions?: React.ReactNode
  /** Quick facts under the actions, shown as label + value. */
  facts?: { icon: LucideIcon; label: string; value: string }[]
}

/** Coral brush underline for one highlighted word in a page title. */
export function TitleHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 400 30"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-2 h-4 w-full text-coral"
      >
        <path d="M4 22 C 90 6, 220 4, 396 16" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      </svg>
    </span>
  )
}

/** Centered hero used on inner pages (Courses, About, Contact). */
export function PageHero({ breadcrumb, eyebrow, title, description, actions, facts }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-[138px] pb-16 sm:pt-[154px] sm:pb-20 lg:pt-[170px] lg:pb-24">
      <div aria-hidden className="bg-dots absolute inset-0" />
      <div
        aria-hidden
        className="absolute top-[78%] left-1/2 size-[1400px] -translate-x-1/2 rounded-full border border-navy/[0.07]"
      />
      <FloatingShape className="top-[42%] right-[8%] hidden size-12 rounded-[14px] bg-saffron lg:block" />
      <FloatingShape
        slow
        className="bottom-16 left-[7%] hidden size-20 rounded-full border-[6px] border-navy opacity-[0.07] lg:block"
      />
      <FloatingShape slow className="top-[38%] left-[13%] size-3 rounded-full bg-coral" />

      <Container className="relative flex flex-col items-center text-center">
        {breadcrumb && (
          <Reveal className="mb-6">
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-1.5 text-sm font-semibold text-muted-foreground shadow-[0_10px_24px_-18px_rgb(19_32_63/0.5)]"
            >
              {breadcrumb.map((crumb, i) => {
                const last = i === breadcrumb.length - 1
                return (
                  <span key={crumb.label} className="inline-flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="size-3.5 opacity-50" aria-hidden />}
                    {last || !crumb.href ? (
                      <span aria-current={last ? "page" : undefined} className={last ? "text-foreground" : undefined}>
                        {crumb.label}
                      </span>
                    ) : (
                      <Link href={crumb.href} className="transition-colors hover:text-foreground">
                        {crumb.label}
                      </Link>
                    )}
                  </span>
                )
              })}
            </nav>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <h1 className="max-w-4xl text-[clamp(2.6rem,6.4vw,5.25rem)] leading-[1] font-extrabold tracking-[-0.03em] text-balance">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={0.15} className="mt-7">
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
            {description}
          </p>
        </Reveal>

        {actions && (
          <Reveal delay={0.2} className="mt-9 flex flex-wrap justify-center gap-3">
            {actions}
          </Reveal>
        )}

        {facts && facts.length > 0 && (
          <Reveal delay={0.25} className="mt-12 w-full max-w-4xl">
            <dl
              className="grid grid-cols-2 gap-y-6 border-t border-navy/10 pt-8 sm:divide-x sm:divide-navy/10 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
              style={{ "--cols": facts.length } as React.CSSProperties}
            >
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 px-4">
                  <dt className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    <Icon className="size-3.5 text-clay" aria-hidden />
                    {label}
                  </dt>
                  <dd className="text-base font-bold text-balance">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </Container>
    </section>
  )
}

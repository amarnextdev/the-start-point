import { Container } from "@/components/shared/container"
import { IconTile } from "@/components/shared/icon-tile"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

import { benefits, type FeatureItem } from "../data/content"

const accentBar: Record<FeatureItem["tone"], string> = {
  coral: "bg-coral",
  saffron: "bg-saffron",
  navy: "bg-navy",
  white: "bg-navy/25",
  cream: "bg-navy/25",
}

function BenefitCard({ item, index }: { item: FeatureItem; index: number }) {
  const Icon = item.icon

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-transparent bg-background p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-border hover:bg-card hover:shadow-[0_30px_50px_-30px_rgb(19_32_63/0.4)]">
      {/* Oversized watermark of the same icon, for depth */}
      <Icon
        aria-hidden
        strokeWidth={1.25}
        className="pointer-events-none absolute -right-6 -bottom-6 size-36 text-navy opacity-[0.04] transition-transform duration-500 group-hover:-rotate-12"
      />

      <div className="flex items-start justify-between">
        <IconTile
          icon={Icon}
          tone={item.tone}
          size="lg"
          className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
        />
        <span className="font-display text-sm font-bold text-muted-foreground/50 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-8 text-xl leading-snug font-bold text-balance sm:text-[22px] lg:min-h-[2lh]">{item.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>

      <div className="mt-auto pt-7" aria-hidden>
        <span
          className={cn(
            "block h-1 w-10 rounded-full transition-[width] duration-500 group-hover:w-20",
            accentBar[item.tone]
          )}
        />
      </div>
    </article>
  )
}

export function BenefitsSection() {
  return (
    <section className="bg-card pb-20 sm:pb-24 lg:pb-28">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Why a classroom"
            title="Real practice beats scrolling through lessons."
            aside="Apps are great for vocabulary. Confidence comes from speaking out loud, to real people, every week."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} className="h-full">
              <BenefitCard item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

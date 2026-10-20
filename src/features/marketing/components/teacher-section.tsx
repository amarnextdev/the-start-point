import { BadgeCheck } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/config/site"

export function RotatingBadge({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={className}>
      <circle cx="100" cy="100" r="98" className="fill-saffron" />
      <path id="teacher-badge-circle" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" fill="none" />
      <text className="fill-navy font-sans text-[19px] font-bold tracking-[4px]">
        <textPath href="#teacher-badge-circle">LEARN · SPEAK · GROW · LEARN · SPEAK · GROW ·</textPath>
      </text>
    </svg>
  )
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

/** Stands in for the teacher's photo: a designed monogram portrait instead of a striped box. */
export function PortraitFrame({ name }: { name: string }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-t-[200px] rounded-b-[32px] bg-navy">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-25 invert" />
      <div
        aria-hidden
        className="absolute -bottom-1/4 left-1/2 size-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_106_61/0.55),transparent_62%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 grid place-items-center font-display text-[clamp(6rem,14vw,9.5rem)] font-extrabold tracking-[-0.04em] text-white/90"
      >
        {initials(name)}
      </span>
    </div>
  )
}

export function TeacherSection() {
  const { teacherName, teacher } = siteConfig

  return (
    <section id="teacher" className="rounded-t-[36px] sm:rounded-t-[56px] bg-card py-20 sm:py-24 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-md">
          <PortraitFrame name={teacherName} />
          <RotatingBadge className="absolute -top-4 -right-5 size-28 animate-spin-slow sm:size-32" />

          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border bg-card py-3 pr-5 pl-3 shadow-[0_24px_40px_-24px_rgb(19_32_63/0.5)] sm:-left-8">
            <span className="grid size-10 place-items-center rounded-xl bg-saffron text-navy">
              <BadgeCheck className="size-5" aria-hidden />
            </span>
            <span className="flex flex-col leading-tight">
              <strong className="text-[15px]">{teacher.credential}</strong>
              <span className="text-xs text-muted-foreground">{teacher.credentialBody}</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col">
          <Eyebrow>Meet your teacher</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold">{teacherName}</h2>
          <p className="mt-2 text-base font-semibold text-clay">{teacher.role}</p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">{teacher.intro}</p>

          <figure className="mt-8 max-w-xl border-l-[3px] border-coral pl-6">
            <blockquote className="font-display text-[1.35rem] leading-snug font-semibold text-pretty">
              &ldquo;{teacher.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-muted-foreground">{teacherName}</figcaption>
          </figure>

          <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x border-t pt-6">
            {teacher.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse px-4 first:pl-0 last:pr-0 sm:px-6">
                <dt className="mt-2 text-[13px] font-medium text-muted-foreground">{stat.label}</dt>
                <dd className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-none font-extrabold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}

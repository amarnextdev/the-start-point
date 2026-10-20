import Link from "next/link"
import { ArrowRight, ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { IconTile } from "@/components/shared/icon-tile"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/config/site"
import { buildWhatsAppLink, enquiryWhatsAppMessage } from "@/lib/whatsapp"

/** Stylised street map: stands in for the Google Maps embed until a map URL is set. */
function MapIllustration() {
  return (
    <svg aria-hidden viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <rect width="600" height="520" className="fill-[#efe8db]" />
      {/* City blocks */}
      <g className="fill-[#e6ddcd]">
        <rect x="24" y="24" width="150" height="110" rx="14" />
        <rect x="214" y="24" width="120" height="110" rx="14" />
        <rect x="374" y="24" width="200" height="70" rx="14" />
        <rect x="24" y="174" width="110" height="130" rx="14" />
        <rect x="374" y="134" width="90" height="170" rx="14" />
        <rect x="504" y="134" width="80" height="120" rx="14" />
        <rect x="24" y="344" width="200" height="150" rx="14" />
        <rect x="264" y="344" width="130" height="80" rx="14" />
        <rect x="434" y="344" width="150" height="150" rx="14" />
      </g>
      {/* Park */}
      <rect x="174" y="174" width="160" height="130" rx="18" className="fill-[#cfe3c4]" />
      <circle cx="214" cy="214" r="14" className="fill-[#b9d6aa]" />
      <circle cx="290" cy="262" r="20" className="fill-[#b9d6aa]" />
      {/* River */}
      <path d="M-10 470 C 120 430, 200 500, 300 455 S 480 420, 610 450" fill="none" stroke="#c9dcf0" strokeWidth="26" />
      {/* Main roads */}
      <g fill="none" stroke="#fff" strokeLinecap="round">
        <path d="M0 154 H600" strokeWidth="20" />
        <path d="M354 0 V520" strokeWidth="20" />
        <path d="M194 0 V154 M154 154 V330 M0 324 H600" strokeWidth="11" />
        <path d="M484 154 V330 M244 324 V520" strokeWidth="11" />
      </g>
      <g className="fill-navy/40 font-sans text-[11px] font-bold tracking-[0.14em]">
        <text x="40" y="148">FC ROAD</text>
        <text x="362" y="250" transform="rotate(90 362 250)">JM ROAD</text>
      </g>
    </svg>
  )
}

function directionsHref(contact: { mapUrl: string; address: string }) {
  return contact.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`
}

/** Contact methods. "list" = full-width rows (home); "grid" = compact 2×2 tiles (Contact page). */
export function ContactRows({ variant = "list" }: { variant?: "list" | "grid" }) {
  const { contact, name } = siteConfig
  const whatsapp = buildWhatsAppLink(contact.whatsapp, enquiryWhatsAppMessage(name))
  const rows = [
    { icon: Phone, tone: "coral" as const, label: "Call us", value: contact.phone, href: telHref(contact.phone) },
    { icon: MessageCircle, tone: "navy" as const, label: "WhatsApp", value: contact.whatsapp, href: whatsapp ?? undefined, external: true },
    { icon: Mail, tone: "saffron" as const, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, tone: "cream" as const, label: "Office hours", value: contact.hours },
  ]

  if (variant === "grid") {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {rows.map(({ icon, tone, label, value, href, external }) => {
          const content = (
            <>
              <IconTile icon={icon} tone={tone} size="sm" />
              <span className="flex min-w-0 flex-col">
                <span className="text-xs font-semibold text-muted-foreground">{label}</span>
                <span className="text-sm leading-snug font-bold [overflow-wrap:anywhere]">{value}</span>
              </span>
            </>
          )
          const tile = "flex h-full items-center gap-3 rounded-2xl bg-card p-3"
          return (
            <li key={label}>
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`${tile} transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-20px_rgb(19_32_63/0.5)]`}
                >
                  {content}
                </a>
              ) : (
                <div className={tile}>{content}</div>
              )}
            </li>
          )
        })}
        <li className="sm:col-span-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl bg-card p-3">
            <IconTile icon={MapPin} tone="navy" size="sm" />
            <address className="flex min-w-0 flex-1 flex-col not-italic">
              <span className="text-xs font-semibold text-muted-foreground">Class address</span>
              <span className="text-sm leading-snug font-bold">{contact.address}</span>
              <span className="mt-0.5 text-xs font-semibold text-clay">{contact.landmark}</span>
            </address>
            <a
              href={directionsHref(contact)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-xs font-bold whitespace-nowrap text-white transition-colors hover:bg-coral hover:text-navy"
            >
              Get directions <ArrowRight className="size-3.5" />
            </a>
          </div>
        </li>
      </ul>
    )
  }

  return (
    <ul className="flex flex-col">
      {rows.map(({ icon, tone, label, value, href, external }) => {
        const content = (
          <>
            <IconTile icon={icon} tone={tone} />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-sm font-semibold text-muted-foreground">{label}</span>
              <span className="truncate text-[17px] font-bold">{value}</span>
            </span>
            {href && (
              <span className="grid size-9 place-items-center rounded-full bg-muted transition-colors group-hover:bg-navy group-hover:text-white">
                <ChevronRight className="size-4" />
              </span>
            )}
          </>
        )
        return (
          <li key={label} className="border-b last:border-0">
            {href ? (
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-2xl px-1 py-4 transition-all hover:bg-muted/50 hover:px-3"
              >
                {content}
              </a>
            ) : (
              <div className="flex items-center gap-4 px-1 py-4">{content}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function MapCard({ className }: { className?: string }) {
  const { contact } = siteConfig
  // Keyless Google Maps embed for the class address; swap for a "Share → Embed" URL once the real pin exists.
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&z=16&output=embed`

  return (
    <div className={`flex min-h-[460px] flex-col overflow-hidden rounded-[32px] border bg-card ${className ?? ""}`}>
      <div className="relative min-h-[300px] flex-1">
        {/* Shown while the map loads, or if it is blocked */}
        <MapIllustration />
        <iframe
          title={`Map showing ${siteConfig.name}, ${contact.addressShort}`}
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0 [filter:saturate(0.85)_sepia(0.08)]"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t p-5 sm:px-6">
        <div className="flex min-w-0 flex-1 items-start gap-3.5">
          <IconTile icon={MapPin} tone="saffron" />
          <address className="flex min-w-0 flex-col not-italic">
            <strong className="font-display text-lg leading-snug">{contact.addressShort}</strong>
            <span className="text-sm text-muted-foreground">{contact.address}</span>
            <span className="mt-1 text-xs font-semibold text-clay">{contact.landmark}</span>
          </address>
        </div>
        <Button asChild variant="secondary">
          <a href={directionsHref(contact)} target="_blank" rel="noopener noreferrer">
            Get directions <ArrowRight />
          </a>
        </Button>
      </div>
    </div>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden rounded-t-[36px] sm:rounded-t-[56px] bg-saffron py-20 text-navy sm:py-24 lg:py-28">
      <div aria-hidden className="absolute -top-40 -right-40 size-[520px] rounded-full border-2 border-navy/[0.08]" />
      <div aria-hidden className="absolute -top-16 -right-16 size-80 rounded-full border-2 border-dashed border-navy/10" />
      <Container className="relative flex flex-col gap-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-2xl flex-col gap-3.5">
            <span className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.14em] text-[#5c3d00] uppercase before:h-0.5 before:w-5 before:rounded-full before:bg-current sm:text-sm">
              Contact
            </span>
            <h2 className="text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] font-extrabold">
              Visit, call or message us.
            </h2>
            <p className="text-lg text-[#3b2e0b]">
              Have a question about batches or fees? We&apos;re happy to help you choose.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary" size="lg">
              <a href={telHref(siteConfig.contact.phone)}>
                <Phone /> Call now
              </a>
            </Button>
            <Button asChild variant="soft" size="lg" className="border-transparent">
              <Link href="#enquire">
                Send an enquiry <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-[32px] bg-card p-5 shadow-[0_30px_60px_-40px_rgb(92_61_0/0.55)] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
              <h3 className="text-[22px] font-bold">Get in touch</h3>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e3f4ec] px-3 py-1.5 text-xs font-bold text-[#0f5c4f]">
                <span className="size-2 rounded-full bg-[#1f9d6d]" aria-hidden />
                {siteConfig.contact.responseTime}
              </span>
            </div>
            <ContactRows />
          </Reveal>
          <Reveal delay={0.1}>
            <MapCard className="h-full shadow-[0_30px_60px_-40px_rgb(92_61_0/0.55)]" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

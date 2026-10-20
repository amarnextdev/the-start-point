import Link from "next/link"
import { ArrowRight, ArrowUp, Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { siteNav } from "@/config/nav"
import { siteConfig } from "@/config/site"
import { placeholderBatches } from "@/features/batches/data/placeholder-batches"

import { FooterCta } from "./footer-cta"
import { Logo } from "./logo"

const { contact } = siteConfig
const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`

const contactItems = [
  { icon: Phone, label: contact.phone, href: telHref },
  { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
  { icon: MapPin, label: contact.address },
  { icon: Clock, label: contact.hours },
]

const socialIcons = { Instagram, YouTube: Youtube, Facebook } as const

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-sans text-xs font-bold tracking-[0.14em] text-white/45 uppercase">{children}</h3>
}

export function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-[#c9d0de]">
      <Container className="relative flex flex-col gap-12 pt-16 sm:gap-16 sm:pt-20">
        {showCta && (
          <FooterCta>
            <div className="relative flex flex-wrap items-center justify-between gap-7 overflow-hidden rounded-3xl border border-white/10 bg-[#16244a] p-7 sm:p-10 lg:p-12">
              <div aria-hidden className="absolute -top-16 -right-12 size-52 rounded-full bg-coral/15" />
              <div className="relative flex max-w-xl flex-col gap-2">
                <span className="text-xs font-bold tracking-[0.14em] text-saffron uppercase">Start this month</span>
                <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.05] font-extrabold text-white">
                  Your first class is one message away.
                </h2>
              </div>
              <div className="relative flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact#enquire">
                    Enquire now <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/35 bg-transparent text-white hover:bg-white hover:text-navy"
                >
                  <a href={telHref}>
                    <Phone /> {contact.phone}
                  </a>
                </Button>
              </div>
            </div>
          </FooterCta>
        )}

        <div className="grid gap-x-10 gap-y-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1.3fr]">
          <div className="flex max-w-sm flex-col gap-6 text-white">
            <Logo inverted />
            <p className="leading-relaxed text-[#c9d0de]">{siteConfig.shortDescription}</p>
            <ul className="flex gap-2.5" aria-label="Social media">
              {siteConfig.social.map(({ label, href }) => {
                const Icon = socialIcons[label as keyof typeof socialIcons]
                return (
                  <li key={label}>
                    <a
                      href={href || "#"}
                      aria-label={label}
                      {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition-all hover:-translate-y-0.5 hover:border-coral hover:bg-coral hover:text-navy"
                    >
                      {Icon && <Icon className="size-4" aria-hidden />}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-5">
            <FooterHeading>Explore</FooterHeading>
            <ul className="flex flex-col gap-3">
              {siteNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact#enquire" className="transition-colors hover:text-white">
                  Enquire
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-5">
            <FooterHeading>Batch timings</FooterHeading>
            <ul className="flex flex-col gap-4">
              {placeholderBatches.map((batch) => (
                <li key={batch.id} className="flex flex-col leading-snug">
                  <span className="font-semibold text-white">{batch.name}</span>
                  <span className="text-sm">
                    {batch.days} · {batch.timing}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <FooterHeading>Visit or call</FooterHeading>
            <ul className="flex flex-col gap-3.5">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-1 size-4 shrink-0 text-saffron" aria-hidden />
                  {href ? (
                    <a href={href} className="transition-colors hover:text-white">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10 bg-navy-deep">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-5 text-sm">
          <span className="text-white/55">
            © {year} {siteConfig.name}. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/admin/login" className="text-white/40 transition-colors hover:text-white">
              Staff login
            </Link>
            <a
              href="#"
              aria-label="Back to top"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-coral hover:text-navy"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </Container>
      </div>
    </footer>
  )
}

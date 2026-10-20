import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/shared/page-hero"
import { siteConfig } from "@/config/site"
import { getPublicBatches } from "@/features/batches/data/placeholder-batches"
import {
  ContactEnquirySection,
  MapSection,
} from "@/features/marketing/components/contact-page-sections"
import { FaqSection } from "@/features/marketing/components/faq-section"
import { contactFaqs } from "@/features/marketing/data/content"
import { buildWhatsAppLink, enquiryWhatsAppMessage } from "@/lib/whatsapp"

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, message or send an enquiry to ${siteConfig.name}.`,
}

export default async function ContactPage() {
  const { contact, name } = siteConfig
  const whatsapp = buildWhatsAppLink(contact.whatsapp, enquiryWhatsAppMessage(name))
  const batches = await getPublicBatches()

  return (
    <>
    <PageHero
      breadcrumb="Contact"
      eyebrow="Contact"
      title="Let's get you started."
      description="Call, message or send an enquiry — we'll help you pick the right batch."
      actions={
        <>
          <Button asChild size="lg">
            <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
              <Phone /> Call now
            </a>
          </Button>
          {whatsapp && (
            <Button asChild size="lg" variant="secondary">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          )}
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${contact.email}`}>
              <Mail /> Email
            </a>
          </Button>
        </>
      }
      chips={[
        { icon: Clock, label: contact.hours },
        { icon: MapPin, label: contact.address },
      ]}
    />
    <ContactEnquirySection batches={batches.map(({ id, name }) => ({ id, name }))} />
    <MapSection />
    <FaqSection items={contactFaqs} title="Before you visit." lead="Still have a question?" className="bg-card" />
    </>
  )
}

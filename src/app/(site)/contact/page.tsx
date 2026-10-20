import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero, TitleHighlight } from "@/components/shared/page-hero"
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
      eyebrow="Contact"
      title={
        <>
          Let&apos;s get you <TitleHighlight>started.</TitleHighlight>
        </>
      }
      description="Call, message or send an enquiry. We'll answer your questions and help you pick the right batch."
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
      facts={[
        { icon: Clock, label: "Open", value: contact.hours },
        { icon: MapPin, label: "Find us", value: `${contact.addressShort}, Shivajinagar` },
        { icon: MessageCircle, label: "Replies", value: contact.responseTime.replace(/^Usually replies /, "Usually ") },
      ]}
    />
    <ContactEnquirySection batches={batches.map(({ id, name }) => ({ id, name }))} />
    <MapSection />
    <FaqSection items={contactFaqs} title="Before you visit." lead="Still have a question?" className="bg-card" />
    </>
  )
}

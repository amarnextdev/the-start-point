import { Container } from "@/components/shared/container"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { BatchCard } from "@/features/batches/components/batch-card"
import type { Batch } from "@/features/batches/types"

export function BatchesSection({
  batches,
  enquireHref = "/",
}: {
  batches: Batch[]
  /** Page that holds the enquiry form; the batch is pre-selected via ?batch=. */
  enquireHref?: string
}) {
  return (
    <Section id="batches" className="scroll-mt-20 pt-6 sm:pt-8 lg:pt-10">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Upcoming batches"
            title="Pick the batch that fits your routine."
            aside="No time that works for you? Tell us in the enquiry form and we'll let you know when a new batch opens."
          />
        </Reveal>
        <div className="grid gap-x-5 gap-y-8 pt-3 md:grid-cols-2 lg:grid-cols-3">
          {batches.map((batch, i) => (
            <Reveal key={batch.id} delay={i * 0.08} className="h-full">
              <BatchCard batch={batch} ctaHref={`${enquireHref}?batch=${batch.id}#enquire`} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

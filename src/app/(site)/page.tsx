import { getPublicBatches } from "@/features/batches/data/placeholder-batches"
import { BatchesSection } from "@/features/marketing/components/batches-section"
import { BenefitsSection } from "@/features/marketing/components/benefits-section"
import { ContactSection } from "@/features/marketing/components/contact-section"
import { CourseOverview } from "@/features/marketing/components/course-overview"
import { EnquirySection } from "@/features/marketing/components/enquiry-section"
import { FaqSection } from "@/features/marketing/components/faq-section"
import { HomeHero } from "@/features/marketing/components/home-hero"
import { MarqueeBand } from "@/features/marketing/components/marquee-band"
import { TeacherSection } from "@/features/marketing/components/teacher-section"
import { homeFaqs } from "@/features/marketing/data/content"

export default async function HomePage() {
  const batches = await getPublicBatches()
  const batchOptions = batches.map(({ id, name }) => ({ id, name }))

  return (
    <>
      <HomeHero nextBatchDate={batches[0]?.startDate} />
      <MarqueeBand />
      <CourseOverview />
      <BatchesSection batches={batches} enquireHref="/" />
      <TeacherSection />
      <BenefitsSection />
      <EnquirySection batches={batchOptions} />
      <FaqSection items={homeFaqs} />
      <ContactSection />
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarDays, Clock, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/shared/page-hero"
import { siteConfig } from "@/config/site"
import { getPublicBatches } from "@/features/batches/data/placeholder-batches"
import {
  AudienceSection,
  CourseBatchesSection,
  FeesSection,
  ModulesTimeline,
} from "@/features/marketing/components/course-sections"
import { FaqSection } from "@/features/marketing/components/faq-section"
import { courseFaqs } from "@/features/marketing/data/content"

export const metadata: Metadata = {
  title: "Courses & batches",
  description: `Course details and upcoming batches at ${siteConfig.name}.`,
}

export default async function CoursesPage() {
  const { course } = siteConfig
  const batches = await getPublicBatches()
  return (
    <>
    <PageHero
      breadcrumb="Courses"
      eyebrow="Courses"
      title="Courses & batches"
      description="[INTRO — how the course is structured and who each batch suits.]"
      actions={
        <>
          <Button asChild size="lg">
            <Link href="#batches">
              See batches <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Ask a question</Link>
          </Button>
        </>
      }
      chips={[
        { icon: CalendarDays, label: "Next batch: [START DATE]" },
        { icon: Clock, label: course.duration },
        { icon: Users, label: `${course.classSize} per batch` },
        { icon: MapPin, label: course.location },
      ]}
    />
    <AudienceSection />
    <ModulesTimeline />
    <CourseBatchesSection batches={batches} />
    <FeesSection />
    <FaqSection items={courseFaqs} title="Course questions." lead="Something else on your mind?" />
    </>
  )
}

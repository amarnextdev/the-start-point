import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarDays, Clock, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero, TitleHighlight } from "@/components/shared/page-hero"
import { siteConfig } from "@/config/site"
import { getPublicBatches } from "@/features/batches/data/placeholder-batches"
import {
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
      eyebrow="Courses"
      title={
        <>
          Courses &amp; <TitleHighlight>batches</TitleHighlight>
        </>
      }
      description="One 12-week spoken English course, three batch timings. Pick the one that fits your day: early mornings, after work, or weekends."
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
      facts={[
        { icon: CalendarDays, label: "Next batch", value: batches[0]?.startDate ?? "Opening soon" },
        { icon: Clock, label: "Duration", value: course.duration },
        { icon: Users, label: "Batch size", value: `Max ${course.classSize} students` },
        { icon: MapPin, label: "Format", value: course.location },
      ]}
    />
    <ModulesTimeline />
    <CourseBatchesSection batches={batches} />
    <FeesSection />
    <FaqSection
      items={courseFaqs}
      title="Course questions."
      lead="Something else on your mind?"
      className="pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-32"
    />
    </>
  )
}

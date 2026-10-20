import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, GraduationCap, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero, TitleHighlight } from "@/components/shared/page-hero"
import { siteConfig } from "@/config/site"
import {
  ClassStepsSection,
  GallerySection,
  MissionSection,
  TeacherProfile,
  ValuesSection,
} from "@/features/marketing/components/about-sections"

export const metadata: Metadata = {
  title: "About",
  description: `Meet the teacher behind ${siteConfig.name}.`,
}

export default function AboutPage() {
  return (
    <>
    <PageHero
      eyebrow="Our story"
      title={
        <>
          About <TitleHighlight>{siteConfig.name}</TitleHighlight>
        </>
      }
      description="We started with one simple belief: you learn to speak English by speaking it. Small batches, a patient trainer, and a classroom where mistakes are welcome."
      actions={
        <>
          <Button asChild size="lg">
            <Link href="#teacher">
              Meet the teacher <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Visit a class</Link>
          </Button>
        </>
      }
      facts={[
        { icon: GraduationCap, label: "Teaching", value: `${siteConfig.teacher.stats[0].value} years` },
        { icon: Users, label: "Students trained", value: siteConfig.teacher.stats[1].value },
        { icon: MapPin, label: "Classroom", value: siteConfig.city },
      ]}
    />
    <MissionSection />
    <TeacherProfile />
    <ClassStepsSection />
    <ValuesSection />
    <GallerySection />
    </>
  )
}

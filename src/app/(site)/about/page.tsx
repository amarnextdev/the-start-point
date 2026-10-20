import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, GraduationCap, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/shared/page-hero"
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
      breadcrumb="About"
      eyebrow="Our story"
      title={`About ${siteConfig.name}`}
      description="[ONE OR TWO SENTENCES — why the classes exist and who they help.]"
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
      chips={[
        { icon: GraduationCap, label: "[YEARS] years teaching" },
        { icon: Users, label: "[STUDENTS TAUGHT]" },
        { icon: MapPin, label: siteConfig.city },
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

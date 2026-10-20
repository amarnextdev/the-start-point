import { Container } from "@/components/shared/container"
import { CardGridSkeleton, PageHeroSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div role="status" aria-label="Loading page">
      <PageHeroSkeleton />
      <Container className="pb-24">
        <CardGridSkeleton />
      </Container>
    </div>
  )
}

import { Container } from "@/components/shared/container"
import { Skeleton } from "@/components/ui/skeleton"

export function PageHeroSkeleton() {
  return (
    <div className="py-20" aria-hidden>
      <Container className="flex flex-col items-center gap-5">
        <Skeleton className="h-7 w-36 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-16 w-full max-w-2xl" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <div className="flex gap-3">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-36 rounded-full" />
        </div>
      </Container>
    </div>
  )
}

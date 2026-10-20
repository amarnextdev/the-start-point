import { cn } from "@/lib/utils"

import { Eyebrow } from "./eyebrow"

type SectionHeadingProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  /** Optional content on the right (desktop) — e.g. a button or note. */
  aside?: React.ReactNode
  className?: string
  titleAs?: "h1" | "h2" | "h3"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  aside,
  className,
  titleAs: Title = "h2",
}: SectionHeadingProps) {
  const centered = align === "center"

  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-10 gap-y-5",
        centered && "flex-col items-center text-center",
        className
      )}
    >
      <div className={cn("flex max-w-2xl flex-col gap-3", centered && "items-center")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Title className="text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.04] font-extrabold">
          {title}
        </Title>
        {description && (
          <p className="text-base text-pretty text-muted-foreground sm:text-lg">{description}</p>
        )}
      </div>
      {aside && <div className="max-w-sm text-muted-foreground">{aside}</div>}
    </div>
  )
}

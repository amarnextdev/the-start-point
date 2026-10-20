import { marqueeWords } from "../data/content"

/** Each track repeats the words enough to outrun a wide screen. */
const REPEATS_PER_TRACK = 4

function MarqueeTrack() {
  const words = Array.from({ length: REPEATS_PER_TRACK }, () => marqueeWords).flat()
  return (
    // Trailing padding equals the gap, so two tracks side by side keep even spacing at the seam.
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {words.map((word, i) => (
        <span key={i} className="flex items-center gap-12">
          {word}
          <span className={i % 2 ? "text-saffron" : "text-coral"}>✦</span>
        </span>
      ))}
    </div>
  )
}

export function MarqueeBand() {
  return (
    <div aria-hidden className="relative z-10 -mx-5 rotate-[-1.2deg] overflow-hidden bg-navy py-4 text-cream">
      {/* Two identical tracks: sliding by exactly -50% lands the second where the first began. */}
      <div className="flex w-max animate-marquee font-display text-2xl font-bold whitespace-nowrap motion-reduce:animate-none">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  )
}

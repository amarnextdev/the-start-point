"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

type IntroVideoProps = {
  /** Cloudinary (or any MP4) URL. Empty = show the placeholder player. */
  src?: string
  poster?: string
  title: string
  length: string
  className?: string
}

export function IntroVideo({ src, poster, title, length, className }: IntroVideoProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-[clamp(20px,3vw,36px)] border-8 border-white bg-navy shadow-[0_60px_100px_-50px_rgb(19_32_63/0.6)]",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!playing ? (
          <motion.button
            key="poster"
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play intro video: ${title}`}
            className="group absolute inset-0 text-left text-white outline-none focus-visible:ring-4 focus-visible:ring-coral/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <span className="bg-placeholder-dark absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
            )}
            {!poster && (
              <span className="absolute top-5 left-5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wider">
                [INTRO VIDEO POSTER IMAGE]
              </span>
            )}
            <span className="absolute top-1/2 left-1/2 size-[clamp(72px,9vw,108px)] -translate-1/2">
              <span className="absolute inset-0 animate-ping rounded-full bg-coral/40 [animation-duration:2.2s]" />
              <span className="absolute inset-0 grid place-items-center rounded-full bg-coral text-navy shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 size-[38%] fill-current" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-navy-deep/90 to-transparent p-[clamp(16px,2.4vw,28px)]">
              <span className="flex flex-col gap-1">
                <span className="text-xs font-bold tracking-[0.12em] text-saffron uppercase">
                  Watch the intro
                </span>
                <span className="font-display text-[clamp(1.1rem,2.2vw,1.75rem)] font-bold">{title}</span>
              </span>
              <span className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold">{length}</span>
            </span>
          </motion.button>
        ) : src ? (
          <motion.video
            key="video"
            src={src}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 size-full bg-black object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          <motion.div
            key="placeholder"
            className="absolute inset-0 flex flex-col bg-navy-deep text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="font-display text-[clamp(1.25rem,2.6vw,2rem)] font-bold">
                Your intro video plays here
              </p>
              <p className="max-w-md text-sm text-white/70">
                Upload the video in Admin → Settings and it will play in this frame.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 px-5 py-3">
              <button
                type="button"
                onClick={() => setPlaying(false)}
                aria-label="Stop video"
                className="grid size-11 place-items-center rounded-full bg-white text-navy"
              >
                <Pause className="size-4 fill-current" />
              </button>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                <motion.span
                  className="block h-full rounded-full bg-coral"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 45, ease: "linear" }}
                />
              </span>
              <span className="text-sm font-semibold text-white/70">{length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

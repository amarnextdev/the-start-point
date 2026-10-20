"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react"

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  /** Distance in px the element rises from. */
  y?: number
}

/** Fades and lifts content into view once, when it scrolls on screen. */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

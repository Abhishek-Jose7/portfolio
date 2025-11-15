"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

interface SuggestedPromptsProps {
  prompts: string[]
  onSelect: (prompt: string) => void
}

export function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {prompts.map((prompt, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(prompt)}
            className="flex-shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors whitespace-nowrap glass"
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
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
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {prompts.map((prompt, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(prompt)}
            className="flex-shrink-0 rounded-full bg-gradient-to-br from-white/25 via-white/15 to-white/5 p-[1px] shadow-[0_4px_16px_0_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.6)] hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)] transition-all duration-300 whitespace-nowrap overflow-hidden relative"
          >
            {/* Animated glare effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] rounded-full" style={{ animationDelay: `${index * 0.2}s` }} />
            <div className="relative rounded-full bg-black/30 backdrop-blur-3xl px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-foreground hover:bg-black/20 transition-all duration-300">
              {prompt}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
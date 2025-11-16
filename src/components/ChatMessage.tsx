"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Sparkles, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  isTyping?: boolean
  onPersonaChange?: (persona: "professional" | "casual" | "technical") => void
}

export function ChatMessage({ role, content, isTyping = false, onPersonaChange }: ChatMessageProps) {
  const [displayedContent, setDisplayedContent] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (role === "assistant" && isTyping) {
      if (currentIndex < content.length) {
        // Faster typing on mobile for better UX
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const delay = isMobile ? 5 : 10;
        const timeout = setTimeout(() => {
          setDisplayedContent(content.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, delay)
        return () => clearTimeout(timeout)
      }
    } else {
      setDisplayedContent(content)
    }
  }, [content, currentIndex, role, isTyping])

  if (role === "user") {
    // User message - ChatGPT style blue bubble on the right
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end px-3 md:px-4 py-2 my-2"
      >
        <div className="bg-primary text-white px-3 md:px-4 py-2 rounded-2xl max-w-[85%] md:max-w-[70%]">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        </div>
      </motion.div>
    )
  }

  // Assistant message - ChatGPT style free-flowing text (no background box)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-2 md:gap-3 px-3 md:px-4 py-2 my-2"
    >
      <div className="flex-shrink-0">
        <div className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="text-sm md:text-base text-gray-100 leading-relaxed max-w-3xl">
          <p className="whitespace-pre-wrap break-words">
            {displayedContent}
            {isTyping && currentIndex < content.length && (
              <span className="typing-cursor"></span>
            )}
          </p>
        </div>
        {/* Persona Selector - Only show after typing is complete */}
        {!isTyping || currentIndex >= content.length ? (
          <div className="pt-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-xs text-muted-foreground hover:text-foreground"
                >
                  Change Persona
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => onPersonaChange?.("professional")}>
                  <div className="flex flex-col">
                    <span className="font-medium">💼 Professional</span>
                    <span className="text-xs text-muted-foreground">Formal and business-focused</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPersonaChange?.("casual")}>
                  <div className="flex flex-col">
                    <span className="font-medium">😊 Casual</span>
                    <span className="text-xs text-muted-foreground">Friendly and conversational</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPersonaChange?.("technical")}>
                  <div className="flex flex-col">
                    <span className="font-medium">🔧 Technical</span>
                    <span className="text-xs text-muted-foreground">Deep technical details</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}
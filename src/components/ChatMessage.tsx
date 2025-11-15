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
        const timeout = setTimeout(() => {
          setDisplayedContent(content.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, 10)
        return () => clearTimeout(timeout)
      }
    } else {
      setDisplayedContent(content)
    }
  }, [content, currentIndex, role, isTyping])

  if (role === "user") {
    // User message - on the right
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end gap-3 px-4 py-3"
      >
        <div className="flex flex-col items-end max-w-[70%]">
          <div className="rounded-3xl bg-primary px-5 py-3 text-primary-foreground">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  // Assistant message - on the left
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 px-4 py-3 bg-muted/30"
    >
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
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
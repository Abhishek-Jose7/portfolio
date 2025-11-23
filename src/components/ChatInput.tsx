"use client"

import { useState } from "react"
import { Send, User, Briefcase, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  centered?: boolean
  currentPersona?: "professional" | "casual" | "technical"
  onPersonaChange?: (persona: "professional" | "casual" | "technical") => void
}

export function ChatInput({
  onSend,
  disabled = false,
  centered = false,
  currentPersona = "casual",
  onPersonaChange
}: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const personaLabels = {
    professional: "💼",
    casual: "😊",
    technical: "🔧",
  }

  const personaDisplayText = {
    professional: "Professional Abhishek",
    casual: "Casual Abhishek",
    technical: "Technical Abhishek",
  }

  return (
    <div className={`w-full ${centered ? "max-w-3xl mx-auto" : ""}`}>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative rounded-[2rem] bg-gradient-to-br from-white/25 via-white/15 to-white/5 p-[1px] shadow-[0_4px_16px_0_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-all duration-300 hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)]">
          <div className="relative rounded-[2rem] bg-black/30 backdrop-blur-3xl w-full h-full">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${personaDisplayText[currentPersona]} anything...`}
              disabled={disabled}
              className="relative min-h-[60px] max-h-[200px] w-full resize-none rounded-[2rem] border-0 bg-transparent px-14 py-4 text-base focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50"
              rows={1}
            />

            {/* Persona Toggle Button */}
            {onPersonaChange && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-3 left-3 h-9 w-9 rounded-full hover:bg-white/10 text-xl transition-transform hover:scale-110"
                    title={`Current: ${currentPersona}`}
                  >
                    {personaLabels[currentPersona]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52 p-2 bg-black/90 backdrop-blur-xl border-white/10">
                  <DropdownMenuItem onClick={() => onPersonaChange("professional")} className="rounded-lg focus:bg-white/10">
                    <div className="flex items-center gap-3 py-1">
                      <span className="text-xl">💼</span>
                      <div className="flex flex-col">
                        <span className="font-medium">Professional</span>
                        <span className="text-xs text-muted-foreground">Formal & Business</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onPersonaChange("casual")} className="rounded-lg focus:bg-white/10">
                    <div className="flex items-center gap-3 py-1">
                      <span className="text-xl">😊</span>
                      <div className="flex flex-col">
                        <span className="font-medium">Casual</span>
                        <span className="text-xs text-muted-foreground">Friendly & Relaxed</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onPersonaChange("technical")} className="rounded-lg focus:bg-white/10">
                    <div className="flex items-center gap-3 py-1">
                      <span className="text-xl">🔧</span>
                      <div className="flex flex-col">
                        <span className="font-medium">Technical</span>
                        <span className="text-xs text-muted-foreground">Deep Dive & Code</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Send Button */}
            <div className="absolute bottom-3 right-3">
              <Button
                type="submit"
                size="icon"
                disabled={disabled || !message.trim()}
                className="h-9 w-9 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
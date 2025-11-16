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

  const personaIcons = {
    professional: Briefcase,
    casual: User,
    technical: Code,
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

  const PersonaIcon = personaIcons[currentPersona]

  return (
    <div className={`w-full ${centered ? "max-w-3xl mx-auto" : ""}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative rounded-3xl bg-gradient-to-br from-white/25 via-white/15 to-white/5 p-[1px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.6)] overflow-hidden">
          {/* Animated glare effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] rounded-3xl" />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${personaDisplayText[currentPersona]}...`}
            disabled={disabled}
            className="relative min-h-[48px] md:min-h-[56px] max-h-[200px] w-full resize-none rounded-2xl md:rounded-3xl border-0 bg-black/30 backdrop-blur-3xl px-12 md:px-14 py-3 md:py-4 pr-12 md:pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 hover:bg-black/20 transition-all duration-300"
            rows={1}
          />
        </div>
        
        {/* Persona Toggle Button */}
        {onPersonaChange && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute bottom-2 md:bottom-3 left-2 md:left-3 h-8 w-8 md:h-9 md:w-9 rounded-full hover:bg-white/10"
                title={`Current: ${currentPersona}`}
              >
                <span className="text-base md:text-lg">{personaLabels[currentPersona]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => onPersonaChange("professional")}>
                <div className="flex items-center gap-2">
                  <span>💼</span>
                  <div className="flex flex-col">
                    <span className="font-medium">Professional</span>
                    <span className="text-xs text-muted-foreground">Formal tone</span>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPersonaChange("casual")}>
                <div className="flex items-center gap-2">
                  <span>😊</span>
                  <div className="flex flex-col">
                    <span className="font-medium">Casual</span>
                    <span className="text-xs text-muted-foreground">Friendly tone</span>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPersonaChange("technical")}>
                <div className="flex items-center gap-2">
                  <span>🔧</span>
                  <div className="flex flex-col">
                    <span className="font-medium">Technical</span>
                    <span className="text-xs text-muted-foreground">Deep details</span>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 h-8 w-8 md:h-9 md:w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_20px_rgba(59,130,246,0.6)] overflow-hidden">
          {/* Animated glare effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
          <Button
            type="submit"
            size="icon"
            disabled={disabled || !message.trim()}
            className="relative h-full w-full rounded-full bg-transparent hover:brightness-110 transition-all duration-300 border-0"
          >
            <Send className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
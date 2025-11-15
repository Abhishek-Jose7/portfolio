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

  const PersonaIcon = personaIcons[currentPersona]

  return (
    <div className={`w-full ${centered ? "max-w-3xl mx-auto" : ""}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Abhishek Jose..."
          disabled={disabled}
          className="min-h-[56px] max-h-[200px] w-full resize-none rounded-3xl border border-border bg-card px-14 py-4 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-lg glass"
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
                className="absolute bottom-2.5 left-2.5 h-9 w-9 rounded-full hover:bg-accent"
                title={`Current: ${currentPersona}`}
              >
                <span className="text-lg">{personaLabels[currentPersona]}</span>
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

        <Button
          type="submit"
          size="icon"
          disabled={disabled || !message.trim()}
          className="absolute bottom-2.5 right-2.5 h-9 w-9 rounded-full bg-primary hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
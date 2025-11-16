"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Download, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeProvider, useTheme } from "@/components/ThemeProvider"
import { PortfolioSidebar } from "@/components/PortfolioSidebar"
import { ChatMessage } from "@/components/ChatMessage"
import { ChatInput } from "@/components/ChatInput"
import { SuggestedPrompts } from "@/components/SuggestedPrompts"
import { EtherealShadow } from "@/components/ui/ethereal-shadow"
import { exportChatToPDF } from "@/lib/exportToPdf"
import portfolioData from "@/lib/portfolio-data.json"
import { ProjectContent } from "@/components/sections/ProjectContent"
import { AboutContent } from "@/components/sections/AboutContent"
import { SkillsContent } from "@/components/sections/SkillsContent"
import { ExperienceContent } from "@/components/sections/ExperienceContent"
import { EducationContent } from "@/components/sections/EducationContent"
import { AchievementsContent } from "@/components/sections/AchievementsContent"
import { SketchesContent } from "@/components/sections/SketchesContent"
import { ContactContent } from "@/components/sections/ContactContent"

interface Message {
  role: "user" | "assistant"
  content: string
  isTyping?: boolean
}

function PortfolioContent() {
  const { theme, toggleTheme } = useTheme()
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('chatMessages')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [currentPersona, setCurrentPersona] = useState<"professional" | "casual" | "technical">("casual")
  const [suggestions, setSuggestions] = useState([
    "Show me your best work",
    "Tell me your development philosophy",
    "Walk me through your journey",
    "What are your strongest skills?",
    "Show me your ML projects",
  ])
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activeSectionItem, setActiveSectionItem] = useState<any>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [sessionId] = useState(() => Math.random().toString(36).substring(7))
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [chatSessions, setChatSessions] = useState<Array<{id: string, title: string, timestamp: number, messages: Message[]}>>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('chatSessions')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  const isChatEmpty = messages.length === 0 && !activeSection

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
    if (typeof window !== 'undefined' && currentChatId) {
      sessionStorage.setItem('chatMessages', JSON.stringify(messages))
      // Update current chat session
      setChatSessions(prev => {
        const updated = prev.map(chat => 
          chat.id === currentChatId ? { ...chat, messages } : chat
        )
        sessionStorage.setItem('chatSessions', JSON.stringify(updated))
        return updated
      })
    }
  }, [messages, currentChatId])

  useEffect(() => {
    if (activeSection) {
      const path = activeSection.startsWith('project-') 
        ? `/${activeSectionItem?.title.toLowerCase().replace(/\s+/g, '-')}`
        : `/${activeSection}`
      window.history.pushState({}, '', path)
    } else {
      window.history.pushState({}, '', '/')
    }
  }, [activeSection, activeSectionItem])

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = { role: "user", content: message }
    
    // Create new chat session if this is the first message
    if (!currentChatId && messages.length === 0) {
      const newChatId = `chat_${Date.now()}_${Math.random().toString(36).substring(7)}`
      const chatTitle = message.length > 50 ? message.substring(0, 50) + '...' : message
      const newSession = {
        id: newChatId,
        title: chatTitle,
        timestamp: Date.now(),
        messages: [userMessage]
      }
      setChatSessions(prev => {
        const updated = [...prev, newSession]
        sessionStorage.setItem('chatSessions', JSON.stringify(updated))
        return updated
      })
      setCurrentChatId(newChatId)
    }
    
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId, persona: currentPersona }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        isTyping: true,
      }

      setMessages((prev) => [...prev, assistantMessage])
      
      if (data.suggestions) {
        setSuggestions(data.suggestions)
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handlePersonaChange = async (persona: "professional" | "casual" | "technical") => {
    setCurrentPersona(persona)
    
    // Get the last assistant message
    const lastAssistantMessage = [...messages].reverse().find(m => m.role === "assistant")
    if (!lastAssistantMessage) return

    // Re-generate response with new persona
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: messages[messages.length - 2]?.content || "Tell me about yourself",
          sessionId,
          persona,
          regenerate: true
        }),
      })

      const data = await response.json()

      // Update the last assistant message
      setMessages((prev) => {
        const newMessages = [...prev]
        const lastAssistantIndex = newMessages.map(m => m.role).lastIndexOf("assistant")
        if (lastAssistantIndex !== -1) {
          newMessages[lastAssistantIndex] = {
            role: "assistant",
            content: data.response,
            isTyping: true,
          }
        }
        return newMessages
      })
    } catch (error) {
      console.error("Failed to regenerate message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSectionClick = (section: string, item?: any) => {
    // Clear main chat and show section content
    setMessages([])
    setActiveSection(section === "project" ? `project-${item?.id}` : section)
    setActiveSectionItem(item)
  }

  const handleNewChat = () => {
    setMessages([])
    setCurrentChatId(null)
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('chatMessages')
    }
    setActiveSection(null)
    setActiveSectionItem(null)
    setCurrentPersona("casual")
    setSuggestions([
      "Show me your best work",
      "Tell me your development philosophy",
      "Walk me through your journey",
      "What are your strongest skills?",
      "Show me your ML projects",
    ])
  }

  const handleLoadChat = (chatId: string) => {
    const chat = chatSessions.find(c => c.id === chatId)
    if (chat) {
      // Load messages without typing animation - they're already generated
      const loadedMessages = chat.messages.map(msg => ({
        ...msg,
        isTyping: false
      }))
      setMessages(loadedMessages)
      setCurrentChatId(chatId)
      setActiveSection(null)
      setActiveSectionItem(null)
      
      // Update sessionStorage with current chat
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('chatMessages', JSON.stringify(loadedMessages))
      }
      
      // Close sidebar on mobile after loading chat
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }
  }

  const handleToggleSidebar = (open: boolean) => {
    setSidebarOpen(open)
  }

  const handleExportChat = () => {
    if (messages.length === 0) {
      alert("No messages to export!")
      return
    }
    exportChatToPDF(messages)
  }

  const handleShareChat = () => {
    const chatText = messages
      .map((msg) => `${msg.role === "user" ? "You" : "Abhishek Jose AI"}: ${msg.content}`)
      .join("\n\n")

    if (navigator.share) {
      navigator.share({
        title: "Chat with Abhishek Jose",
        text: chatText,
      })
    } else {
      navigator.clipboard.writeText(chatText)
      alert("Chat copied to clipboard!")
    }
  }

  const renderSectionContent = () => {
    if (!activeSection) return null

    // Determine which section to render
    const sectionType = activeSection.startsWith("project-") ? "project" : activeSection

    // Sketches section gets full page treatment
    if (sectionType === "sketches") {
      return (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Section Header */}
          <div className="border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0 relative z-50">
            <div className="max-w-4xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Sketches</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleNewChat}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Full Page Content */}
          <div className="flex-1 overflow-hidden">
            <SketchesContent />
          </div>
        </div>
      )
    }

    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Section Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {sectionType === "project" ? activeSectionItem?.title : 
                 sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}
              </h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleNewChat}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto px-4 py-6">
              {sectionType === "project" && activeSectionItem && (
                <ProjectContent project={activeSectionItem} />
              )}
              {sectionType === "about" && <AboutContent />}
              {sectionType === "skills" && <SkillsContent />}
              {sectionType === "experience" && <ExperienceContent />}
              {sectionType === "education" && <EducationContent />}
              {sectionType === "achievements" && <AchievementsContent />}
              {sectionType === "contact" && <ContactContent />}
            </div>
          </ScrollArea>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <PortfolioSidebar
        onSectionClick={handleSectionClick}
        onNewChat={handleNewChat}
        activeSection={activeSection || undefined}
        isOpen={sidebarOpen}
        onToggle={handleToggleSidebar}
        chatSessions={chatSessions}
        onLoadChat={handleLoadChat}
        currentChatId={currentChatId}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative h-screen">
        {/* Top Bar with Theme Toggle and Actions */}
        <div className="absolute top-4 right-4 z-30 flex gap-2">
          {!isChatEmpty && messages.length > 0 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleShareChat}
                className="rounded-full glass"
                title="Share Chat"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleExportChat}
                className="rounded-full glass"
                title="Export as PDF"
              >
                <Download className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            className="rounded-full glass"
            title="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Render Section Content or Chat */}
        {activeSection ? (
          renderSectionContent()
        ) : (
          /* Chat Content */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {isChatEmpty ? (
              /* Initial State - Centered with Ethereal Shadow Background */
              <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                {/* Ethereal Shadow Background - Full Screen */}
                <div className="absolute inset-0">
                  <EtherealShadow
                    sizing="stretch"
                    color="rgba(139, 92, 246, 0.8)"
                    animation={{
                      scale: 80,
                      speed: 95
                    }}
                    noise={{
                      opacity: 50,
                      scale: 1.5
                    }}
                  >
                    {/* Content */}
                    <div className="flex items-center justify-center h-full">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-3xl space-y-8 mx-auto px-4"
                      >
                        {/* Welcome Message */}
                        <div className="text-center space-y-2">
                          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Hi, I'm {portfolioData.personal.name}
                          </h1>
                          <p className="text-muted-foreground">
                            {portfolioData.personal.title}
                          </p>
                        </div>

                        {/* Suggested Prompts */}
                        <div className="w-full">
                          <SuggestedPrompts
                            prompts={suggestions}
                            onSelect={handleSendMessage}
                          />
                        </div>

                        {/* Chat Input */}
                        <ChatInput
                          onSend={handleSendMessage}
                          disabled={isLoading}
                          centered
                          currentPersona={currentPersona}
                          onPersonaChange={setCurrentPersona}
                        />
                      </motion.div>
                    </div>
                  </EtherealShadow>
                </div>
              </div>
            ) : (
              /* Chat Active State */
              <div className="flex-1 flex flex-col h-full bg-transparent relative">
                {/* Fade effect at top */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent z-10"></div>
                
                {/* Scrollable Chat Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden pb-32" ref={scrollRef}>
                  <div className="max-w-4xl mx-auto py-4 px-4">
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={index}
                        role={message.role}
                        content={message.content}
                        isTyping={message.isTyping}
                        onPersonaChange={handlePersonaChange}
                      />
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 px-4 py-2 my-2">
                        <div className="shrink-0">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <div className="flex space-x-1">
                              <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                                className="w-1.5 h-1.5 bg-primary rounded-full"
                              />
                              <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                className="w-1.5 h-1.5 bg-primary rounded-full"
                              />
                              <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                                className="w-1.5 h-1.5 bg-primary rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Fade effect at bottom */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>

                {/* ChatGPT-Style Floating Input Bar */}
                <div
                  className="fixed bottom-6 left-0 right-0 flex justify-center z-30 px-4"
                  style={{
                    left: sidebarOpen
                      ? (typeof window !== "undefined" && window.innerWidth < 768 ? "0" : "270px")
                      : "60px",
                  }}
                >
                  <div className="w-full max-w-3xl relative">
                    {/* Suggested Prompts above chat bar */}
                    <div className="mb-3">
                      <SuggestedPrompts
                        prompts={suggestions}
                        onSelect={handleSendMessage}
                      />
                    </div>
                    
                    {/* Floating Chat Input */}
                    <div
                      className="flex items-center gap-3 px-4 py-3
                      bg-zinc-900/60 backdrop-blur-xl border border-white/10
                      rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]
                      transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]"
                    >
                      <ChatInput
                        onSend={handleSendMessage}
                        disabled={isLoading}
                        currentPersona={currentPersona}
                        onPersonaChange={setCurrentPersona}
                      />
                    </div>

                    {/* subtle glow line above */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Section Content Components
export default function Home() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}
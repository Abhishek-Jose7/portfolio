"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Download, Share2, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeProvider, useTheme } from "@/components/ThemeProvider"
import { PortfolioSidebar } from "@/components/PortfolioSidebar"
import { ChatMessage } from "@/components/ChatMessage"
import { ChatInput } from "@/components/ChatInput"
import { SuggestedPrompts } from "@/components/SuggestedPrompts"
import { WavyBackground } from "@/components/ui/wavy-background"
import { Timeline } from "@/components/ui/timeline"
import { exportChatToPDF } from "@/lib/exportToPdf"
import portfolioData from "@/lib/portfolio-data.json"

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
      setMessages(chat.messages)
      setCurrentChatId(chatId)
      setActiveSection(null)
      setActiveSectionItem(null)
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
              {sectionType === "sketches" && <SketchesContent />}
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
      <div className="flex-1 flex flex-col relative">
        {/* 3D Grid Background */}
        {isChatEmpty && (
          <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        )}

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
          <div className="flex-1 flex flex-col">
            {isChatEmpty ? (
              /* Initial State - Centered with Wavy Background */
              <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                {/* Wavy Background - Full Screen */}
                <WavyBackground
                  className=""
                  containerClassName="!absolute !inset-0 !h-full !w-full"
                  colors={[
                    "#38bdf8",
                    "#818cf8",
                    "#c084fc",
                    "#e879f9",
                    "#22d3ee",
                  ]}
                  waveWidth={50}
                  backgroundFill="hsl(var(--background))"
                  blur={10}
                  speed="fast"
                  waveOpacity={0.5}
                >
                  {/* Content */}
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
                </WavyBackground>
              </div>
            ) : (
              /* Chat Active State */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full" ref={scrollRef}>
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
                      <div className="flex gap-3 px-4 py-3 bg-muted/30">
                        <div className="flex-shrink-0">
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
                  </ScrollArea>
                </div>

                {/* Bottom Area with Suggestions and Input - Always Visible */}
                <div className="border-t border-border bg-background/80 backdrop-blur-sm flex-shrink-0">
                  <div className="max-w-4xl mx-auto px-4 py-4 space-y-3">
                    {/* Suggested Prompts */}
                    <SuggestedPrompts
                      prompts={suggestions}
                      onSelect={handleSendMessage}
                    />

                    {/* Chat Input */}
                    <ChatInput 
                      onSend={handleSendMessage} 
                      disabled={isLoading}
                      currentPersona={currentPersona}
                      onPersonaChange={setCurrentPersona}
                    />
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
function ProjectContent({ project }: { project: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* ... existing project content from SectionDetail ... */}
      <div className="space-y-4">
        <div className="glass rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          {project.image && (
            <img src={project.image} alt={project.title} className="w-full rounded-lg mb-4" />
          )}
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag: string) => (
              <span key={tag} className="px-2 py-1 text-xs rounded-full glass">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function AboutContent() {
  const messages = [
    {
      type: "assistant",
      content: `Hey! Great to meet you. I'm ${portfolioData.personal.name}, though you can just call me Abhishek.`,
      delay: 0
    },
    {
      type: "assistant", 
      content: `I'm a ${portfolioData.personal.title} based in ${portfolioData.personal.location}. I build things on the web—mostly apps that need to work fast, scale well, and not break when people actually use them.`,
      delay: 0.1
    },
    {
      type: "image",
      src: portfolioData.personal.avatar,
      caption: "That's me (probably with coffee nearby)",
      delay: 0.2
    },
    {
      type: "card",
      title: "Quick Identity Check",
      items: [
        { label: "Name", value: portfolioData.personal.name },
        { label: "Role", value: portfolioData.personal.title },
        { label: "Specialization", value: "Full-stack development, AI/ML integration, scalable architectures" },
        { label: "Approach", value: "Ship fast, iterate faster, keep it simple" },
        { label: "Philosophy", value: "Code is for humans, performance is for users" }
      ],
      delay: 0.3
    },
    {
      type: "assistant",
      content: `**My Background & Journey**\n\nI got into coding because I wanted to build things that mattered. Started with simple websites, then APIs, then full systems. Each project taught me something new about what works (and what definitely doesn't).\n\nWhat drives me? Seeing something I built actually help someone. Whether it's an app handling 50k+ users or a tool that saves developers hours of work—that's the good stuff.\n\nI've learned that the best code isn't the most clever. It's the code that solves the problem clearly, runs fast, and doesn't make your teammates want to quit.`,
      delay: 0.4
    },
    {
      type: "assistant",
      content: `**What I'm Good At**\n\n• Building full-stack applications that scale\n• Making APIs that don't mysteriously break at 3 AM\n• Frontend work that feels smooth and looks clean\n• Architecting systems that grow without falling apart\n• Debugging production issues (unfortunately, lots of practice here)\n• Working with teams to ship things that matter`,
      delay: 0.5
    },
    {
      type: "card",
      title: "Quick Facts",
      items: [
        { icon: "📍", label: "Location", value: portfolioData.personal.location },
        { icon: "💬", label: "Languages", value: "English, Hindi, Malayalam" },
        { icon: "⚡", label: "Favorite Stack", value: "Next.js + TypeScript + Tailwind" },
        { icon: "🛠️", label: "Tools I Live In", value: "VS Code, Figma, Linear, Vercel" },
        { icon: "🎵", label: "Coding Music", value: "Lo-fi beats or complete silence" },
        { icon: "☕", label: "Coffee Count", value: `${portfolioData.stats.coffeeConsumed} cups (and counting)` },
        { icon: "🎯", label: "My Values", value: "Clarity, speed, empathy, learning" }
      ],
      delay: 0.6
    },
    {
      type: "assistant",
      content: `**The Journey So Far**\n\nHere's a quick timeline of key moments:`,
      delay: 0.7
    },
    {
      type: "timeline",
      events: [
        { year: "2019", title: "Started Professional Journey", desc: "First real dev job, learned more in 6 months than 2 years of courses" },
        { year: "2020", title: "Shipped First Major Product", desc: "Built an analytics platform from scratch. It's still running." },
        { year: "2021", title: "Went Full-Stack", desc: "Stopped being 'just frontend' or 'just backend'—embraced the whole thing" },
        { year: "2022", title: "Led Team Projects", desc: "Started mentoring others, realized teaching is the best way to learn" },
        { year: "2023", title: "Hit 50k+ Users", desc: "AI SaaS platform crossed major milestone, learned about scale the hard way" },
        { year: "2024", title: "Open Source Contributions", desc: `Gave back to the community—${portfolioData.stats.openSourceContributions}+ contributions` },
        { year: "2025", title: "Today", desc: "Still building, still learning, still shipping" }
      ],
      delay: 0.8
    },
    {
      type: "assistant",
      content: `**What's Next**\n\nRight now I'm focused on:\n• Building AI-powered tools that actually solve real problems\n• Learning more about distributed systems and performance optimization\n• Contributing to open source projects I believe in\n• Mentoring junior developers (they ask great questions)\n• Exploring the intersection of AI and developer tools`,
      delay: 0.9
    },
    {
      type: "assistant",
      content: `**My Goals**\n\nShort term: Ship products that people love using\n\nLong term: Build systems that scale, mentor great developers, contribute something meaningful to the tech community\n\nPersonal: Never stop learning, stay curious, and remember why I started coding in the first place`,
      delay: 1.0
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      caption: "My typical workspace (organized chaos)",
      delay: 1.1
    },
    {
      type: "assistant",
      content: `That's the overview! Feel free to ask me anything else—about projects I've built, tech I work with, or just how I approach problems. I'm here to chat.`,
      delay: 1.2
    }
  ];

  return (
    <div className="space-y-4">
      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: msg.delay, duration: 0.3 }}
        >
          {msg.type === "assistant" && (
            <div className="flex gap-3 px-4 py-3 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex-1 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">{msg.content}</p>
              </div>
            </div>
          )}

          {msg.type === "image" && (
            <div className="px-4 py-2">
              <div className="rounded-lg overflow-hidden glass">
                <img 
                  src={msg.src} 
                  alt={msg.caption} 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground p-3 text-center italic">{msg.caption}</p>
              </div>
            </div>
          )}

          {msg.type === "card" && (
            <div className="px-4">
              <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{msg.title}</h3>
                <div className="space-y-3">
                  {msg.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      {item.icon && <span className="text-lg flex-shrink-0">{item.icon}</span>}
                      <div className="flex-1">
                        {item.label && <span className="text-sm font-medium text-muted-foreground">{item.label}: </span>}
                        <span className="text-sm">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {msg.type === "timeline" && (
            <div className="px-4">
              <div className="glass rounded-lg p-6">
                <div className="space-y-4">
                  {msg.events.map((event: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-primary">{event.year}</span>
                        </div>
                        {i < msg.events.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function SkillsContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
        {/* Add skills rendering */}
      </div>
    </motion.div>
  )
}

function ExperienceContent() {
  // Reverse order so 2025 is first
  const sortedExperience = [...portfolioData.experience].reverse();
  
  const timelineData = sortedExperience.map((exp, index) => {
    const year = exp.startDate.split(' ')[1] || exp.startDate.substring(0, 4);
    const displayYear = index === 0 ? year : index === 1 ? year : `${year}--`;
    
    return {
      title: displayYear,
      content: (
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
            <p className="text-primary font-medium text-lg">{exp.company}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {exp.startDate} - {exp.current ? 'Present' : exp.endDate} • {exp.location}
            </p>
            {exp.current && (
              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Current Role
              </span>
            )}
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop" 
              alt="Office workspace"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop" 
              alt="Team collaboration"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
          
          {/* Key Achievements */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Key Achievements:</h4>
            <ul className="space-y-2">
              {exp.achievements.map((achievement: string, idx: number) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-3">
                  <span className="text-primary text-lg mt-0.5">•</span>
                  <span className="flex-1">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech: string) => (
                <span key={tech} className="px-3 py-1.5 text-sm rounded-full bg-muted hover:bg-muted/80 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="pb-20">
      <Timeline data={timelineData} />
    </div>
  );
}

function EducationContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Education</h3>
        {/* Add education rendering */}
      </div>
    </motion.div>
  )
}

function AchievementsContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Achievements & Awards</h3>
        {/* Add achievements rendering */}
      </div>
    </motion.div>
  )
}

function SketchesContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Sketches & Creative Work</h3>
        <p className="text-muted-foreground mb-6">
          A collection of my creative sketches, design experiments, and visual explorations.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square rounded-lg bg-muted/30 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Sketch {i}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ContactContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
        <p className="text-muted-foreground mb-4">
          Email: {portfolioData.personal.email}
        </p>
        <p className="text-muted-foreground">
          Phone: {portfolioData.personal.phone}
        </p>
      </div>
    </motion.div>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}
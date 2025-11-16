"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  User,
  Briefcase,
  Award,
  GraduationCap,
  Trophy,
  Mail,
  FolderGit2,
  Github,
  Linkedin,
  Instagram,
  Plus,
  MessageSquare,
  Sparkles,
  Palette,
  Code2,
  Zap,
  Database,
  Globe,
  Cpu,
  Smartphone,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import portfolioData from "@/lib/portfolio-data.json"

interface ChatSession {
  id: string
  title: string
  timestamp: number
  messages: any[]
}

interface PortfolioSidebarProps {
  onSectionClick: (section: string, item?: any) => void
  onNewChat: () => void
  activeSection?: string
  isOpen: boolean
  onToggle: (open: boolean) => void
  chatSessions: ChatSession[]
  onLoadChat: (chatId: string) => void
  currentChatId: string | null
}

// Project icon mapping
const projectIcons: Record<string, any> = {
  "AI/ML": Cpu,
  "Web App": Globe,
  "Mobile App": Smartphone,
  "Analytics": Zap,
  "E-Commerce": Database,
  "SaaS": Code2,
}

function getProjectIcon(category: string) {
  const Icon = projectIcons[category] || Code2
  return Icon
}

export function PortfolioSidebar({ onSectionClick, onNewChat, activeSection, isOpen, onToggle, chatSessions, onLoadChat, currentChatId }: PortfolioSidebarProps) {
  const [projectsExpanded, setProjectsExpanded] = useState(true)
  const [chatsExpanded, setChatsExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // ESC key to close sidebar
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onToggle(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onToggle])

  const sections = [
    { id: "about", label: "About Me", icon: User },
    { id: "skills", label: "Skills", icon: Award },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "sketches", label: "Sketches", icon: Palette },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  return (
    <>
      {/* Overlay for mobile only */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => onToggle(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          x: isOpen ? 0 : isMobile ? -270 : 0,
          width: isOpen ? 270 : isMobile ? 0 : 60
        }}
        transition={{ 
          duration: isMobile ? 0.2 : 0.35,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className={`${isMobile ? 'fixed' : 'relative'} h-screen border-r border-white/10 bg-gradient-to-b from-sidebar/95 via-sidebar to-sidebar/95 backdrop-blur-xl flex-shrink-0 z-50`}
        style={{ 
          minWidth: isOpen ? 270 : isMobile ? 0 : 60,
          maxWidth: isOpen ? 270 : isMobile ? 0 : 60,
          boxShadow: isOpen ? '4px 0 32px rgba(0, 0, 0, 0.2), inset -1px 0 0 0 rgba(255, 255, 255, 0.05)' : 'none',
          left: isMobile ? 0 : 'auto',
          willChange: 'transform, width'
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.1
              }}
              className="flex h-full flex-col"
              style={{ width: 270 }}
            >
              {/* Logo at top */}
              <div className="px-4 pt-6 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.2 }}
                      className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
                      <Sparkles className="h-4 w-4 text-white relative z-10" />
                    </motion.div>
                  </div>
                  <Button
                    onClick={() => onToggle(false)}
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 flex-shrink-0"
                    aria-label="Close sidebar"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Profile Section */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                className="px-4 pb-4 pt-2"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">
                    {portfolioData.personal.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {portfolioData.personal.title}
                  </p>
                </div>
              </motion.div>

              {/* New Chat Button */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.2 }}
                className="px-4 pb-2"
              >
                <Button
                  onClick={onNewChat}
                  size="sm"
                  className="relative w-full justify-start gap-2 bg-white/5 hover:bg-white/10 text-foreground border border-white/10 h-9 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Plus className="h-4 w-4 flex-shrink-0 relative z-10" />
                  <span className="text-sm relative z-10">New Chat</span>
                </Button>
              </motion.div>

              {/* Download Resume */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className="px-4 pb-3"
              >
                <Button
                  onClick={() => window.open(portfolioData.personal.resumeUrl, "_blank")}
                  size="sm"
                  className="relative w-full justify-start gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-9 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Download className="h-4 w-4 flex-shrink-0 relative z-10" />
                  <span className="text-sm relative z-10">Download Resume</span>
                </Button>
              </motion.div>

              <Separator />

              {/* Main Content - Scrollable */}
              <ScrollArea className="flex-1 overflow-y-auto">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.2 }}
                  className="space-y-4 px-4 py-3"
                >
                  {/* Sections */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                  >
                    <div className="mb-2 flex items-center gap-2 px-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Explore
                      </h4>
                    </div>
                    <div className="space-y-1">
                      {sections.map((section, idx) => {
                        const Icon = section.icon
                        return (
                          <motion.div
                            key={section.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + idx * 0.04, duration: 0.2 }}
                          >
                            <Button
                              onClick={() => onSectionClick(section.id)}
                              variant="ghost"
                              size="sm"
                              className={`w-full justify-start gap-2 text-sm h-8 px-2 ${
                                activeSection === section.id ? "bg-accent" : ""
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                              <span className="truncate text-left">{section.label}</span>
                            </Button>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>

                  <Separator />

                  {/* Projects - Collapsible Folder */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.75, duration: 0.2 }}
                  >
                    <Button
                      onClick={() => setProjectsExpanded(!projectsExpanded)}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 px-2 mb-1 hover:bg-accent h-8"
                    >
                      <FolderGit2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex-1 text-left">
                        Projects
                      </h4>
                      <motion.div
                        animate={{ rotate: projectsExpanded ? 0 : -90 }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      </motion.div>
                    </Button>
                    
                    <AnimatePresence initial={false}>
                      {projectsExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ 
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="space-y-1 pt-1">
                            {portfolioData.projects.map((project, idx) => {
                              const ProjectIcon = getProjectIcon(project.category)
                              return (
                                <motion.div
                                  key={project.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.8 + idx * 0.05, duration: 0.2 }}
                                >
                                  <Button
                                    onClick={() => onSectionClick("project", project)}
                                    variant="ghost"
                                    size="sm"
                                    className={`w-full justify-start gap-2 text-sm h-8 px-2 ${
                                      activeSection === `project-${project.id}` ? "bg-accent" : ""
                                    }`}
                                  >
                                    <ProjectIcon className="h-3.5 w-3.5 flex-shrink-0 text-primary/70" />
                                    <span className="truncate text-left">{project.title}</span>
                                  </Button>
                                </motion.div>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Recent Chats */}
                  {chatSessions.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <Button
                          onClick={() => setChatsExpanded(!chatsExpanded)}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start gap-2 px-2 mb-1 hover:bg-accent h-8"
                        >
                          <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex-1 text-left">
                            Recent Chats
                          </h4>
                          <motion.div
                            animate={{ rotate: chatsExpanded ? 0 : -90 }}
                            transition={{ 
                              duration: 0.3,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className="h-3 w-3 text-muted-foreground" />
                          </motion.div>
                        </Button>
                        
                        <AnimatePresence initial={false}>
                          {chatsExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ 
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1]
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="space-y-1 pt-1">
                                {chatSessions.slice(0, 5).reverse().map((chat) => (
                                  <Button
                                    key={chat.id}
                                    onClick={() => onLoadChat(chat.id)}
                                    variant="ghost"
                                    size="sm"
                                    className={`w-full justify-start gap-2 text-sm h-8 px-2 ${
                                      currentChatId === chat.id ? "bg-accent" : ""
                                    }`}
                                  >
                                    <MessageSquare className="h-3.5 w-3.5 flex-shrink-0 text-primary/70" />
                                    <span className="truncate text-left text-xs">{chat.title}</span>
                                  </Button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </motion.div>
              </ScrollArea>

              {/* Footer - Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.2 }}
                className="border-t border-border px-4 py-4"
              >
                <div className="flex items-center justify-center gap-3">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 flex-shrink-0"
                    onClick={() => window.open(portfolioData.social.github, "_blank")}
                    title="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 flex-shrink-0"
                    onClick={() => window.open(portfolioData.social.linkedin, "_blank")}
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 flex-shrink-0"
                    onClick={() => window.open(portfolioData.social.instagram, "_blank")}
                    title="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ) : !isMobile ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="h-screen flex flex-col items-center py-4 gap-3"
            >
              {/* Expand Button */}
              <Button
                onClick={() => onToggle(true)}
                size="icon"
                variant="ghost"
                className="h-9 w-9 flex-shrink-0"
                title="Expand Sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Separator className="w-8" />

              {/* Logo */}
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 text-white" />
              </div>

              <Separator className="w-8" />

              {/* New Chat Icon */}
              <Button
                onClick={() => {
                  onToggle(true)
                  onNewChat()
                }}
                size="icon"
                variant="ghost"
                className="h-9 w-9 flex-shrink-0"
                title="New Chat"
                aria-label="New chat"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
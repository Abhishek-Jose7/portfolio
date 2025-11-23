"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import OrbitingItems from "@/components/ui/orbiting-items"
import { Icons } from "@/components/icons"
import portfolioData from "@/lib/portfolio-data.json"
import { X, Brain } from "lucide-react"

export function SkillsContent() {
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; level: number; years: number } | null>(null)

  const skillMapping: Record<string, { name: string; level: number; years: number }> = {
    react: portfolioData.skills.frontend.find(s => s.name === "React")!,
    nextjs: portfolioData.skills.frontend.find(s => s.name === "Next.js")!,
    typescript: portfolioData.skills.frontend.find(s => s.name === "TypeScript")!,
    tailwind: portfolioData.skills.frontend.find(s => s.name === "Tailwind CSS")!,
    nodejs: portfolioData.skills.backend.find(s => s.name === "Node.js")!,
    python: portfolioData.skills.backend.find(s => s.name === "Python")!,
    docker: portfolioData.skills.devops.find(s => s.name === "Docker")!,
    machineLearning: portfolioData.skills.backend.find(s => s.name === "Machine Learning")!,
    firebase: portfolioData.skills.backend.find(s => s.name === "Firebase")!,
    flask: portfolioData.skills.backend.find(s => s.name === "Flask")!,
    sqlite: portfolioData.skills.backend.find(s => s.name === "SQLite")!,
    postgresql: portfolioData.skills.backend.find(s => s.name === "PostgreSQL")!,
    mongodb: portfolioData.skills.backend.find(s => s.name === "MongoDB")!,
    git: portfolioData.skills.tools.find(s => s.name === "Git")!,
    figma: portfolioData.skills.tools.find(s => s.name === "Figma")!,
  }

  // Colored icons
  const innerCircleItems = [
    { icon: <Icons.react className="h-5 w-5 md:h-6 md:w-6 text-[#61DAFB]" />, ...skillMapping.react },
    { icon: <Icons.nextjs className="h-5 w-5 md:h-6 md:w-6 text-white" />, ...skillMapping.nextjs },
    { icon: <Icons.typescript className="h-5 w-5 md:h-6 md:w-6 text-[#3178C6]" />, ...skillMapping.typescript },
    { icon: <Icons.tailwind className="h-5 w-5 md:h-6 md:w-6 text-[#06B6D4]" />, ...skillMapping.tailwind },
    { icon: <Icons.nodejs className="h-5 w-5 md:h-6 md:w-6 text-[#339933]" />, ...skillMapping.nodejs },
    { icon: <Icons.python className="h-5 w-5 md:h-6 md:w-6 text-[#3776AB]" />, ...skillMapping.python },
    { icon: <Icons.firebase className="h-5 w-5 md:h-6 md:w-6 text-[#FFCA28]" />, ...skillMapping.firebase },
  ]

  const outerCircleItems = [
    { icon: <Icons.docker className="h-5 w-5 md:h-6 md:w-6 text-[#2496ED]" />, ...skillMapping.docker },
    { icon: <Brain className="h-5 w-5 md:h-6 md:w-6 text-[#FF9900]" />, ...skillMapping.machineLearning },
    { icon: <Icons.postgresql className="h-5 w-5 md:h-6 md:w-6 text-[#4169E1]" />, ...skillMapping.postgresql },
    { icon: <Icons.mongodb className="h-5 w-5 md:h-6 md:w-6 text-[#47A248]" />, ...skillMapping.mongodb },
    { icon: <Icons.git className="h-5 w-5 md:h-6 md:w-6 text-[#F05032]" />, ...skillMapping.git },
    { icon: <Icons.figma className="h-5 w-5 md:h-6 md:w-6 text-[#F24E1E]" />, ...skillMapping.figma },
    { icon: <Icons.flask className="h-5 w-5 md:h-6 md:w-6 text-white" />, ...skillMapping.flask },
    { icon: <Icons.sqlite className="h-5 w-5 md:h-6 md:w-6 text-[#003B57]" />, ...skillMapping.sqlite },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center w-full gap-6">
      {/* Orbiting Items Component */}
      <div className="relative">
        <OrbitingItems
          items={innerCircleItems}
          outerItems={outerCircleItems}
          onItemClick={(item) => setSelectedSkill(item)}
        />
      </div>

      {/* Skill Stats - Below Component on Mobile */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden w-full max-w-sm px-4"
          >
            <div className="glass rounded-2xl p-6 relative">
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{selectedSkill.name}</h3>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Proficiency</span>
                    <span className="text-lg font-semibold text-primary">{selectedSkill.level}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-primary/60"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Experience:</span>
                  <span className="text-lg font-semibold">{selectedSkill.years} years</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skill Stats Modal - Desktop Only */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="hidden md:flex fixed inset-0 z-50 items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="glass rounded-2xl p-6 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{selectedSkill.name}</h3>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Proficiency</span>
                    <span className="text-lg font-semibold text-primary">{selectedSkill.level}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-primary/60"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Experience:</span>
                  <span className="text-lg font-semibold">{selectedSkill.years} years</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

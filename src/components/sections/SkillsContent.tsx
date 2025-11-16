"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import OrbitingItems from "@/components/ui/orbiting-items"
import { Icons } from "@/components/icons"
import portfolioData from "@/lib/portfolio-data.json"
import { X } from "lucide-react"

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
    aws: portfolioData.skills.devops.find(s => s.name === "AWS")!,
    postgresql: portfolioData.skills.backend.find(s => s.name === "PostgreSQL")!,
    mongodb: portfolioData.skills.backend.find(s => s.name === "MongoDB")!,
    git: portfolioData.skills.tools.find(s => s.name === "Git")!,
    figma: portfolioData.skills.tools.find(s => s.name === "Figma")!,
  }

  const innerCircleItems = [
    { icon: <Icons.react className="h-6 w-6 text-primary" />, ...skillMapping.react },
    { icon: <Icons.nextjs className="h-6 w-6 text-primary" />, ...skillMapping.nextjs },
    { icon: <Icons.typescript className="h-6 w-6 text-primary" />, ...skillMapping.typescript },
    { icon: <Icons.tailwind className="h-6 w-6 text-primary" />, ...skillMapping.tailwind },
    { icon: <Icons.nodejs className="h-6 w-6 text-primary" />, ...skillMapping.nodejs },
    { icon: <Icons.python className="h-6 w-6 text-primary" />, ...skillMapping.python },
  ]

  const outerCircleItems = [
    { icon: <Icons.docker className="h-6 w-6 text-primary" />, ...skillMapping.docker },
    { icon: <Icons.aws className="h-6 w-6 text-primary" />, ...skillMapping.aws },
    { icon: <Icons.postgresql className="h-6 w-6 text-primary" />, ...skillMapping.postgresql },
    { icon: <Icons.mongodb className="h-6 w-6 text-primary" />, ...skillMapping.mongodb },
    { icon: <Icons.git className="h-6 w-6 text-primary" />, ...skillMapping.git },
    { icon: <Icons.figma className="h-6 w-6 text-primary" />, ...skillMapping.figma },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center w-full">
      {/* Orbiting Items Component */}
      <div className="relative">
        <OrbitingItems
          items={innerCircleItems}
          outerItems={outerCircleItems}
          onItemClick={(item) => setSelectedSkill(item)}
        />

        {/* Skill Stats Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
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
      </div>
    </motion.div>
  )
}

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
            <div className="relative w-full flex justify-center overflow-hidden min-h-[600px]">
                {/* Scattered Background Skills - Desktop Only */}
                <div className="hidden md:block absolute inset-0 pointer-events-none z-10 w-full h-full">
                    {/* Left Side Skills (8 Items) */}

                    {/* React - Top Left */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.5, duration: 0.5 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "2%", left: "2%" }}
                        onClick={() => setSelectedSkill(innerCircleItems[0])}
                    >
                        <div className="opacity-90">{innerCircleItems[0].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[0].name}</span>
                            <span className="text-xs font-bold text-primary">{innerCircleItems[0].level}%</span>
                        </div>
                    </motion.div>

                    {/* Next.js */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.6, duration: 0.5 }, y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "14%", left: "1%" }}
                        onClick={() => setSelectedSkill(innerCircleItems[1])}
                    >
                        <div className="opacity-90">{innerCircleItems[1].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[1].name}</span>
                            <span className="text-xs font-bold text-primary">{innerCircleItems[1].level}%</span>
                        </div>
                    </motion.div>

                    {/* TypeScript */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.7, duration: 0.5 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "26%", left: "3%" }}
                        onClick={() => setSelectedSkill(innerCircleItems[2])}
                    >
                        <div className="opacity-90">{innerCircleItems[2].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[2].name}</span>
                            <span className="text-xs font-bold text-primary">{innerCircleItems[2].level}%</span>
                        </div>
                    </motion.div>

                    {/* Tailwind CSS */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "38%", left: "1%" }}
                        onClick={() => setSelectedSkill(innerCircleItems[3])}
                    >
                        <div className="opacity-90">{innerCircleItems[3].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[3].name}</span>
                            <span className="text-xs font-bold text-primary">{innerCircleItems[3].level}%</span>
                        </div>
                    </motion.div>

                    {/* Node.js - Middle Leftmost */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.9, duration: 0.5 }, y: { duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "50%", left: "2%" }}
                        onClick={() => setSelectedSkill(innerCircleItems[4])}
                    >
                        <div className="opacity-90">{innerCircleItems[4].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[4].name}</span>
                            <span className="text-xs font-bold text-primary">{innerCircleItems[4].level}%</span>
                        </div>
                    </motion.div>

                    {/* Python */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 1.0, duration: 0.5 }, y: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.0 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "64%", left: "1%" }}
                        onClick={() => setSelectedSkill(innerCircleItems[5])}
                    >
                        <div className="opacity-90">{innerCircleItems[5].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[5].name}</span>
                            <span className="text-xs font-bold text-primary">{innerCircleItems[5].level}%</span>
                        </div>
                    </motion.div>

                    {/* Firebase */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 1.1, duration: 0.5 }, y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "78%", left: "3%" }}
                        onClick={() => setSelectedSkill(innerCircleItems[6])}
                    >
                        <div className="opacity-90">{innerCircleItems[6].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[6].name}</span>
                            <span className="text-xs font-bold text-primary">{innerCircleItems[6].level}%</span>
                        </div>
                    </motion.div>

                    {/* Docker - Bottom Leftmost */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 1.2, duration: 0.5 }, y: { duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 1.4 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "92%", left: "2%" }}
                        onClick={() => setSelectedSkill(outerCircleItems[0])}
                    >
                        <div className="opacity-90">{outerCircleItems[0].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[0].name}</span>
                            <span className="text-xs font-bold text-primary">{outerCircleItems[0].level}%</span>
                        </div>
                    </motion.div>


                    {/* Right Side Skills (7 Items) */}

                    {/* Machine Learning - Top Right */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.5, duration: 0.5 }, y: { duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 0.1 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "3%", right: "2%" }}
                        onClick={() => setSelectedSkill(outerCircleItems[1])}
                    >
                        <div className="opacity-90">{outerCircleItems[1].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[1].name}</span>
                            <span className="text-xs font-bold text-primary">{outerCircleItems[1].level}%</span>
                        </div>
                    </motion.div>

                    {/* PostgreSQL */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.6, duration: 0.5 }, y: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "16%", right: "1%" }}
                        onClick={() => setSelectedSkill(outerCircleItems[2])}
                    >
                        <div className="opacity-90">{outerCircleItems[2].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[2].name}</span>
                            <span className="text-xs font-bold text-primary">{outerCircleItems[2].level}%</span>
                        </div>
                    </motion.div>

                    {/* MongoDB */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.7, duration: 0.5 }, y: { duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "30%", right: "3%" }}
                        onClick={() => setSelectedSkill(outerCircleItems[3])}
                    >
                        <div className="opacity-90">{outerCircleItems[3].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[3].name}</span>
                            <span className="text-xs font-bold text-primary">{outerCircleItems[3].level}%</span>
                        </div>
                    </motion.div>

                    {/* Git - Middle Rightmost */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "45%", right: "1%" }}
                        onClick={() => setSelectedSkill(outerCircleItems[4])}
                    >
                        <div className="opacity-90">{outerCircleItems[4].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[4].name}</span>
                            <span className="text-xs font-bold text-primary">{outerCircleItems[4].level}%</span>
                        </div>
                    </motion.div>

                    {/* Figma */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.9, duration: 0.5 }, y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "60%", right: "2%" }}
                        onClick={() => setSelectedSkill(outerCircleItems[5])}
                    >
                        <div className="opacity-90">{outerCircleItems[5].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[5].name}</span>
                            <span className="text-xs font-bold text-primary">{outerCircleItems[5].level}%</span>
                        </div>
                    </motion.div>

                    {/* Flask */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 1.0, duration: 0.5 }, y: { duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: 1.1 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "75%", right: "1%" }}
                        onClick={() => setSelectedSkill(outerCircleItems[6])}
                    >
                        <div className="opacity-90">{outerCircleItems[6].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[6].name}</span>
                            <span className="text-xs font-bold text-primary">{outerCircleItems[6].level}%</span>
                        </div>
                    </motion.div>

                    {/* SQLite - Bottom Rightmost */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 1.1, duration: 0.5 }, y: { duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 1.3 } }}
                        className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                        style={{ top: "90%", right: "3%" }}
                        onClick={() => setSelectedSkill(outerCircleItems[7])}
                    >
                        <div className="opacity-90">{outerCircleItems[7].icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[7].name}</span>
                            <span className="text-xs font-bold text-primary">{outerCircleItems[7].level}%</span>
                        </div>
                    </motion.div>
                </div>

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

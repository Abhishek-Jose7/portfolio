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
            <div className="relative w-full flex justify-center min-h-[350px] md:min-h-[600px]">
                <OrbitingItems
                    items={innerCircleItems}
                    outerItems={outerCircleItems}
                    onItemClick={(item) => setSelectedSkill(item)}
                />
            </div>

            {/* Background Skills - Desktop Only (Scattered) */}
            <div className="hidden md:block absolute inset-0 pointer-events-none z-10 w-full h-full">
                {/* 
                  Maintain already optimized positions for desktop 
                  (React, Next, TS, Tailwind, Node, Python, Firebase, Docker, ML, PG, Mongo, Git, Figma, Flask, SQLite)
                */}
                {/* React - Top Left */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, -15, 0] }}
                    transition={{ opacity: { delay: 0.5, duration: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "3%", left: "18%" }}
                    onClick={() => setSelectedSkill(innerCircleItems[0])}
                >
                    <div className="opacity-90">{innerCircleItems[0].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[0].name}</span>
                        <span className="text-xs font-bold text-primary">{innerCircleItems[0].level}%</span>
                    </div>
                </motion.div>

                {/* Next.js - Top Far Left */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, 15, 0] }}
                    transition={{ opacity: { delay: 0.6, duration: 0.5 }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "15%", left: "12%" }}
                    onClick={() => setSelectedSkill(innerCircleItems[1])}
                >
                    <div className="opacity-90">{innerCircleItems[1].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[1].name}</span>
                        <span className="text-xs font-bold text-primary">{innerCircleItems[1].level}%</span>
                    </div>
                </motion.div>

                {/* TypeScript - Middle Left */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, -12, 0] }}
                    transition={{ opacity: { delay: 0.7, duration: 0.5 }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "35%", left: "10%" }}
                    onClick={() => setSelectedSkill(innerCircleItems[2])}
                >
                    <div className="opacity-90">{innerCircleItems[2].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[2].name}</span>
                        <span className="text-xs font-bold text-primary">{innerCircleItems[2].level}%</span>
                    </div>
                </motion.div>

                {/* Tailwind CSS - Middle Far Left */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, 10, 0] }}
                    transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "55%", left: "11%" }}
                    onClick={() => setSelectedSkill(innerCircleItems[3])}
                >
                    <div className="opacity-90">{innerCircleItems[3].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[3].name}</span>
                        <span className="text-xs font-bold text-primary">{innerCircleItems[3].level}%</span>
                    </div>
                </motion.div>

                {/* Node.js - Lower Left */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, -18, 0] }}
                    transition={{ opacity: { delay: 0.9, duration: 0.5 }, y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "72%", left: "12%" }}
                    onClick={() => setSelectedSkill(innerCircleItems[4])}
                >
                    <div className="opacity-90">{innerCircleItems[4].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[4].name}</span>
                        <span className="text-xs font-bold text-primary">{innerCircleItems[4].level}%</span>
                    </div>
                </motion.div>

                {/* Python - Bottom Far Left */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, 12, 0] }}
                    transition={{ opacity: { delay: 1.0, duration: 0.5 }, y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.0 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "88%", left: "18%" }}
                    onClick={() => setSelectedSkill(innerCircleItems[5])}
                >
                    <div className="opacity-90">{innerCircleItems[5].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[5].name}</span>
                        <span className="text-xs font-bold text-primary">{innerCircleItems[5].level}%</span>
                    </div>
                </motion.div>

                {/* Docker - Bottom Centre */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, -10, 0] }}
                    transition={{ opacity: { delay: 1.1, duration: 0.5 }, y: { duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer transform -translate-x-1/2"
                    style={{ top: "95%", left: "50%" }}
                    onClick={() => setSelectedSkill(outerCircleItems[0])}
                >
                    <div className="opacity-90">{outerCircleItems[0].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[0].name}</span>
                        <span className="text-xs font-bold text-primary">{outerCircleItems[0].level}%</span>
                    </div>
                </motion.div>

                {/* Firebase - Bottom Left */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, 15, 0] }}
                    transition={{ opacity: { delay: 1.2, duration: 0.5 }, y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "78%", left: "16%" }}
                    onClick={() => setSelectedSkill(innerCircleItems[6])}
                >
                    <div className="opacity-90">{innerCircleItems[6].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{innerCircleItems[6].name}</span>
                        <span className="text-xs font-bold text-primary">{innerCircleItems[6].level}%</span>
                    </div>
                </motion.div>

                {/* Machine Learning - Top Right */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, -15, 0] }}
                    transition={{ opacity: { delay: 0.5, duration: 0.5 }, y: { duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 0.1 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "3%", right: "18%" }}
                    onClick={() => setSelectedSkill(outerCircleItems[1])}
                >
                    <div className="opacity-90">{outerCircleItems[1].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[1].name}</span>
                        <span className="text-xs font-bold text-primary">{outerCircleItems[1].level}%</span>
                    </div>
                </motion.div>

                {/* PostgreSQL - Top Far Right */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, 15, 0] }}
                    transition={{ opacity: { delay: 0.6, duration: 0.5 }, y: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "15%", right: "12%" }}
                    onClick={() => setSelectedSkill(outerCircleItems[2])}
                >
                    <div className="opacity-90">{outerCircleItems[2].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[2].name}</span>
                        <span className="text-xs font-bold text-primary">{outerCircleItems[2].level}%</span>
                    </div>
                </motion.div>

                {/* MongoDB - Middle Right */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, -12, 0] }}
                    transition={{ opacity: { delay: 0.7, duration: 0.5 }, y: { duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "35%", right: "12%" }}
                    onClick={() => setSelectedSkill(outerCircleItems[3])}
                >
                    <div className="opacity-90">{outerCircleItems[3].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[3].name}</span>
                        <span className="text-xs font-bold text-primary">{outerCircleItems[3].level}%</span>
                    </div>
                </motion.div>

                {/* Git - Middle Far Right */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, 18, 0] }}
                    transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "55%", right: "10%" }}
                    onClick={() => setSelectedSkill(outerCircleItems[4])}
                >
                    <div className="opacity-90">{outerCircleItems[4].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[4].name}</span>
                        <span className="text-xs font-bold text-primary">{outerCircleItems[4].level}%</span>
                    </div>
                </motion.div>

                {/* Figma - Lower Right */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, -14, 0] }}
                    transition={{ opacity: { delay: 0.9, duration: 0.5 }, y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "72%", right: "12%" }}
                    onClick={() => setSelectedSkill(outerCircleItems[5])}
                >
                    <div className="opacity-90">{outerCircleItems[5].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[5].name}</span>
                        <span className="text-xs font-bold text-primary">{outerCircleItems[5].level}%</span>
                    </div>
                </motion.div>

                {/* Flask - Bottom Far Right */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, 16, 0] }}
                    transition={{ opacity: { delay: 1.0, duration: 0.5 }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "82%", right: "15%" }}
                    onClick={() => setSelectedSkill(outerCircleItems[6])}
                >
                    <div className="opacity-90">{outerCircleItems[6].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[6].name}</span>
                        <span className="text-xs font-bold text-primary">{outerCircleItems[6].level}%</span>
                    </div>
                </motion.div>

                {/* SQLite - Bottom Right */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, y: [0, -15, 0] }}
                    transition={{ opacity: { delay: 1.1, duration: 0.5 }, y: { duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 1.3 } }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md hover:border-white/20 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                    style={{ top: "90%", right: "25%" }}
                    onClick={() => setSelectedSkill(outerCircleItems[7])}
                >
                    <div className="opacity-90">{outerCircleItems[7].icon}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-100/90">{outerCircleItems[7].name}</span>
                        <span className="text-xs font-bold text-primary">{outerCircleItems[7].level}%</span>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Skills Layout - Grid below orbit */}
            <div className="flex md:hidden flex-wrap justify-center gap-3 px-4 pt-0 pb-8 z-20">
                {[...innerCircleItems, ...outerCircleItems].map((skill, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md active:bg-black/60"
                        onClick={() => setSelectedSkill(skill)}
                    >
                        <div className="opacity-90">{skill.icon}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-purple-100/90 truncate max-w-[80px]">{skill.name}</span>
                            <span className="text-[10px] font-bold text-primary">{skill.level}%</span>
                        </div>
                    </motion.div>
                ))}
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

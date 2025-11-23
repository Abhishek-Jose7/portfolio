"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface FlippableBentoCardProps {
    className?: string;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    header: React.ReactNode;
    icon?: React.ReactNode;
}

export function FlippableBentoCard({
    className,
    title,
    description,
    header,
    icon,
}: FlippableBentoCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped((prev) => !prev);
    };

    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 perspective-1000 cursor-pointer relative",
                className
            )}
            onClick={handleFlip}
        >
            <div className="relative w-full h-full preserve-3d transition-transform duration-500" style={{ transformStyle: "preserve-3d" }}>
                <motion.div
                    className="relative w-full h-full"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front Face - Minimal Title Only */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-black border border-transparent dark:border-white/[0.2] rounded-xl flex items-center justify-center p-4" style={{ backfaceVisibility: "hidden" }}>
                        <div className="text-center">
                            <div className="mb-2 text-neutral-500 dark:text-neutral-400 scale-125">{icon}</div>
                            <h3 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-widest">
                                {title}
                            </h3>
                            <p className="text-xs text-neutral-400 mt-2 opacity-0 group-hover/bento:opacity-100 transition-opacity">
                                Click to Reveal
                            </p>
                        </div>
                    </div>

                    {/* Back Face - Rich Content */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden bg-black rounded-xl overflow-hidden border border-white/10"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                        <div className="flex flex-col h-full">
                            {/* Visual Header (3D/Interactive) */}
                            <div className="flex-1 relative overflow-hidden">
                                {header}
                            </div>

                            {/* Description */}
                            <div className="p-4 bg-black/80 backdrop-blur-sm border-t border-white/10">
                                <p className="font-sans font-normal text-neutral-300 text-sm leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

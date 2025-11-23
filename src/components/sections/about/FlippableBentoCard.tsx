"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Maximize2, X } from "lucide-react";

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
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFlip = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped((prev) => !prev);
    };

    const handleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(true);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(false);
    };

    // Lock body scroll when expanded
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isExpanded]);

    return (
        <>
            <div
                className={cn(
                    "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 perspective-1000 cursor-pointer relative",
                    className
                )}
                onClick={handleFlip}
            >
                {/* Expand button */}
                <button
                    onClick={handleExpand}
                    className="absolute bottom-3 right-3 z-30 p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110"
                    aria-label="Expand card"
                >
                    <Maximize2 className="w-4 h-4 text-white" />
                </button>

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

            {/* Full-screen expanded view */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
                        onClick={handleClose}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl h-[85vh] bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all duration-200 group"
                                aria-label="Close expanded view"
                            >
                                <X className="w-5 h-5 text-white/70 group-hover:text-white" />
                            </button>

                            {/* Content */}
                            <div className="flex flex-col h-full">
                                {/* Header section with title */}
                                <div className="p-6 border-b border-white/10 bg-gradient-to-b from-black/50 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div className="text-primary scale-125">{icon}</div>
                                        <h2 className="text-3xl font-bold text-white">{title}</h2>
                                    </div>
                                </div>

                                {/* Visual content (takes most space) */}
                                <div className="flex-1 relative overflow-hidden">
                                    {header}
                                </div>

                                {/* Description at bottom */}
                                <div className="p-6 bg-gradient-to-t from-black/80 to-transparent border-t border-white/10">
                                    <p className="text-neutral-200 text-lg leading-relaxed max-w-4xl">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

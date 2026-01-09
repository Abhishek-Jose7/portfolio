"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className={cn(
                "group/bento [perspective:1000px] touch-auto",
                "row-span-1 rounded-2xl justify-between flex flex-col relative h-full min-h-[16rem] md:min-h-0 active:scale-[0.98] transition-transform",
                className
            )}
            onClick={handleFlip}
        >
            <motion.div
                className="relative h-full w-full [transform-style:preserve-3d] cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1]
                }}
            >
                {/* Front Face */}
                <div
                    className={cn(
                        "absolute inset-0 overflow-hidden rounded-2xl border [backface-visibility:hidden]",
                        "bg-white dark:bg-black border-transparent dark:border-white/[0.2] flex items-center justify-center p-4",
                        "shadow-input dark:shadow-none"
                    )}
                >
                    <div className="text-center pointer-events-none">
                        <div className="mb-2 text-neutral-500 dark:text-neutral-400 scale-125">{icon}</div>
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-widest">
                            {title}
                        </h3>
                        <p className="text-[10px] md:text-xs text-neutral-400 mt-2 opacity-100 md:opacity-100 transition-opacity">
                            {isFlipped ? "Tap to Return" : "Tap to Reveal"}
                        </p>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className={cn(
                        "absolute inset-0 h-full w-full overflow-hidden rounded-2xl border bg-black/90 px-0 py-0 text-slate-200 [backface-visibility:hidden]",
                        "shadow-input dark:shadow-none border-white/[0.2]"
                    )}
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <div className="flex flex-col h-full pointer-events-none">
                        {/* Visual Header */}
                        <div className="flex-1 relative overflow-hidden">
                            {header}
                        </div>

                        {/* Description */}
                        <div className="p-4 bg-black/80 backdrop-blur-sm border-t border-white/10 text-left">
                            <p className="font-sans font-normal text-neutral-300 text-sm leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

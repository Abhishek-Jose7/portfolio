"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

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
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleClick = () => {
        if (isMobile) {
            setIsFlipped((prev) => !prev);
        }
    };

    return (
        <div
            className={cn(
                "group/bento [perspective:1000px] touch-manipulation select-none",
                "row-span-1 rounded-xl justify-between flex flex-col space-y-4 cursor-pointer relative h-full transition-all active:scale-[0.98]",
                className
            )}
            onClick={handleClick}
        >
            <div
                className={cn(
                    "relative h-full w-full min-h-[16rem] md:min-h-0 rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] will-change-transform",
                    // Desktop: hover only
                    "md:group-hover/bento:[transform:rotateY(180deg)]",
                    // Mobile: state only
                    isMobile && isFlipped && "[transform:rotateY(180deg)]",
                    "shadow-input dark:shadow-none bg-white dark:bg-black border border-transparent dark:border-white/[0.2]"
                )}
            >
                {/* Front Face */}
                <div
                    className={cn(
                        "absolute inset-0 size-full overflow-hidden rounded-2xl border [backface-visibility:hidden] -webkit-backface-visibility-hidden z-20",
                        "bg-white dark:bg-black border-transparent dark:border-white/[0.2] flex items-center justify-center p-4",
                    )}
                >
                    <div className="text-center pointer-events-none">
                        <div className="mb-2 text-neutral-500 dark:text-neutral-400 scale-125">{icon}</div>
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-widest">
                            {title}
                        </h3>
                        <p className="text-[10px] md:text-xs text-neutral-400 mt-2 opacity-100 md:opacity-0 group-hover/bento:opacity-100 transition-opacity">
                            {isMobile ? (isFlipped ? "Tap to return" : "Tap to reveal") : "Hover to reveal"}
                        </p>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className={cn(
                        "absolute inset-0 h-full w-full overflow-hidden rounded-2xl border bg-black/90 px-0 py-0 text-slate-200 [backface-visibility:hidden] -webkit-backface-visibility-hidden [transform:rotateY(180deg)] z-10",
                    )}
                >
                    <div className="flex flex-col h-full">
                        {/* Visual Header (3D/Interactive) */}
                        <div className="flex-1 relative overflow-hidden pointer-events-none">
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
            </div>
        </div>
    );
}

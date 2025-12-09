"use client";

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
    return (
        <div
            className={cn(
                "group/bento [perspective:1000px]",
                "row-span-1 rounded-xl justify-between flex flex-col space-y-4 cursor-pointer relative h-full hover:z-50",
                className
            )}
        >
            <div
                className={cn(
                    "relative h-full w-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]",
                    "group-hover/bento:[transform:rotateY(180deg)] shadow-input dark:shadow-none bg-white dark:bg-black border border-transparent dark:border-white/[0.2]"
                )}
            >
                {/* Front Face */}
                <div
                    className={cn(
                        "absolute size-full overflow-hidden rounded-2xl border [backface-visibility:hidden]",
                        "bg-white dark:bg-black border-transparent dark:border-white/[0.2] flex items-center justify-center p-4",
                    )}
                >
                    <div className="text-center">
                        <div className="mb-2 text-neutral-500 dark:text-neutral-400 scale-125">{icon}</div>
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-widest">
                            {title}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-2 opacity-0 group-hover/bento:opacity-100 transition-opacity">
                            Hover to Reveal
                        </p>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className={cn(
                        "absolute h-full w-full overflow-hidden rounded-2xl border bg-black/80 px-0 py-0 text-slate-200 [backface-visibility:hidden]",
                        "[transform:rotateY(180deg)]"
                    )}
                >
                    <div className="flex flex-col h-full">
                        {/* Visual Header (3D/Interactive) */}
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
            </div>
        </div>
    );
}

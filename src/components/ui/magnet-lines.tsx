"use client";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MagnetLinesProps {
    rows?: number;
    columns?: number;
    containerClassName?: string;
    lineClassName?: string;
    lineStyle?: React.CSSProperties;
}

export const MagnetLines = ({
    rows = 9,
    columns = 9,
    containerClassName,
    lineClassName,
    lineStyle,
}: MagnetLinesProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll(".magnet-line");

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            items.forEach((item) => {
                const itemRect = (item as HTMLElement).getBoundingClientRect();
                const itemCenterX = itemRect.left + itemRect.width / 2 - rect.left;
                const itemCenterY = itemRect.top + itemRect.height / 2 - rect.top;

                const angle = Math.atan2(mouseY - itemCenterY, mouseX - itemCenterX);
                const rotation = angle * (180 / Math.PI);

                (item as HTMLElement).style.transform = `rotate(${rotation}deg)`;
            });
        };

        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const totalItems = rows * columns;

    return (
        <div
            ref={containerRef}
            className={cn("grid gap-4 w-full h-full", containerClassName)}
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {[...Array(totalItems)].map((_, i) => (
                <div key={i} className="flex items-center justify-center w-full h-full">
                    <div
                        className={cn(
                            "magnet-line w-8 h-1 bg-white/20 rounded-full transition-transform duration-75 ease-out will-change-transform",
                            lineClassName
                        )}
                        style={lineStyle}
                    />
                </div>
            ))}
        </div>
    );
};

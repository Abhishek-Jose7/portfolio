"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CircularTextProps {
    text: string;
    radius?: number;
    className?: string;
    duration?: number;
}

export const CircularText = ({
    text,
    radius = 100,
    className,
    duration = 20,
}: CircularTextProps) => {
    const characters = text.split("");
    const angleStep = 360 / characters.length;

    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
            className={cn("relative flex items-center justify-center rounded-full", className)}
            style={{ width: radius * 2, height: radius * 2 }}
        >
            {characters.map((char, i) => (
                <span
                    key={i}
                    className="absolute text-xs font-mono font-bold text-white/50 uppercase"
                    style={{
                        transform: `rotate(${i * angleStep}deg) translate(0, -${radius}px)`,
                        transformOrigin: "center center", // Ensure rotation happens around the center of the circle
                        left: "50%",
                        top: "50%",
                        marginTop: "-0.5em", // Center vertically
                        marginLeft: "-0.5em", // Center horizontally (approx)
                        width: "1em",
                        height: "1em",
                        textAlign: "center",
                    }}
                >
                    {char}
                </span>
            ))}
        </motion.div>
    );
};

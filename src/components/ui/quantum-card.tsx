"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const QuantumCard = ({
    state1,
    state2,
    className,
}: {
    state1: React.ReactNode;
    state2: React.ReactNode;
    className?: string;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                "relative w-full h-64 rounded-xl overflow-hidden bg-black/50 border border-white/10 backdrop-blur-sm group cursor-pointer",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                {!isHovered ? (
                    <motion.div
                        key="state1"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center p-6"
                    >
                        {state1}
                        {/* Glitch Overlay */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 mix-blend-overlay animate-pulse" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="state2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
                    >
                        {state2}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quantum Noise */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

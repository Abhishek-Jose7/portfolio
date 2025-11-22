"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BlackHole = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div className={cn("relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96", className)}>
            {/* Accretion Disk - Outer Glow */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-20 blur-3xl"
            />

            {/* Accretion Disk - Inner Ring */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-4 border-transparent border-t-cyan-500/50 border-r-purple-500/50 blur-sm"
            />

            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border-2 border-transparent border-b-white/30 border-l-white/30"
            />

            {/* Event Horizon */}
            <div className="absolute inset-16 bg-black rounded-full shadow-[0_0_50px_rgba(0,0,0,1)] z-10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-neutral-900 to-black opacity-90" />
                {children}
            </div>

            {/* Photon Ring */}
            <div className="absolute inset-16 rounded-full border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)] pointer-events-none" />
        </div>
    );
};

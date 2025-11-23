"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    variant?: "primary" | "secondary" | "outline"
}

export function Button3D({ children, onClick, className, variant = "primary", ...props }: Button3DProps) {
    const variants = {
        primary: {
            front: "bg-blue-600 text-white",
            edge: "bg-blue-800",
            shadow: "bg-blue-900/40",
        },
        secondary: {
            front: "bg-purple-600 text-white",
            edge: "bg-purple-800",
            shadow: "bg-purple-900/40",
        },
        outline: {
            front: "bg-zinc-800 text-white border border-zinc-600",
            edge: "bg-zinc-900",
            shadow: "bg-black/40",
        },
    }

    const currentVariant = variants[variant]

    return (
        <div className={cn("relative group cursor-pointer", className)}>
            <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={onClick}
                className="relative z-10 block w-full"
                {...props}
            >
                {/* Button Front */}
                <span className={cn(
                    "block px-8 py-4 rounded-xl font-bold text-lg tracking-wide relative z-10 border-t border-white/20",
                    currentVariant.front
                )}>
                    {children}
                </span>

                {/* 3D Edge/Depth */}
                <span className={cn(
                    "absolute inset-0 rounded-xl translate-y-[6px] z-0 transition-transform duration-100 ease-out group-hover:translate-y-[10px] group-active:translate-y-[2px]",
                    currentVariant.edge
                )} />
            </motion.button>

            {/* Shadow */}
            <div className={cn(
                "absolute inset-0 rounded-xl translate-y-[12px] blur-md transition-all duration-300 group-hover:translate-y-[16px] group-hover:blur-lg opacity-60 z-[-1]",
                currentVariant.shadow
            )} />
        </div>
    )
}

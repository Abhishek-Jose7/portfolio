"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid } from "@/components/ui/bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconSchool,
} from "@tabler/icons-react";
import portfolioData from "@/lib/portfolio-data.json";
import { TechFloatingIcons } from "./TechFloatingIcons";
import { KineticPhilosophy } from "./KineticPhilosophy";
import { NeuralNetwork } from "./NeuralNetwork";
import { motion } from "framer-motion";
import { FlippableBentoCard } from "./FlippableBentoCard";
import CSSBoxDemo from "@/components/fancy/demos/CSSBoxDemo";

export function AboutBento() {
    return (
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] gap-8 md:gap-3">
            {items.slice(0, 3).map((item, i) => (
                <FlippableBentoCard
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={item.className}
                    icon={item.icon}
                />
            ))}
            {/* The 3D Box - Standalone on Desktop, Hidden on Mobile */}
            <div className="hidden md:flex md:col-span-2 relative h-full w-full items-center justify-center p-8 active:cursor-grabbing cursor-grab">
                <CSSBoxDemo />
            </div>
        </BentoGrid>
    );
}

const items = [
    {
        title: "The Engineer",
        description: "I don't just write code; I design systems. My passion lies in building scalable, resilient architectures that stand the test of time. I specialize in full-stack development with a focus on performance and user experience.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.3),transparent_50%)]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <div className="relative z-20 text-6xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
                    &lt;/&gt;
                </div>
            </div>
        ),
        className: "md:col-span-2",
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Philosophy",
        description: "Simplicity is the ultimate sophistication. I believe in writing code that is clean, readable, and maintainable above all else. 'Code is poetry' is not just a phrase, it's a standard.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden border border-white/10">
                <KineticPhilosophy />
            </div>
        ),
        className: "md:col-span-1",
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Current Focus",
        description: "Exploring the depths of AI and distributed systems. I'm currently deep diving into Agentic AI workflows, Large Language Models, and building tools that empower developers to do more with less.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-black relative overflow-hidden border border-white/10 pointer-events-none">
                <TechFloatingIcons />
            </div>
        ),
        className: "md:col-span-1",
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
];

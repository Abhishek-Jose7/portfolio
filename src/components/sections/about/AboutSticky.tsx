"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";
import portfolioData from "@/lib/portfolio-data.json";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";

const content = [
    {
        title: "The Origin Story",
        description: (
            <>
                <p>
                    It started with a simple `console.log("Hello World")`. I was fascinated by how lines of text could transform into living, breathing applications.
                </p>
                <p className="mt-4">
                    From hacking together static HTML pages to architecting complex distributed systems, my journey has been defined by one thing: <strong>curiosity</strong>.
                </p>
                <p className="mt-4">
                    I'm {portfolioData.personal.name}, a {portfolioData.personal.title} who believes that code is the closest thing we have to magic.
                </p>
            </>
        ),
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                <div className="font-mono text-xs md:text-sm p-4">
                    <p className="animate-pulse">{`> Initializing system...`}</p>
                    <p className="animate-pulse delay-75">{`> Loading modules...`}</p>
                    <p className="animate-pulse delay-150">{`> User: ${portfolioData.personal.name}`}</p>
                    <p className="animate-pulse delay-300">{`> Status: Ready to build.`}</p>
                    <div className="mt-4 p-2 bg-black/20 rounded border border-white/20">
                        <code>
                            <span className="text-pink-300">const</span> <span className="text-blue-300">passion</span> = <span className="text-yellow-300">true</span>;
                        </code>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "The Philosophy",
        description: (
            <>
                <p>
                    <strong>Simplicity is the ultimate sophistication.</strong>
                </p>
                <p className="mt-4">
                    I don't just write code; I design systems. My goal is to build software that is resilient, scalable, and intuitive.
                </p>
                <p className="mt-4">
                    I believe in:
                    <ul className="list-disc list-inside mt-2 opacity-80">
                        <li>Clean, readable code</li>
                        <li>User-centric design</li>
                        <li>Performance as a feature</li>
                    </ul>
                </p>
            </>
        ),
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <EtherealShadow
                    sizing="fill"
                    color="rgba(236, 72, 153, 0.6)"
                    animation={{
                        scale: 80,
                        speed: 30
                    }}
                >
                    <div className="flex items-center justify-center w-full h-full">
                        <span className="text-6xl">✨</span>
                    </div>
                </EtherealShadow>
            </div>
        ),
    },
    {
        title: "The Stack",
        description: (
            <>
                <p>
                    My toolkit is modern, robust, and ever-evolving. I specialize in the <strong>React ecosystem</strong> but I'm always exploring new frontiers.
                </p>
                <p className="mt-4">
                    Currently, I'm deep diving into <strong>Agentic AI</strong> and building tools that empower developers to do more with less.
                </p>
                <div className="flex gap-2 mt-4 flex-wrap">
                    {["Next.js", "TypeScript", "Tailwind", "Node.js", "AI/LLMs"].map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-full bg-white/10 text-xs border border-white/20">
                            {tag}
                        </span>
                    ))}
                </div>
            </>
        ),
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div key={i} className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="w-6 h-6 bg-white/40 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
];

export function AboutSticky() {
    return (
        <div className="py-10">
            <StickyScroll content={content} />
        </div>
    );
}

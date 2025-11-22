"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Spotlight } from "@/components/ui/spotlight-card";
import portfolioData from "@/lib/portfolio-data.json";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";

export function AboutSpotlight() {
    return (
        <TracingBeam className="px-6">
            <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                {content.map((item, index) => (
                    <div key={`content-${index}`} className="mb-10">
                        <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4 border border-white/10">
                            {item.badge}
                        </h2>

                        <div className="mb-6">
                            <Spotlight className="p-6 md:p-8 rounded-3xl border-white/10 bg-black/50 backdrop-blur-md">
                                <div className="relative z-10">
                                    <p className={item.className}>
                                        {item.title}
                                    </p>
                                    <div className="text-sm  prose prose-sm dark:prose-invert text-neutral-400 mt-4">
                                        {item.description}
                                    </div>

                                    {item.image && (
                                        <div className="mt-6 rounded-lg overflow-hidden border border-white/10 relative">
                                            <img
                                                src={item.image}
                                                alt="blog thumbnail"
                                                className="object-cover w-full h-64"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        </div>
                                    )}

                                    {item.extra && (
                                        <div className="mt-6">
                                            {item.extra}
                                        </div>
                                    )}
                                </div>
                            </Spotlight>
                        </div>
                    </div>
                ))}
            </div>
        </TracingBeam>
    );
}

const content = [
    {
        title: "The Origin Story",
        badge: "Chapter 01",
        description: (
            <>
                <p>
                    I started coding because I wanted to build things that felt <em>alive</em>.
                    My journey began with simple scripts and static pages, but quickly evolved into a fascination with
                    complex systems and interactive experiences.
                </p>
                <p className="mt-4">
                    I'm {portfolioData.personal.name}, a {portfolioData.personal.title} based in {portfolioData.personal.location}.
                    For me, code isn't just about function—it's about crafting an experience that feels seamless and magical.
                </p>
            </>
        ),
        className: "text-3xl font-bold text-white",
        image: portfolioData.personal.avatar,
        extra: (
            <div className="flex items-center gap-4 mt-4">
                <div className="flex -space-x-4 rtl:space-x-reverse">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-neutral-800 flex items-center justify-center text-xs text-white/50">
                            {i === 0 ? "JS" : i === 1 ? "TS" : "AI"}
                        </div>
                    ))}
                </div>
                <p className="text-xs text-neutral-500">Core Technologies</p>
            </div>
        )
    },
    {
        title: "The Philosophy",
        badge: "Chapter 02",
        description: (
            <>
                <p>
                    I believe in <strong>Simplicity by Design</strong>. The best systems are the ones that hide their complexity
                    behind intuitive interfaces. Whether it's a distributed backend or a fluid frontend animation,
                    the goal is always the same: reduce friction.
                </p>
                <p className="mt-4">
                    "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
                </p>
            </>
        ),
        className: "text-3xl font-bold text-white",
    },
    {
        title: "The Toolkit",
        badge: "Chapter 03",
        description: (
            <>
                <p>
                    My weapon of choice is the <strong>Modern Web Stack</strong>. I specialize in the Next.js ecosystem,
                    leveraging the power of React Server Components, Tailwind CSS for rapid styling, and Framer Motion for
                    that extra polish.
                </p>
                <p className="mt-4">
                    Currently, I'm deep diving into <strong>Agentic AI</strong>—building systems where LLMs don't just chat,
                    but actually <em>do</em> things.
                </p>
            </>
        ),
        className: "text-3xl font-bold text-white",
        extra: (
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="text-white font-semibold mb-1">Frontend</h4>
                    <p className="text-xs text-neutral-400">Next.js, React, Tailwind, Framer</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="text-white font-semibold mb-1">Backend</h4>
                    <p className="text-xs text-neutral-400">Node.js, PostgreSQL, Redis, Docker</p>
                </div>
            </div>
        )
    },
];

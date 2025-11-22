"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from "@/components/ui/text-reveal-card";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { AvatarScene } from "@/components/ui/3d-avatar-scene";
import portfolioData from "@/lib/portfolio-data.json";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

export function AboutUltra3D() {
    return (
        <div className="py-20 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">

                {/* Hero Section with 3D Avatar and Pin */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-20">
                    <div className="w-full md:w-1/2 h-[400px] flex items-center justify-center">
                        <AvatarScene />
                    </div>

                    <div className="w-full md:w-1/2 flex items-center justify-center">
                        <PinContainer
                            title={portfolioData.personal.location}
                            href="https://maps.google.com"
                        >
                            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                                    {portfolioData.personal.name}
                                </h3>
                                <div className="text-base !m-0 !p-0 font-normal">
                                    <span className="text-slate-500 ">
                                        {portfolioData.personal.title}
                                    </span>
                                </div>
                                <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                            </div>
                        </PinContainer>
                    </div>
                </div>

                {/* Interactive Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* Text Reveal Card */}
                    <div className="flex items-center justify-center w-full">
                        <TextRevealCard
                            text="Hover to reveal the truth"
                            revealText="Simplicity is the ultimate sophistication."
                        >
                            <TextRevealCardTitle>
                                The Philosophy
                            </TextRevealCardTitle>
                            <TextRevealCardDescription>
                                I believe in writing code that is clean, readable, and maintainable.
                                Complexity should be hidden, not exposed.
                            </TextRevealCardDescription>
                        </TextRevealCard>
                    </div>

                    {/* 3D Card for Tech Stack */}
                    <div className="flex items-center justify-center w-full">
                        <CardContainer className="inter-var">
                            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                                <CardItem
                                    translateZ="50"
                                    className="text-xl font-bold text-neutral-600 dark:text-white"
                                >
                                    The Arsenal
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                                >
                                    My weapons of choice for building the future.
                                </CardItem>
                                <CardItem translateZ="100" className="w-full mt-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 p-2 rounded bg-neutral-900 border border-neutral-800">
                                            <SiReact className="text-blue-400" /> <span>React</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 rounded bg-neutral-900 border border-neutral-800">
                                            <SiNextdotjs className="text-white" /> <span>Next.js</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 rounded bg-neutral-900 border border-neutral-800">
                                            <SiTypescript className="text-blue-600" /> <span>TypeScript</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 rounded bg-neutral-900 border border-neutral-800">
                                            <SiTailwindcss className="text-cyan-400" /> <span>Tailwind</span>
                                        </div>
                                    </div>
                                </CardItem>
                                <div className="flex justify-between items-center mt-20">
                                    <CardItem
                                        translateZ={20}
                                        as="button"
                                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                    >
                                        Explore →
                                    </CardItem>
                                    <CardItem
                                        translateZ={20}
                                        as="button"
                                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                    >
                                        View Projects
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}

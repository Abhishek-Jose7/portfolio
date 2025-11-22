"use client"

import { motion } from "framer-motion"
import { WavyBackground } from "@/components/ui/wavy-background"
import DecryptedText from "@/components/ui/DecryptedText"
import { EtherealShadow } from "@/components/ui/ethereal-shadow"
import portfolioData from "@/lib/portfolio-data.json"

export function AboutHero() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl border border-border/50">
      <WavyBackground 
        className="max-w-4xl mx-auto pb-40"
        containerClassName="h-full"
        waveWidth={50}
        backgroundFill="transparent"
        blur={10}
        speed="slow"
        waveOpacity={0.3}
        colors={["#3b82f6", "#8b5cf6", "#ec4899"]}
      >
        <div className="flex flex-col items-center justify-center gap-8 z-10 relative">
          {/* Avatar with Ethereal Glow */}
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <EtherealShadow
              sizing="fill"
              color="rgba(139, 92, 246, 0.6)"
              animation={{
                scale: 80,
                speed: 50
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 relative z-10">
                <img 
                  src={portfolioData.personal.avatar} 
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </EtherealShadow>
          </div>

          {/* Text Content */}
          <div className="text-center space-y-4 px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              <DecryptedText 
                text={`Hi, I'm ${portfolioData.personal.name}`}
                animateOn="view"
                speed={60}
                maxIterations={15}
                className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
                parentClassName="inline-block"
              />
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-lg mx-auto font-light">
              <DecryptedText 
                text={portfolioData.personal.title}
                animateOn="view"
                speed={40}
                maxIterations={10}
                revealDirection="center"
              />
            </p>
          </div>
        </div>
      </WavyBackground>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Copy, Check, ArrowRight } from "lucide-react"
import portfolioData from "@/lib/portfolio-data.json"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { StarField } from "@/components/ui/star-field"

export function ContactContent() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialLinks = [
    {
      name: "GitHub",
      icon: Icons.gitHub,
      url: portfolioData.social.github,
    },
    {
      name: "LinkedIn",
      icon: Icons.linkedin,
      url: portfolioData.social.linkedin,
    },
    {
      name: "Twitter",
      icon: Icons.twitter,
      url: "https://twitter.com/abhishekjose7",
    },
    {
      name: "Instagram",
      icon: Icons.instagram,
      url: portfolioData.social.instagram,
    }
  ]

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden rounded-3xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/5 to-blue-900/5" />
      <StarField count={150} speed={0.02} starColor="#8b5cf6" />

      <div className="relative z-10 w-full max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Let's Connect
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Open for collaborations, opportunities, or just a good tech conversation.
            </p>
          </div>

          {/* Minimalist Glass Card */}
          <div className="relative rounded-[2rem] bg-gradient-to-br from-white/20 via-white/10 to-white/5 p-[1px] shadow-[0_4px_16px_0_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.2)]">
            <div className="relative rounded-[2rem] bg-black/40 backdrop-blur-3xl p-8 md:p-10 space-y-8">

              {/* Email & Location */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email</div>
                      <div className="text-white font-medium break-all md:break-normal">{portfolioData.personal.email}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyEmail}
                    className="rounded-full hover:bg-white/20 text-muted-foreground hover:text-white shrink-0"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Based In</div>
                    <div className="text-white font-medium">{portfolioData.personal.location}</div>
                  </div>
                </div>
              </div>

              {/* Socials Row */}
              <div className="flex justify-center gap-4 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
                    title={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* CTA */}
              <Button
                className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 font-medium text-base shadow-lg shadow-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => window.location.href = `mailto:${portfolioData.personal.email}`}
              >
                Say Hello <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

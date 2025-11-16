"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import portfolioData from "@/lib/portfolio-data.json"

export function AboutContent() {
  const messages = [
    {
      type: "assistant",
      content: `Hey! Great to meet you. I'm ${portfolioData.personal.name}, though you can just call me Abhishek.`,
      delay: 0
    },
    {
      type: "assistant", 
      content: `I'm a ${portfolioData.personal.title} based in ${portfolioData.personal.location}. I build things on the web—mostly apps that need to work fast, scale well, and not break when people actually use them.`,
      delay: 0.1
    },
    {
      type: "image",
      src: portfolioData.personal.avatar,
      caption: "That's me (probably with coffee nearby)",
      delay: 0.2
    },
    {
      type: "card",
      title: "Quick Identity Check",
      items: [
        { label: "Name", value: portfolioData.personal.name },
        { label: "Role", value: portfolioData.personal.title },
        { label: "Specialization", value: "Full-stack development, AI/ML integration, scalable architectures" },
        { label: "Approach", value: "Ship fast, iterate faster, keep it simple" },
        { label: "Philosophy", value: "Code is for humans, performance is for users" }
      ],
      delay: 0.3
    },
    {
      type: "assistant",
      content: `**My Background & Journey**\n\nI got into coding because I wanted to build things that mattered. Started with simple websites, then APIs, then full systems. Each project taught me something new about what works (and what definitely doesn't).\n\nWhat drives me? Seeing something I built actually help someone. Whether it's an app handling 50k+ users or a tool that saves developers hours of work—that's the good stuff.\n\nI've learned that the best code isn't the most clever. It's the code that solves the problem clearly, runs fast, and doesn't make your teammates want to quit.`,
      delay: 0.4
    },
    {
      type: "assistant",
      content: `**What I'm Good At**\n\n• Building full-stack applications that scale\n• Making APIs that don't mysteriously break at 3 AM\n• Frontend work that feels smooth and looks clean\n• Architecting systems that grow without falling apart\n• Debugging production issues (unfortunately, lots of practice here)\n• Working with teams to ship things that matter`,
      delay: 0.5
    },
    {
      type: "card",
      title: "Quick Facts",
      items: [
        { icon: "📍", label: "Location", value: portfolioData.personal.location },
        { icon: "💬", label: "Languages", value: "English, Hindi, Malayalam" },
        { icon: "⚡", label: "Favorite Stack", value: "Next.js + TypeScript + Tailwind" },
        { icon: "🛠️", label: "Tools I Live In", value: "VS Code, Figma, Linear, Vercel" },
        { icon: "🎵", label: "Coding Music", value: "Lo-fi beats or complete silence" },
        { icon: "☕", label: "Coffee Count", value: `${portfolioData.stats.coffeeConsumed} cups (and counting)` },
        { icon: "🎯", label: "My Values", value: "Clarity, speed, empathy, learning" }
      ],
      delay: 0.6
    },
    {
      type: "assistant",
      content: `**The Journey So Far**\n\nHere's a quick timeline of key moments:`,
      delay: 0.7
    },
    {
      type: "timeline",
      events: [
        { year: "2019", title: "Started Professional Journey", desc: "First real dev job, learned more in 6 months than 2 years of courses" },
        { year: "2020", title: "Shipped First Major Product", desc: "Built an analytics platform from scratch. It's still running." },
        { year: "2021", title: "Went Full-Stack", desc: "Stopped being 'just frontend' or 'just backend'—embraced the whole thing" },
        { year: "2022", title: "Led Team Projects", desc: "Started mentoring others, realized teaching is the best way to learn" },
        { year: "2023", title: "Hit 50k+ Users", desc: "AI SaaS platform crossed major milestone, learned about scale the hard way" },
        { year: "2024", title: "Open Source Contributions", desc: `Gave back to the community—${portfolioData.stats.openSourceContributions}+ contributions` },
        { year: "2025", title: "Today", desc: "Still building, still learning, still shipping" }
      ],
      delay: 0.8
    },
    {
      type: "assistant",
      content: `**What's Next**\n\nRight now I'm focused on:\n• Building AI-powered tools that actually solve real problems\n• Learning more about distributed systems and performance optimization\n• Contributing to open source projects I believe in\n• Mentoring junior developers (they ask great questions)\n• Exploring the intersection of AI and developer tools`,
      delay: 0.9
    },
    {
      type: "assistant",
      content: `**My Goals**\n\nShort term: Ship products that people love using\n\nLong term: Build systems that scale, mentor great developers, contribute something meaningful to the tech community\n\nPersonal: Never stop learning, stay curious, and remember why I started coding in the first place`,
      delay: 1.0
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      caption: "My typical workspace (organized chaos)",
      delay: 1.1
    },
    {
      type: "assistant",
      content: `That's the overview! Feel free to ask me anything else—about projects I've built, tech I work with, or just how I approach problems. I'm here to chat.`,
      delay: 1.2
    }
  ];

  return (
    <div className="space-y-4">
      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: msg.delay, duration: 0.3 }}
        >
          {msg.type === "assistant" && (
            <div className="flex gap-3 px-4 py-3 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex-1 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">{msg.content}</p>
              </div>
            </div>
          )}

          {msg.type === "image" && (
            <div className="px-4 py-2">
              <div className="rounded-lg overflow-hidden glass">
                <img 
                  src={msg.src} 
                  alt={msg.caption} 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground p-3 text-center italic">{msg.caption}</p>
              </div>
            </div>
          )}

          {msg.type === "card" && (
            <div className="px-4">
              <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{msg.title}</h3>
                <div className="space-y-3">
                  {msg.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      {item.icon && <span className="text-lg flex-shrink-0">{item.icon}</span>}
                      <div className="flex-1">
                        {item.label && <span className="text-sm font-medium text-muted-foreground">{item.label}: </span>}
                        <span className="text-sm">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {msg.type === "timeline" && (
            <div className="px-4">
              <div className="glass rounded-lg p-6">
                <div className="space-y-4">
                  {msg.events.map((event: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-primary">{event.year}</span>
                        </div>
                        {i < msg.events.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

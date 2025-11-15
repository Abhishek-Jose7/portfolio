import { NextRequest, NextResponse } from "next/server"
import portfolioData from "@/lib/portfolio-data.json"

// Store conversation history (in production, use a database)
const conversationHistory = new Map<string, Array<{ role: string; content: string }>>()

type Persona = "professional" | "casual" | "technical"

function applyPersona(content: string, persona: Persona): string {
  switch (persona) {
    case "professional":
      // More formal, business-oriented
      return content
        .replace(/I'm /g, "I am ")
        .replace(/don't/g, "do not")
        .replace(/can't/g, "cannot")
        .replace(/won't/g, "will not")
        .replace(/!/g, ".")
        .replace(/😊|😅|🎉|🤫/g, "")
    
    case "casual":
      // Friendly and conversational (default)
      return content
    
    case "technical":
      // More technical depth, less fluff
      const technicalContent = content
        .replace(/I'm really excited/gi, "I've implemented")
        .replace(/I'd love to/gi, "I can")
        .replace(/Great question!/gi, "")
        .replace(/Honestly,/gi, "")
      return technicalContent + "\n\n💡 **Technical Details**: For deeper implementation specifics, architecture decisions, or code examples, feel free to ask!"
    
    default:
      return content
  }
}

function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Project queries
  if (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("built")) {
    return "projects"
  }
  
  // Skills queries
  if (lowerMessage.includes("skill") || lowerMessage.includes("tech") || lowerMessage.includes("language") || lowerMessage.includes("framework")) {
    return "skills"
  }
  
  // Experience queries
  if (lowerMessage.includes("experience") || lowerMessage.includes("worked") || lowerMessage.includes("job") || lowerMessage.includes("company")) {
    return "experience"
  }
  
  // Education queries
  if (lowerMessage.includes("education") || lowerMessage.includes("university") || lowerMessage.includes("degree") || lowerMessage.includes("study")) {
    return "education"
  }
  
  // Achievement queries
  if (lowerMessage.includes("achievement") || lowerMessage.includes("award") || lowerMessage.includes("recognition") || lowerMessage.includes("accomplishment")) {
    return "achievements"
  }
  
  // Timeline queries
  if (lowerMessage.match(/\b(2019|2020|2021|2022|2023|2024|2025)\b/)) {
    return "timeline"
  }
  
  // About queries
  if (lowerMessage.includes("who") || lowerMessage.includes("about") || lowerMessage.includes("yourself")) {
    return "about"
  }
  
  // Philosophy/approach
  if (lowerMessage.includes("philosophy") || lowerMessage.includes("approach") || lowerMessage.includes("methodology")) {
    return "philosophy"
  }
  
  // Contact
  if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email") || lowerMessage.includes("hire")) {
    return "contact"
  }
  
  return "general"
}

function generateResponse(intent: string, message: string): string {
  const { personal, projects, skills, experience, education, achievements, stats } = portfolioData
  
  switch (intent) {
    case "projects":
      const featuredProjects = projects.filter(p => p.featured)
      return `I've built some stuff I'm genuinely proud of. Here are the projects that taught me the most:

${featuredProjects.slice(0, 3).map((p, i) => `**${i + 1}. ${p.title}** 🚀
${p.description}

The real challenge? ${p.problem.toLowerCase()}. So I ${p.approach.toLowerCase()}

Results: ${p.results}

Stack: ${p.tags.slice(0, 5).join(", ")}
${p.demo ? `🔗 [Live demo](${p.demo})` : ""}
`).join("\n---\n\n")}

Each of these taught me something different about building at scale. Want to dig into any particular one?`

    case "skills":
      return `I've been building software long enough to have strong opinions about tools (and I'm always ready to change them).

**Frontend** 🎨
${skills.frontend.slice(0, 3).map(s => s.name).join(", ")} are my go-to. I've shipped React apps serving 50k+ users, and Next.js is my default choice for anything user-facing.

**Backend** ⚙️
${skills.backend.slice(0, 3).map(s => s.name).join(", ")} for most things. I like building APIs that are fast, predictable, and easy to debug.

**DevOps & Cloud** ☁️
${skills.devops.slice(0, 3).map(s => s.name).join(", ")}. Infrastructure as code isn't optional—it's the only way to stay sane.

Honestly? The tech stack is just tools. I care more about shipping things that work well and solving actual problems. But I definitely have preferences.

What part of the stack are you curious about?`

    case "experience":
      return `Here's what I've been up to professionally:

${experience.slice(0, 2).map((exp, i) => `**${exp.position} at ${exp.company}** ${exp.current ? "(that's where I am now)" : ""}
${exp.startDate} - ${exp.current ? "Present" : exp.endDate} | ${exp.location}

${exp.description}

Things I'm proud of from this role:
${exp.achievements.slice(0, 3).map(a => `• ${a}`).join("\n")}

Stack: ${exp.technologies.slice(0, 5).join(", ")}
`).join("\n---\n\n")}

Every role has taught me something valuable - not just technically, but about collaboration, leadership, and what it takes to ship great products. The learning never stops!

Want to know more about any particular experience?`

    case "education":
      return `Where I studied:

${education.slice(0, 2).map((edu, i) => `**${edu.degree} in ${edu.field}**
🎓 ${edu.institution}
📅 ${edu.startDate} - ${edu.endDate}
${edu.gpa ? `GPA: ${edu.gpa}` : ""}

${edu.description}

Highlights:
${edu.achievements.slice(0, 3).map(a => `• ${a}`).join("\n")}
`).join("\n---\n\n")}

School gave me the fundamentals, but honestly, building real projects taught me way more about how to actually solve problems.`

    case "achievements":
      return `Some things I'm proud of:

${achievements.slice(0, 3).map((ach, i) => `**${ach.title}**
${ach.date} | ${ach.category}
${ach.description}
`).join("\n---\n\n")}

Honestly though, awards are cool but what really matters is impact. ${stats.happyClients}+ clients who are happy, apps serving 50k+ users, knowing something I built makes someone's day easier—that's the real win.

**By the numbers:**
• ${stats.yearsOfExperience}+ years shipping code
• ${stats.projectsCompleted}+ projects live in production
• ${stats.openSourceContributions}+ open source contributions
• ${stats.coffeeConsumed} cups of coffee ☕ (yeah, I actually tracked this)

What else do you want to know?`

    case "about":
      return `I'm **${personal.name}**—${personal.title} based in ${personal.location}.

${personal.bio}

**What I actually care about:**
Building things that work and solve real problems. I've shipped an AI platform to 50k+ users, built analytics systems handling millions of events, and learned that the best code is usually the simplest.

**How I work:**
• Keep it simple (complexity kills projects)
• Ship something, then make it better
• Performance matters, always
• Write code humans can read
• Stay curious

**The numbers:**
• ${stats.projectsCompleted}+ projects shipped
• ${stats.openSourceContributions}+ open source contributions
• ${stats.yearsOfExperience}+ years building things
• ${stats.coffeeConsumed} cups of coffee (unfortunately accurate)

I like talking about hard problems and interesting solutions. What's on your mind?`

    case "philosophy":
      return `Good question. Here's what I've learned after shipping a lot of software:

**1. Users don't care about your stack** 🎯
They care if it works and if it's fast. Every decision should make the product better for them, not more impressive in your README.

**2. Fast beats perfect** ⚡
200ms to 40ms response time? 1M+ events per second? Those weren't academic exercises—they were about not wasting people's time. Performance is a feature.

**3. Code is for humans** ✨
You'll read it 10x more than you write it. So will your teammates. Clear names, simple logic, and comments that explain why, not what.

**4. Ship, then iterate** 🚀
The AI platform could've taken 6 months to "perfect." We shipped in 2, learned from real users, and iterated. Six months later, we had 50k users. Perfection would've gotten us nothing.

**5. Stay curious** 📚
The best devs I know are relentlessly curious. They read docs for fun, try weird side projects, and never stop learning.

Real example: Every project I've shipped taught me more than any course ever did.

Want to talk about how this plays out in actual work?`

    case "contact":
      return `Let's talk. Here's how to reach me:

**Email:** ${personal.email}
**Phone:** ${personal.phone}
**Location:** ${personal.location}

**Or find me here:**
🐙 [GitHub](${portfolioData.social.github}) - My code
💼 [LinkedIn](${portfolioData.social.linkedin}) - Work stuff
📸 [Instagram](${portfolioData.social.instagram}) - Occasionally interesting

**What I'm interested in:**
• Hard technical problems
• AI/ML that actually matters
• Open source work
• Speaking gigs
• Consulting or contract work

I usually reply within 24 hours. What are you working on?`

    case "timeline":
      const yearMatch = message.match(/\b(2019|2020|2021|2022|2023|2024|2025)\b/)
      const year = yearMatch ? yearMatch[0] : null
      
      if (year) {
        const expInYear = experience.filter(exp => 
          exp.startDate.startsWith(year) || 
          (exp.endDate && exp.endDate.startsWith(year))
        )
        const projectsInYear = projects.filter(p => p.year.toString() === year)
        
        return `Ah, **${year}** - that was a busy year! Here's what I was up to:

${expInYear.length > 0 ? `**Professionally:**
${expInYear.map(exp => `• **${exp.position}** at ${exp.company}
  ${exp.description}
  
  One of my proudest moments: ${exp.achievements[0]}`).join("\n\n")}` : ""}

${projectsInYear.length > 0 ? `\n**Projects I built:**
${projectsInYear.map(p => `• **${p.title}**
  ${p.description}
  
  Built with: ${p.tags.slice(0, 3).join(", ")}
  Results: ${p.results}`).join("\n\n")}` : ""}

${year === "2019" ? "\nThis was a big year - graduated from UC Berkeley and jumped into the professional world!" : ""}
${year === "2024" || year === "2025" ? "\nOne of my most productive years yet! Lots of exciting projects shipped." : ""}

Want to dig into any of these in more detail?`
      }
      return "I've been building things professionally since 2019! Want to know about a specific year or project?"

    default:
      return `Hey—I'm an AI trained on Abhishek's work and experience. Ask me anything about:

• **Projects** - AI platforms, analytics, marketplaces
• **Skills** - React, Next.js, Node, Python, ML, and more
• **Experience** - What I've built and learned
• **Achievements** - The highlights
• **Contact** - How to reach out

**Good questions to start with:**
• "Show me your best work"
• "What are your strongest skills?"
• "Tell me about your experience"
• "What's your dev philosophy?"

What do you want to know?`
  }
}

function handleSpecialCommand(command: string): string | null {
  switch (command) {
    case "/surprise":
      return `🎉 **Surprise!** Here's a fun fact: I've consumed ${portfolioData.stats.coffeeConsumed} cups of coffee while coding! That's roughly ${Math.round(portfolioData.stats.coffeeConsumed / 365)} cups per day. ☕

Other fun stats:
• Written ${portfolioData.stats.linesOfCode.toLocaleString()}+ lines of code
• Made ${portfolioData.stats.openSourceContributions}+ open source contributions
• Shipped ${portfolioData.stats.projectsCompleted}+ projects
• Made ${portfolioData.stats.happyClients} clients very happy!`

    case "/secret":
      return `🤫 **Secret unlocked!** Here's something not many people know:

I once debugged a production issue at 3 AM that was causing the entire system to crash. After 4 hours of investigating, I discovered it was a single misplaced semicolon in a configuration file. Best debugging session ever! 😅

Also, I learned React by rebuilding Twitter's UI pixel-perfect. Took me 2 weeks but taught me more than any course could!`

    case "/stats":
      return `📊 **Abhishek Jose - By The Numbers**

**Experience:**
• ${portfolioData.stats.yearsOfExperience} years in the industry
• ${portfolioData.stats.projectsCompleted}+ projects completed
• ${portfolioData.stats.happyClients} happy clients

**Technical:**
• ${portfolioData.stats.linesOfCode.toLocaleString()}+ lines of code written
• ${portfolioData.stats.openSourceContributions}+ open source contributions
• ${portfolioData.projects.length} major projects showcased
• ${Object.values(portfolioData.skills).flat().length} technologies mastered

**Impact:**
• 50,000+ active users across platforms
• 1M+ events processed per second
• $5M+ in transactions facilitated
• 99.9% uptime maintained

**Fuel:**
• ${portfolioData.stats.coffeeConsumed} cups of coffee ☕

Still going strong! 💪`

    case "/theme":
      return `🎨 **Theme Command**

Toggle between light and dark mode using the button in the top-right corner!

Fun fact: This entire portfolio is built with:
• Next.js 15
• Tailwind CSS
• Framer Motion for animations
• Glass morphism effects
• ChatGPT-inspired design

It's fully responsive and optimized for performance!`

    case "/tour":
      return `🎯 **Guided Tour - My Best Work**

Let me walk you through my top projects:

**1. AI SaaS Platform** ⭐
My flagship project - serving 50,000+ users with 99.9% uptime. Built from scratch using Next.js, Python, and TensorFlow.
Ask: "Tell me about the AI SaaS Platform"

**2. Real-Time Analytics Dashboard** ⭐
Processing 1M+ events per second with sub-100ms latency. Reduced infrastructure costs by 40%.
Ask: "How did you build the analytics dashboard?"

**3. E-Commerce Marketplace** ⭐
$5M+ in transactions, 10,000+ sellers, 3.2% conversion rate. Complete marketplace solution.
Ask: "Show me the marketplace project"

**Want to dive deeper?**
Just ask about any project, or try these:
• "What's your strongest skill?"
• "Tell me about your experience"
• "Show me your achievements"`

    default:
      return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId = "default", persona = "casual" } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Check for special commands
    if (message.startsWith("/")) {
      const commandResponse = handleSpecialCommand(message)
      if (commandResponse) {
        const personaResponse = applyPersona(commandResponse, persona as Persona)
        return NextResponse.json({
          response: personaResponse,
          suggestions: [
            "Show me your projects",
            "What are your skills?",
            "Tell me about your experience",
          ],
        })
      }
    }

    // Get or create conversation history
    if (!conversationHistory.has(sessionId)) {
      conversationHistory.set(sessionId, [])
    }
    const history = conversationHistory.get(sessionId)!

    // Add user message to history
    history.push({ role: "user", content: message })

    // Detect intent and generate response
    const intent = detectIntent(message)
    const baseResponse = generateResponse(intent, message)
    const response = applyPersona(baseResponse, persona as Persona)

    // Add assistant response to history
    history.push({ role: "assistant", content: response })

    // Keep only last 10 messages
    if (history.length > 10) {
      history.splice(0, history.length - 10)
    }

    // Generate context-aware suggestions
    const suggestions = generateSuggestions(intent)

    return NextResponse.json({
      response,
      suggestions,
      intent,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    )
  }
}

function generateSuggestions(intent: string): string[] {
  const suggestionMap: Record<string, string[]> = {
    projects: [
      "Tell me about the AI SaaS Platform",
      "How did you build the analytics dashboard?",
      "What challenges did you face?",
    ],
    skills: [
      "Compare React vs Vue in your experience",
      "What's your strongest skill?",
      "How do you stay updated with tech?",
    ],
    experience: [
      "What did you learn at TechCorp?",
      "Tell me about your biggest challenge",
      "How do you mentor junior developers?",
    ],
    education: [
      "What did you study at Berkeley?",
      "Tell me about your certifications",
      "How did education help your career?",
    ],
    achievements: [
      "What are you most proud of?",
      "Tell me about your conference talks",
      "Show me your open source work",
    ],
    about: [
      "What's your development philosophy?",
      "Show me your best work",
      "What projects are you working on?",
    ],
    philosophy: [
      "How do you approach new projects?",
      "What's your tech stack preference?",
      "Tell me about your workflow",
    ],
    contact: [
      "How can we collaborate?",
      "What kind of projects interest you?",
      "Are you open to consulting?",
    ],
    general: [
      "Show me your best work",
      "What are your strongest skills?",
      "Tell me your development philosophy",
    ],
  }

  return suggestionMap[intent] || suggestionMap.general
}
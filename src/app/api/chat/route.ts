import { NextRequest, NextResponse } from "next/server"
import portfolioData from "@/lib/portfolio-data.json"

// Store conversation history (in production, use a database)
const conversationHistory = new Map<string, Array<{ role: string; content: string }>>()

type Persona = "professional" | "casual" | "technical"

function applyPersona(content: string, persona: Persona, intent: string): string {
  switch (persona) {
    case "professional":
      return asProfessionalAbhishek(content, intent)
    case "technical":
      return asTechnicalAbhishek(content, intent)
    case "casual":
    default:
      return asCasualAbhishek(content, intent)
  }
}

function asCasualAbhishek(content: string, intent: string): string {
  const intros = [
    "Hey! I'm Abhishek 👋",
    "Yo, Abhishek here 😄",
    "Hey there — I'm Abhishek!",
    "Wazzuppp! I'm Abhishek 👀",
  ]
  const intro = intros[Math.floor(Math.random() * intros.length)]
  const outro = "\n\nWanna dive into any particular project or topic?"

  return `${intro}\n\n${content}\n${outro}`
}

function asProfessionalAbhishek(content: string, intent: string): string {
  const prefixMap: Record<string, string> = {
    about: "Pleasure to connect. I'm Abhishek Jose, a full-stack developer passionate about scalable systems and meaningful design.\n\n",
    projects: "Allow me to outline a few key projects that demonstrate measurable outcomes:\n\n",
    skills: "Here's a quick look at my core technical skill set:\n\n",
    experience: "Here's an overview of my professional background and areas of impact:\n\n",
    philosophy: "Here's how I approach software engineering from a strategic perspective:\n\n",
  }

  const prefix = prefixMap[intent] || "Good to connect with you. I'm Abhishek Jose.\n\n"
  const suffix = "\n\nIf this aligns with your goals or project needs, I'd be glad to discuss further."

  return prefix + content.trim() + suffix
}

function asTechnicalAbhishek(content: string, intent: string): string {
  const prefix = "Hey, Abhishek here 👨‍💻 — I love diving deep into system architecture, code design, and optimization.\n\n"
  const additions: Record<string, string> = {
    projects: "\n\n**Under the Hood:**\n• Event-driven APIs and microservices\n• Caching, load balancing, and CI/CD pipelines\n• Observability with structured logging and tracing",
    skills: "\n\n**Tech Focus:**\n• Runtime optimization and performance tuning\n• Design patterns: Factory, Strategy, CQRS\n• Scalable backend architecture with Python & Node",
    experience: "\n\n**What I Focus On:**\n• Code quality, maintainability, and dev velocity\n• System design for performance and resilience\n• Mentorship and code reviews",
    philosophy: "\n\n**How I Think About Engineering:**\n• Keep it modular and measurable\n• Simplicity > cleverness\n• Build for scale, but start small",
  }

  const addition = additions[intent] || ""
  return prefix + content.trim() + addition
}

function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Greetings
  if (lowerMessage.match(/^(hi|hey|hello|yo|sup|howdy|greetings)[\s!,.]*/)) {
    return "greeting"
  }
  
  // Random/fun questions
  if (lowerMessage.includes("joke") || lowerMessage.includes("funny")) {
    return "joke"
  }
  
  if (lowerMessage.includes("favorite") || lowerMessage.includes("favourite")) {
    if (lowerMessage.includes("food") || lowerMessage.includes("eat")) return "favorite_food"
    if (lowerMessage.includes("color") || lowerMessage.includes("colour")) return "favorite_color"
    if (lowerMessage.includes("movie") || lowerMessage.includes("film")) return "favorite_movie"
    if (lowerMessage.includes("music") || lowerMessage.includes("song")) return "favorite_music"
    if (lowerMessage.includes("language") || lowerMessage.includes("programming")) return "favorite_language"
  }
  
  // Personal questions
  if (lowerMessage.includes("age") || lowerMessage.includes("old") || lowerMessage.includes("born")) {
    return "age"
  }
  
  if (lowerMessage.includes("location") || lowerMessage.includes("where") && (lowerMessage.includes("live") || lowerMessage.includes("based") || lowerMessage.includes("from"))) {
    return "location"
  }
  
  if (lowerMessage.includes("hobby") || lowerMessage.includes("hobbies") || lowerMessage.includes("free time")) {
    return "hobbies"
  }
  
  if (lowerMessage.includes("inspiration") || lowerMessage.includes("inspire") || lowerMessage.includes("motivate")) {
    return "inspiration"
  }
  
  // Technical deep dives
  if (lowerMessage.includes("debug") || lowerMessage.includes("bug")) {
    return "debugging"
  }
  
  if (lowerMessage.includes("learn") || lowerMessage.includes("learning")) {
    return "learning"
  }
  
  // Project queries
  if (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("built") || lowerMessage.includes("portfolio")) {
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
  if (lowerMessage.includes("philosophy") || lowerMessage.includes("approach") || lowerMessage.includes("methodology") || lowerMessage.includes("think")) {
    return "philosophy"
  }
  
  // Contact
  if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email") || lowerMessage.includes("hire") || lowerMessage.includes("available")) {
    return "contact"
  }
  
  // Future plans
  if (lowerMessage.includes("future") || lowerMessage.includes("plan") || lowerMessage.includes("next") || lowerMessage.includes("goal")) {
    return "future"
  }
  
  // Advice
  if (lowerMessage.includes("advice") || lowerMessage.includes("tip") || lowerMessage.includes("recommend") || lowerMessage.includes("suggest")) {
    return "advice"
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
      return `I'm **${personal.name}**—a 19-year-old ${personal.title} based in ${personal.location}.

${personal.bio}

**What I actually care about:**
Building things that work and solve real problems. From AI-powered hangout planners to healthcare apps and sponsorship platforms—I love turning ideas into working products that help people.

**How I work:**
• Keep it simple (complexity kills projects)
• Ship something, then make it better
• Learn by building, not just watching tutorials
• Write code that's clean and maintainable
• Stay curious and experiment constantly

**The numbers:**
• ${stats.projectsCompleted}+ projects shipped
• ${stats.openSourceContributions}+ open source contributions
• ${stats.yearsOfExperience}+ years building things
• ${stats.coffeeConsumed} cups of coffee (and counting!)

Currently studying at Fr. CRCE and leading tech initiatives at GDSC. I like talking about hard problems and creative solutions. What's on your mind?`

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

    case "greeting":
      return `Hey! 👋 Great to meet you! I'm Abhishek Jose—full-stack developer, problem solver, and coffee enthusiast.

I build things that actually work and solve real problems. Everything from AI platforms serving 50k+ users to analytics dashboards processing millions of events.

What brings you here today? Curious about my work, looking to collaborate, or just browsing?`

    case "joke":
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛\n\nSpeaking of bugs, I once spent 6 hours debugging only to find a missing semicolon. Classic.",
        "How many programmers does it take to change a lightbulb? None—that's a hardware problem! 💡\n\n(But honestly, I've definitely blamed hardware when it was my code.)",
        "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 🍺\n\nOkay that was terrible. But I've written plenty of JOIN queries that were even worse!",
        "Why do Java developers wear glasses? Because they don't C#! 😎\n\n(Don't worry, I work with both... and JavaScript, Python, TypeScript...)"
      ]
      return jokes[Math.floor(Math.random() * jokes.length)]

    case "favorite_food":
      return `Coffee. Does coffee count as food? Because I've consumed ${portfolioData.stats.coffeeConsumed} cups of it! ☕

But seriously—I'm a sucker for good pizza and sushi. There's something about simple ingredients done really well that resonates with how I think about code: keep it simple, make it excellent.

What about you? What fuels your work?`

    case "favorite_color":
      return `If you've been looking at this portfolio, you can probably guess—that deep purple/violet gradient you're seeing everywhere! 💜

There's something about that color that feels both technical and creative. Plus it works great in dark mode, which is obviously the superior theme for coding. 😉

It's not just aesthetic though—I spent hours tuning the exact shades and gradients to be easy on the eyes during long coding sessions.`

    case "favorite_movie":
      return `Ooh, tough one! I'm a fan of anything that makes you think. Inception, The Matrix, Interstellar—basically anything that bends reality or explores complex ideas.

There's a parallel to coding there: the best solutions often require thinking outside the box and seeing problems from different angles.

Also, any movie where the tech is at least somewhat realistic gets bonus points. Most Hollywood "hacking" scenes make me cringe! 😅

Got any recommendations?`

    case "favorite_music":
      return `My coding playlist is all over the place! Here's what usually gets queued up:

**Focus mode:** Lo-fi beats, ambient electronic, anything without lyrics that keeps me in the zone
**Debug mode:** Something more intense—rock, electronic, whatever matches my frustration level 😄
**Celebration mode:** Literally anything upbeat when that code finally works!

Fun fact: I've debugged production issues at 3 AM with nothing but coffee and Daft Punk. Would recommend both.

What do you listen to while working?`

    case "favorite_language":
      return `Ah, the eternal debate! Honestly? **TypeScript** has my heart right now. ❤️

It's got the flexibility of JavaScript with actual type safety. Plus the tooling is incredible—autocomplete that actually works? *Chef's kiss*

But here's the thing: every language has its place. Python for ML/data work, Node for APIs, React for frontends. The best language is whichever one solves your problem most elegantly.

That said, I have opinions about PHP... 😅 (kidding! mostly...)

What's your favorite stack?`

    case "age":
      return `I'm 19 years old! Currently in my second year of Computer Engineering at Fr. Conceicao Rodrigues College of Engineering, Bandra. 🎓

Age is just a number in tech—what matters is what you build and how fast you learn. I've already shipped multiple production projects, led technical initiatives at GDSC, and worked with cutting-edge tech like AI/ML, Next.js, and Flask.

**What really counts:**
• ${portfolioData.stats.projectsCompleted}+ projects shipped
• ${portfolioData.stats.linesOfCode.toLocaleString()}+ lines of code written
• Leading web development for major college events
• Still learning something new every single day

The best part about being young in tech? Endless energy, curiosity, and time to experiment! 💻`

    case "location":
      return `I'm based in **${portfolioData.personal.location}**! 📍

It's a great spot for tech—lots of opportunities, amazing community, and plenty of coffee shops to code in. ☕

I work both remotely and in-office depending on the project. The pandemic taught us all that location is less important than ever for shipping great software.

**My work setup:**
• Open to remote, hybrid, or in-person
• Comfortable with distributed teams (done it for years)
• Available for travel when needed
• Multiple timezones? No problem!

Location shouldn't limit what we can build together. Where are you based?`

    case "hobbies":
      return `Outside of coding? I'm actually pretty boring in the best way:

**Side projects** - Yeah, I code for fun too. Currently tinkering with some ML experiments and open source contributions.

**Learning** - Always something new. Right now diving deeper into system design and distributed systems. Books, courses, documentation—I consume it all.

**Coffee adventures** - Trying different brewing methods, beans, ratios. It's basically chemistry but tastier! ☕

**Staying curious** - Reading tech blogs, following smart people on Twitter, learning from others' mistakes (and successes).

Honestly though? Building things *is* my hobby. I'm one of those lucky people who genuinely loves what they do.

What about you? What do you do for fun?`

    case "inspiration":
      return `What inspires me? Honestly—**people solving real problems.**

Not flashy demos or fancy frameworks (though those are cool). I mean engineers who build things that actually matter:

• The dev who optimized a healthcare app and saved lives
• Open source maintainers who give their time for free
• Indie hackers shipping products solo
• Anyone who takes a hard problem and just... solves it

**In tech specifically:**
Folks like Dan Abramov, Kent C. Dodds, Theo Browne—they teach, they share, they make others better. That's impact.

**My philosophy:**
Build things that help people. Ship fast, learn faster. Stay humble, stay curious. Performance matters. Users always come first.

Real talk: Every bug I fix, every feature I ship, every "thank you" from a user—that's what keeps me going.

What inspires you?`

    case "debugging":
      return `Ah, debugging—my favorite love-hate relationship! 🐛

**Best debugging story:**
Once spent 4 hours tracking down a production issue. Server kept crashing randomly. Checked logs, memory, CPU, network—everything looked fine.

The culprit? A single misplaced semicolon in a config file. One character. Four hours. Welcome to programming! 😅

**My debugging process:**
1. **Reproduce it** - If I can't make it happen reliably, I can't fix it
2. **Isolate it** - Binary search through code, commenting things out
3. **Question everything** - Even (especially!) my assumptions
4. **Rubber duck it** - Seriously, explaining out loud helps
5. **Google it** - Someone's hit this before. Find them.

**Pro tips:**
• console.log() is your friend (yes, even with debuggers)
• Read the error message. Actually read it. All of it.
• Take breaks. Fresh eyes see things tired eyes miss.
• Git bisect is magical for finding when things broke

**Most common bugs I see:**
• Typos (duh)
• Async timing issues
• Off-by-one errors (arrays start at 0, friends)
• Null/undefined crashes
• That classic "works on my machine" syndrome

What's your gnarliest bug story?`

    case "learning":
      return `How I learn? **By building, breaking, and fixing things.** Repeat forever.

**My learning system:**
1. **Start with a project** - "I want to build X" beats "I want to learn Y"
2. **Learn just enough** - Get started fast, go deep later
3. **Break stuff** - Intentionally. See what happens.
4. **Read great code** - GitHub is free education
5. **Teach others** - You don't really know it until you can explain it

**Resources I actually use:**
• Documentation (seriously, RTFM)
• YouTube tutorials (Fireship, Web Dev Simplified, Theo)
• Technical blogs (Dan Abramov, Kent C. Dodds, Josh Comeau)
• Discord communities (so much knowledge there)
• Stack Overflow (reading > asking usually)

**What I've learned:**
After ${portfolioData.stats.yearsOfExperience} years, here's the truth: You never stop learning. The moment you think you know everything is when you stop growing.

The best developers I know are still curious about everything. They're still Googling "how to center a div" sometimes. We all are! 😄

**Current learning:**
• Rust (because everyone says it's amazing)
• System design patterns
• More ML/AI stuff (can't ignore this wave)
• Performance optimization at scale

What are you trying to learn right now?`

    case "future":
      return `What's next for me? Great question!

**Short term (2025):**
• Shipping more AI-powered products (riding this wave intelligently)
• Open source contributions (giving back to the community)
• Speaking at conferences (sharing what I've learned)
• Building in public (documenting the journey)

**Long term:**
• Building products that genuinely help people
• Maybe starting my own company (when the idea is right)
• Mentoring more junior developers
• Writing about complex topics in simple ways

**Tech I'm excited about:**
• AI/ML that actually solves problems (not just hype)
• WebAssembly and edge computing
• Better dev tools and DX improvements
• Whatever comes after React (it'll happen eventually)

**Personal goals:**
• Keep learning, always
• Ship more than I consume
• Build sustainable, healthy work habits
• Stay curious and humble

**What I'm NOT doing:**
• Chasing every shiny new framework
• Building just to build
• Sacrificing quality for speed (or vice versa)

The goal isn't to predict the future—it's to build it. One project at a time.

What are your plans?`

    case "advice":
      return `Want advice? Here's what I wish someone told me earlier:

**For Beginners:**
1. **Build stuff** - Tutorial hell is real. Break free. Build things.
2. **It's okay to suck** - Everyone's first code is terrible. That's how you learn.
3. **Google everything** - No one memorizes syntax. We all look it up.
4. **Focus on one thing** - Master React OR Vue first. Not both at once.
5. **Join communities** - Discord, Twitter, Reddit. Learn from others.

**For Intermediate Devs:**
1. **Read other people's code** - GitHub is your university
2. **Learn fundamentals** - Algorithms, data structures, system design
3. **Performance matters** - Users feel every millisecond
4. **Testing isn't optional** - Future you will thank present you
5. **Ship side projects** - Portfolio beats certificates

**For Everyone:**
• **Keep it simple** - Complexity kills projects
• **Users > tech** - They don't care about your stack
• **Done > perfect** - Ship it, then improve it
• **Stay curious** - The learning never stops
• **Rest matters** - Burnt out devs write bad code

**Best career advice:**
1. Work somewhere you'll learn
2. Surround yourself with people better than you
3. Build things people actually use
4. Document your wins (for reviews/interviews)
5. Network genuinely (not transactionally)

**Real talk:**
You'll make mistakes. You'll ship bugs. You'll feel imposter syndrome. Everyone does. The difference is how you respond to it.

${portfolioData.stats.linesOfCode.toLocaleString()}+ lines of code later, I'm still learning. That's the beauty of this field.

What specifically do you need advice on?`

    default:
      // Handle truly random/unrecognized questions with a smart fallback
      return `That's an interesting question! While I'm specifically trained on Abhishek's work and experience, I might not have a direct answer to that one.

But here's what I *can* help you with:

**About Abhishek:**
• Portfolio projects (AI platforms, analytics, marketplaces)
• Technical skills (React, Node, Python, ML, and more)
• Professional experience and achievements
• Development philosophy and approach
• Ways to get in touch

**Fun stuff:**
• Favorite tools and tech
• Career advice and tips
• Stories from the coding trenches
• Future plans and goals

Want to try asking about any of those? Or if you have a specific technical question, I can probably relate it back to something Abhishek's built!

What would you like to know?`
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
        const personaResponse = applyPersona(commandResponse, persona as Persona, "general")
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
    const response = applyPersona(baseResponse, persona as Persona, intent)

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
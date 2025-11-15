# 🚀 Abhishek Jose - AI-Powered Portfolio

A premium, fully interactive ChatGPT-style portfolio website built with Next.js 15, featuring an intelligent chat interface, glass morphism design, and seamless animations.

## ✨ Features

### 🎨 Design
- **ChatGPT-inspired UI** - Clean, minimalistic interface that feels like talking to GPT
- **Glass Morphism Effects** - Premium frosted glass cards and UI elements
- **3D Grid Background** - Animated background on the landing page
- **Dark/Light Mode** - Seamless theme switching with persistent preferences
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **270px Collapsible Sidebar** - ChatGPT-style navigation with smooth animations

### 💬 Chat Interface
- **Intelligent AI Responses** - Context-aware answers based on your portfolio data
- **Typing Animation** - Realistic typing effect for bot responses
- **Conversation Memory** - Remembers context throughout the conversation
- **Suggested Prompts** - Horizontal scrolling prompt suggestions
- **Special Commands** - Easter egg commands like `/surprise`, `/secret`, `/stats`, `/tour`
- **Keyword Detection** - Smart routing to relevant information

### 🎯 Interactive Features
- **Section Detail Panels** - Click any section to open detailed view with animations
- **Project Showcases** - Full project breakdowns with metrics, tech stack, and challenges
- **Export to PDF** - Download conversation as a formatted PDF
- **Share Conversations** - Copy or share chat via native share API
- **Download Resume** - Direct resume download from sidebar

### 🧠 Smart Content
- **Timeline Queries** - "What were you doing in 2023?"
- **Skill Comparisons** - Compare technologies and expertise
- **Project Recommendations** - AI suggests relevant projects
- **Philosophy & Approach** - Detailed development methodology
- **Metrics & Stats** - Real numbers and achievements

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS with custom theme
- **Animations:** Framer Motion
- **UI Components:** Radix UI + shadcn/ui
- **Icons:** Lucide React
- **Fonts:** Inter (via Google Fonts)
- **TypeScript:** Full type safety

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # AI chat API endpoint
│   │   ├── globals.css               # Global styles + theme
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main portfolio page
│   ├── components/
│   │   ├── ChatInput.tsx             # Chat input component
│   │   ├── ChatMessage.tsx           # Message display with typing
│   │   ├── PortfolioSidebar.tsx      # Collapsible sidebar
│   │   ├── SectionDetail.tsx         # Detail panel for sections
│   │   ├── SuggestedPrompts.tsx      # Prompt suggestions
│   │   └── ThemeProvider.tsx         # Dark/light mode provider
│   └── lib/
│       ├── portfolio-data.json       # 🎯 YOUR DATA HERE
│       └── exportToPdf.ts            # PDF export utility
└── public/
    └── resume.pdf                    # 🎯 YOUR RESUME HERE
```

## 🎯 Customizing Your Portfolio

### 1️⃣ Replace Personal Data

Edit `src/lib/portfolio-data.json` with your information:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio...",
    "email": "your@email.com",
    "phone": "+1 234 567 8900",
    "location": "Your City",
    "avatar": "Your avatar URL",
    "resumeUrl": "/resume.pdf"
  }
}
```

### 2️⃣ Update Projects

Add your projects to the `projects` array:

```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description",
  "category": "AI/ML | Data | E-Commerce | etc.",
  "tags": ["React", "Node.js", "..."],
  "image": "Project image URL",
  "metrics": {
    "users": "10K+",
    "uptime": "99.9%",
    "performance": "50ms"
  },
  "problem": "What problem did it solve?",
  "approach": "How did you solve it?",
  "challenges": "What challenges did you face?",
  "results": "What were the outcomes?",
  "github": "GitHub URL (optional)",
  "demo": "Demo URL (optional)",
  "featured": true,
  "year": 2024
}
```

### 3️⃣ Update Skills

Modify the `skills` section with your expertise:

```json
{
  "skills": {
    "frontend": [
      { "name": "React", "level": 95, "years": 4 }
    ],
    "backend": [...],
    "devops": [...],
    "tools": [...]
  }
}
```

### 4️⃣ Update Experience

Add your work history:

```json
{
  "experience": [
    {
      "id": "1",
      "company": "Company Name",
      "position": "Your Role",
      "location": "City, Country",
      "type": "Full-time",
      "startDate": "2022-01",
      "endDate": null,
      "current": true,
      "description": "What you do...",
      "achievements": ["Achievement 1", "Achievement 2"],
      "technologies": ["React", "Node.js"]
    }
  ]
}
```

### 5️⃣ Update Education

Add your academic background:

```json
{
  "education": [
    {
      "id": "1",
      "institution": "University Name",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "startDate": "2015-08",
      "endDate": "2019-05",
      "gpa": "3.8/4.0",
      "honors": ["Dean's List"],
      "description": "Focus areas...",
      "achievements": ["Achievement 1", "Achievement 2"]
    }
  ]
}
```

### 6️⃣ Update Social Links

Edit the `social` section:

```json
{
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "instagram": "https://instagram.com/yourusername",
    "twitter": "https://twitter.com/yourusername"
  }
}
```

### 7️⃣ Add Your Resume

Replace `public/resume.pdf` with your actual resume PDF file.

## 🎨 Customizing Theme

### Colors

Edit `src/app/globals.css` to change the color scheme:

```css
:root {
  --primary: #3b82f6;  /* Blue accent color */
  --background: #ffffff;
  --foreground: #0d0d0d;
  /* ... other colors */
}

.dark {
  --primary: #3b82f6;
  --background: #0d0d0d;
  --foreground: #f5f5f5;
  /* ... other colors */
}
```

### Sidebar Width

To change sidebar width, edit `src/components/PortfolioSidebar.tsx`:

```tsx
animate={{ width: collapsed ? 0 : 270 }}  // Change 270 to your desired width
```

## 🤖 Customizing AI Responses

Edit `src/app/api/chat/route.ts` to customize how the AI responds:

### Add New Keywords

```typescript
function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Add your custom keywords
  if (lowerMessage.includes("your-keyword")) {
    return "your-intent"
  }
  
  // ... existing code
}
```

### Add New Response Types

```typescript
function generateResponse(intent: string, message: string): string {
  switch (intent) {
    case "your-intent":
      return `Your custom response here`
    
    // ... existing cases
  }
}
```

### Add New Special Commands

```typescript
function handleSpecialCommand(command: string): string | null {
  switch (command) {
    case "/your-command":
      return `Your command response`
    
    // ... existing commands
  }
}
```

## 📝 Suggested Prompts

Edit the default prompts in `src/app/page.tsx`:

```tsx
const [suggestions, setSuggestions] = useState([
  "Show me your best work",
  "Your custom prompt",
  "Another prompt",
])
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import to Vercel
3. Deploy automatically

### Other Platforms

- **Netlify:** Connect your repo and deploy
- **Railway:** Deploy with Docker
- **Your own server:** Build with `npm run build` and serve with `npm start`

## 🎯 Tips for Best Results

### Images
- Use high-quality project screenshots (1200x675px recommended)
- Use Unsplash URLs or host your own images
- Optimize images for web (use WebP format)

### Content
- Write detailed project descriptions with metrics
- Use specific numbers and achievements
- Tell stories, not just features
- Show impact and results

### SEO
- Update metadata in `src/app/layout.tsx`
- Add relevant keywords
- Use descriptive project titles

## 🎨 Features Showcase

### Try These Prompts:
- "Show me your best work"
- "Tell me your development philosophy"
- "What were you doing in 2023?"
- "Compare your React vs Vue experience"
- "Show me your ML projects"

### Try These Commands:
- `/surprise` - Fun facts and stats
- `/secret` - Hidden stories
- `/stats` - Your complete statistics
- `/tour` - Guided tour of best work
- `/theme` - Theme information

## 🐛 Troubleshooting

### Chat Not Working
- Check browser console for errors
- Verify `/api/chat` route is accessible
- Check `portfolio-data.json` is valid JSON

### Styling Issues
- Clear browser cache
- Check `globals.css` is properly loaded
- Verify Tailwind classes are correct

### Images Not Loading
- Check image URLs are accessible
- Verify CORS settings for external images
- Use proper image formats (jpg, png, webp)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [shadcn/ui](https://ui.shadcn.com)

## 📄 License

This project is open source and available under the MIT License.

## 🙋 Support

Need help customizing your portfolio? Check the comments in the code or refer to this README.

---

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion

**🎉 Your portfolio is ready! Start customizing and make it yours!**

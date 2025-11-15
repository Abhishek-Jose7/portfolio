"use client"

import { motion } from "framer-motion"
import { X, ExternalLink, Github, Calendar, MapPin, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import portfolioData from "@/lib/portfolio-data.json"

interface SectionDetailProps {
  section: string
  item?: any
  onClose: () => void
}

export function SectionDetail({ section, item, onClose }: SectionDetailProps) {
  const renderProjectDetail = (project: any) => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            {project.category}
          </Badge>
        </div>
        
        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-64 rounded-lg overflow-hidden mb-4 glass"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Links */}
        <div className="flex gap-2">
          {project.demo && (
            <Button
              size="sm"
              onClick={() => window.open(project.demo, "_blank")}
              className="gap-2"
            >
              <ExternalLink className="h-3 w-3" />
              Live Demo
            </Button>
          )}
          {project.github && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(project.github, "_blank")}
              className="gap-2"
            >
              <Github className="h-3 w-3" />
              GitHub
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Metrics */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Key Metrics
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="glass rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{value as string}</div>
              <div className="text-xs text-muted-foreground capitalize">{key}</div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Detailed Description */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Overview</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.longDescription}
        </p>
      </div>

      {/* Problem & Solution */}
      <div className="space-y-4">
        <div className="glass rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2 text-primary">🎯 Problem</h4>
          <p className="text-sm text-muted-foreground">{project.problem}</p>
        </div>

        <div className="glass rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2 text-primary">💡 My Approach</h4>
          <p className="text-sm text-muted-foreground">{project.approach}</p>
        </div>

        <div className="glass rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2 text-primary">⚡ Challenges</h4>
          <p className="text-sm text-muted-foreground">{project.challenges}</p>
        </div>

        <div className="glass rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2 text-primary">📊 Results</h4>
          <p className="text-sm text-muted-foreground">{project.results}</p>
        </div>
      </div>

      <Separator />

      {/* Tech Stack */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="glass">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAboutDetail = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <div className="flex items-start gap-4 mb-6">
          <img
            src={portfolioData.personal.avatar}
            alt={portfolioData.personal.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h3 className="text-xl font-semibold">{portfolioData.personal.name}</h3>
            <p className="text-muted-foreground">{portfolioData.personal.title}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {portfolioData.personal.location}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {portfolioData.personal.bio}
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-semibold mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">
              {portfolioData.stats.yearsOfExperience}+
            </div>
            <div className="text-xs text-muted-foreground">Years Experience</div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">
              {portfolioData.stats.projectsCompleted}+
            </div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">
              {portfolioData.stats.openSourceContributions}+
            </div>
            <div className="text-xs text-muted-foreground">Contributions</div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">
              {portfolioData.stats.happyClients}+
            </div>
            <div className="text-xs text-muted-foreground">Happy Clients</div>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-semibold mb-3">Contact Information</h3>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            <strong>Email:</strong> {portfolioData.personal.email}
          </p>
          <p className="text-muted-foreground">
            <strong>Phone:</strong> {portfolioData.personal.phone}
          </p>
        </div>
      </div>
    </div>
  )

  const renderSkillsDetail = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Skills & Technologies</h2>

      {Object.entries(portfolioData.skills).map(([category, skills]) => (
        <div key={category}>
          <h3 className="text-sm font-semibold mb-3 capitalize">{category}</h3>
          <div className="space-y-3">
            {(skills as any[]).map((skill) => (
              <div key={skill.name} className="glass rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {skill.years} {skill.years === 1 ? "year" : "years"}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="bg-primary h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          {category !== "tools" && <Separator className="mt-6" />}
        </div>
      ))}
    </div>
  )

  const renderExperienceDetail = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Work Experience</h2>

      {portfolioData.experience.map((exp, index) => (
        <div key={exp.id}>
          <div className="glass rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">{exp.position}</h3>
                <p className="text-sm text-primary font-medium">{exp.company}</p>
              </div>
              {exp.current && (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Current
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {exp.location}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>

            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-semibold">Key Achievements:</h4>
              <ul className="space-y-1">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {index < portfolioData.experience.length - 1 && <Separator className="my-6" />}
        </div>
      ))}
    </div>
  )

  const renderEducationDetail = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Education</h2>

      {portfolioData.education.map((edu) => (
        <div key={edu.id} className="glass rounded-lg p-4">
          <div className="mb-3">
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            <p className="text-sm text-primary font-medium">{edu.field}</p>
            <p className="text-sm text-muted-foreground">{edu.institution}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {edu.startDate} - {edu.endDate}
            </span>
            {edu.gpa && <span>GPA: {edu.gpa}</span>}
          </div>

          <p className="text-sm text-muted-foreground mb-4">{edu.description}</p>

          {edu.honors && edu.honors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Honors:
              </h4>
              <div className="flex flex-wrap gap-2">
                {edu.honors.map((honor) => (
                  <Badge key={honor} className="bg-primary/10 text-primary border-primary/20">
                    {honor}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold mb-2">Achievements:</h4>
            <ul className="space-y-1">
              {edu.achievements.map((achievement, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )

  const renderAchievementsDetail = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Achievements & Awards</h2>

      {portfolioData.achievements.map((achievement) => (
        <div key={achievement.id} className="glass rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold">{achievement.title}</h3>
            <Badge variant="outline">{achievement.category}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {achievement.date}
          </p>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
      ))}

      <Separator />

      <div>
        <h3 className="text-sm font-semibold mb-3">Certifications</h3>
        {portfolioData.certifications.map((cert) => (
          <div key={cert.id} className="glass rounded-lg p-4 mb-3">
            <h4 className="text-sm font-semibold mb-1">{cert.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">{cert.issuer}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{cert.date}</span>
              {cert.url && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(cert.url, "_blank")}
                  className="h-6 text-xs"
                >
                  View Certificate
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderContactDetail = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>

      <div className="glass rounded-lg p-6">
        <p className="text-sm text-muted-foreground mb-6">
          I'm always interested in hearing about new opportunities, projects, and collaborations.
          Feel free to reach out!
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Email</h4>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-sm text-primary hover:underline"
            >
              {portfolioData.personal.email}
            </a>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Phone</h4>
            <a
              href={`tel:${portfolioData.personal.phone}`}
              className="text-sm text-primary hover:underline"
            >
              {portfolioData.personal.phone}
            </a>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Location</h4>
            <p className="text-sm text-muted-foreground">{portfolioData.personal.location}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Connect Online</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => window.open(portfolioData.social.github, "_blank")}
          >
            <Github className="h-4 w-4" />
            GitHub
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => window.open(portfolioData.social.linkedin, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
            LinkedIn
          </Button>
        </div>
      </div>

      <Separator />

      <div className="glass rounded-lg p-4">
        <h4 className="text-sm font-semibold mb-2">I'm interested in:</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Full-time opportunities</li>
          <li>• Freelance projects</li>
          <li>• Technical consulting</li>
          <li>• Speaking engagements</li>
          <li>• Open source collaboration</li>
        </ul>
      </div>
    </div>
  )

  const renderContent = () => {
    if (section === "project" && item) {
      return renderProjectDetail(item)
    }

    switch (section) {
      case "about":
        return renderAboutDetail()
      case "skills":
        return renderSkillsDetail()
      case "experience":
        return renderExperienceDetail()
      case "education":
        return renderEducationDetail()
      case "achievements":
        return renderAchievementsDetail()
      case "contact":
        return renderContactDetail()
      default:
        return <div>Content not found</div>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background border-l border-border shadow-2xl"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-lg font-semibold">
              {section === "project" ? item?.title : `${section.charAt(0).toUpperCase() + section.slice(1)}`}
            </h2>
            <Button size="icon" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="p-6">{renderContent()}</div>
          </ScrollArea>
        </div>
      </motion.div>
    </motion.div>
  )
}

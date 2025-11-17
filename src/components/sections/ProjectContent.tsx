"use client"

import { motion } from "framer-motion"

export function ProjectContent({ project }: { project: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* ... existing project content from SectionDetail ... */}
      <div className="space-y-4">
        <div className="glass rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          {project.image && (
            <img src={project.image} alt={project.title} className="w-full rounded-lg mb-4" loading="lazy" />
          )}
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag: string) => (
              <span key={tag} className="px-2 py-1 text-xs rounded-full glass">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

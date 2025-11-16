"use client"

import { motion } from "framer-motion"
import portfolioData from "@/lib/portfolio-data.json"

export function ContactContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
        <p className="text-muted-foreground mb-4">
          Email: {portfolioData.personal.email}
        </p>
        <p className="text-muted-foreground">
          Phone: {portfolioData.personal.phone}
        </p>
      </div>
    </motion.div>
  )
}

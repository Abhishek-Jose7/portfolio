"use client"

import { motion } from "framer-motion"

export function EducationContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Education</h3>
        {/* Add education rendering */}
      </div>
    </motion.div>
  )
}

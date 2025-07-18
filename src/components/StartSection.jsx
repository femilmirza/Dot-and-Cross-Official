import React from 'react'
import { motion } from 'framer-motion'

const capabilities = [
  "Brand Strategy",
  "Identity Design",
  "Digital Experiences",
  "Motion & Animation",
  "Web Development",
]

export default function StartSection() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] bg-white"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="font-bebas text-6xl mb-8">Capabilities</h2>
      <ul className="list-none text-2xl space-y-4">
        {capabilities.map(item => (
          <li key={item} className="font-bebas">{item}</li>
        ))}
      </ul>
    </motion.div>
  )
}

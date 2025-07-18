import React from 'react'
import { motion } from 'framer-motion'

const capabilities = [
  "Brand Strategy",
  "Identity Design",
  "Digital Experiences",
  "Motion & Animation",
  "Web Development",
]

export default function Start() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-white"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <h2 className="font-bebas text-5xl mb-6">Capabilities</h2>
      <ul className="list-none text-xl space-y-3">
        {capabilities.map(item => (
          <li key={item} className="font-bebas">{item}</li>
        ))}
      </ul>
    </motion.div>
  )
}

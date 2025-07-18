import React from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="font-bebas text-8xl tracking-wide">DOT & CROSS</h1>
    </motion.div>
  )
}

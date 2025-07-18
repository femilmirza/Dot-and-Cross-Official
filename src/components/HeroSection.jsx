import React from 'react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <motion.div
      className="flex items-center justify-center h-[calc(100vh-5rem)] bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="font-bebas text-[8vw] font-bold tracking-widest text-black select-none">
        DOT & CROSS
      </h1>
    </motion.div>
  )
}

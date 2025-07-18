import React from 'react'
import { motion } from 'framer-motion'

export default function Brands() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-white px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="font-bebas text-5xl mb-6">Our Philosophy</h2>
      <p className="max-w-xl text-center text-lg">
        We believe in clarity, creativity, and bold ideas. DOT & CROSS is about making a mark—connecting vision with execution, and building brands that stand out.
      </p>
    </motion.div>
  )
}

import React from 'react'
import { motion } from 'framer-motion'

export default function BrandsSection() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] bg-white px-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="font-bebas text-6xl mb-8">Our Philosophy</h2>
      <p className="max-w-2xl text-center text-xl font-light">
        We believe in clarity, creativity, and bold ideas. DOT & CROSS is about making a mark—connecting vision with execution, and building brands that stand out. We challenge conventions and ignite new possibilities for our clients.
      </p>
    </motion.div>
  )
}

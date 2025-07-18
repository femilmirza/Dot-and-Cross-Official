import React from 'react'
import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] bg-white"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="font-bebas text-6xl mb-8">Contact</h2>
      <p className="text-2xl mb-4">Email: <a href="mailto:hello@dotandcross.com" className="underline">hello@dotandcross.com</a></p>
      <p className="text-center max-w-lg text-xl font-light">We’d love to hear from you. Let’s make something remarkable together.</p>
    </motion.div>
  )
}

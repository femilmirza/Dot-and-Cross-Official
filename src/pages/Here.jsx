import React from 'react'
import { motion } from 'framer-motion'

export default function Here() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-white"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <h2 className="font-bebas text-5xl mb-6">Contact</h2>
      <p className="text-lg mb-2">Email: <a href="mailto:hello@dotandcross.com" className="underline">hello@dotandcross.com</a></p>
      <p className="text-center max-w-md">We’d love to hear from you. Let’s make something remarkable together.</p>
    </motion.div>
  )
}

import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { name: 'BRANDS', path: '/brands' },
  { name: 'START', path: '/start' },
  { name: 'HERE', path: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  return (
    <nav className="flex justify-center items-center py-8 gap-12 font-bebas text-3xl tracking-wide">
      {navItems.map(item => (
        <Link
          key={item.name}
          to={item.path}
          className={`hover:underline ${location.pathname === item.path ? 'underline' : ''}`}
          style={{
            margin: '0 2rem',
            textDecoration: 'none',
            color: 'inherit',
            textTransform: 'uppercase',
          }}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

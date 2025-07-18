import React from 'react'

export default function Hero() {
  return (
    <div style={{
      height: 'calc(100vh - 5rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{
        fontSize: '20vw',
        fontWeight: 'normal',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        textAlign: 'center',
        lineHeight: '1'
      }}>
        DOT & CROSS
      </h1>
    </div>
  )
}

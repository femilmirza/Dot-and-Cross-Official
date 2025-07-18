import React from 'react';
import './index.css'; // Ensure custom font and .text-fluid class is loaded

const App = () => {
  const links = [
    { text: 'BRANDS', href: '#' },
    { text: 'START', href: '#' },
    { text: 'HERE', href: '#' },
  ];

  return (
    <div className="bg-[#C6C6C6] text-[#1E1E1E] min-h-screen flex items-start justify-start overflow-hidden">
      <div className="space-y-[-10vw]">
        {/* DOT & CROSS */}
        <div className="flex items-center space-x-4 text-fluid font-extrabold uppercase tracking-tight font-inktrap">
          <span>DOT</span>
          <span className="relative">
            <span className="absolute inset-0 bg-[#42b7e9] z-0 w-full h-full"></span>
            <span className="relative z-10 text-white">&</span>
          </span>
        </div>

        <div className="text-fluid font-extrabold uppercase tracking-tight font-inktrap">
          CROSS
        </div>

        {/* Navigation Links */}
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="block text-fluid font-extrabold uppercase tracking-tight hover:opacity-60 transition-opacity duration-300 font-inktrap"
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default App;

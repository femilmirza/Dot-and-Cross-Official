import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import BrandCapabilities from './BrandCapabilities';

// --- Floating Circles Component (now full page height) ---
const FloatingCircles = ({ count = 4 }) => {
  const getRandomPosition = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * document.documentElement.scrollHeight, // full document height
  });

  const getRandomColor = () => {
    const colors = ['#BDF4E0', '#F0E717', '#5DBAE8', '#F37B21'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [circles, setCircles] = useState(
    Array.from({ length: count }).map(() => ({
      id: Math.random(),
      pos: getRandomPosition(),
      dir: { dx: (Math.random() - 0.5) * 1.2, dy: (Math.random() - 0.5) * 1.2 },
      color: getRandomColor(),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const pageHeight = document.documentElement.scrollHeight; // dynamic height
      setCircles((prevCircles) =>
        prevCircles.map((circle) => {
          let newX = circle.pos.x + circle.dir.dx;
          let newY = circle.pos.y + circle.dir.dy;

          let dx = circle.dir.dx;
          let dy = circle.dir.dy;

          // Bounce horizontally and vertically
          if (newX <= 0 || newX >= window.innerWidth - 40) dx *= -1;
          if (newY <= 0 || newY >= pageHeight - 40) dy *= -1;

          newX = Math.max(0, Math.min(newX, window.innerWidth - 40));
          newY = Math.max(0, Math.min(newY, pageHeight - 40));

          return {
            ...circle,
            pos: { x: newX, y: newY },
            dir: { dx, dy },
          };
        })
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  const handleColorChange = (id) => {
    setCircles((prev) =>
      prev.map((circle) =>
        circle.id === id ? { ...circle, color: getRandomColor() } : circle
      )
    );
  };

  return (
    <>
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full cursor-pointer z-20"
          style={{
            width: 40,
            height: 40,
            backgroundColor: circle.color,
            transform: `translate(${circle.pos.x}px, ${circle.pos.y}px)`,
          }}
          whileHover={{ scale: 1.2 }}
          onClick={() => handleColorChange(circle.id)}
          transition={{ duration: 0.3 }}
        />
      ))}
    </>
  );
};

// --- Line component ---
const Line = ({ text, onClick, isLink = false }) => {
  const isInteractive = text === 'HERE' || isLink;

  const renderText = () => {
    if (text === 'CROSS') {
      return 'CROSS'; // No animation on O
    }
    if (text === 'DOT &') {
      return (
        <>
          DOT <span className="font-inter">&</span>
        </>
      );
    }
    return text;
  };

  return (
    <div
      className={`relative ${
        isInteractive ? 'inline-block' : 'block'
      } w-full overflow-hidden`}
    >
      <div
        onClick={isInteractive ? onClick : undefined}
        className={`text-fluid font-black uppercase tracking-tight leading-[0.75] transition-opacity duration-300 ${
          isInteractive ? 'hover-fade cursor-pointer inline-block' : ''
        }`}
      >
        {renderText()}
      </div>
    </div>
  );
};

// --- App Component ---
const App = () => {
  const [showContact, setShowContact] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      showContact || showCapabilities ? 'hidden' : 'auto';
  }, [showContact, showCapabilities]);

  return (
    <div className="app-container relative text-[#1e1e1e] min-h-screen cursor-crosshair transition-all duration-700 ease-in-out px-1 pt-[1vh] flex flex-col gap-[-0.75em] overflow-x-hidden">
      {/* Overlay close bar */}
      {(showContact || showCapabilities) && (
        <div
          onClick={() => {
            setShowContact(false);
            setShowCapabilities(false);
          }}
          className="fixed inset-x-0 top-0 h-[75px] bg-[#1e1e1e] cursor-pointer z-50"
        />
      )}

      {/* Main text lines */}
      <Line text="DOT &" />
      <Line text="CROSS" />
      <Line text="BRANDS" />
      <Line text="START" onClick={() => setShowCapabilities(true)} isLink={true} />
      <Line text="HERE" onClick={() => setShowContact(!showContact)} />

      {/* Floating moving circles (full height) */}
      <FloatingCircles count={4} />

      {/* Contact Overlay */}
      {showContact && (
        <div className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col justify-between px-1 py-40">
          <div className="flex flex-col items-start gap-1">
            <a
              href="mailto:hi@dotandcross.agency"
              className="inline-block text-5xl sm:text-6xl md:text-7xl font-medium leading-tight hover:opacity-80 transition-opacity duration-200 px-1"
            >
              hi@dotandcross.agency
            </a>
            <a
              href="tel:+971521612390"
              className="inline-block text-5xl sm:text-6xl md:text-7xl font-medium leading-tight px-1 hover:opacity-80 transition-opacity duration-200"
            >
              +971 52 161 2390
            </a>
            <a
              href="https://maps.app.goo.gl/F79xDWS4qsbTLUL5A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-5xl sm:text-6xl md:text-7xl font-medium px-1 inline-block hover:opacity-80 transition-opacity duration-200"
            >
              MBZ City, Abu Dhabi, UAE
            </a>
          </div>
          <div
            onClick={() => setShowContact(false)}
            className="inline-block overflow-visible"
          >
            <div className="text-fluid font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3] cursor-pointer inline-block">
              BACK
            </div>
          </div>
        </div>
      )}

      {/* Capabilities Overlay */}
      {showCapabilities && <BrandCapabilities onClose={() => setShowCapabilities(false)} />}
    </div>
  );
};

export default App;

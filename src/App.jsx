import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import BrandCapabilities from "./BrandCapabilities";
import AboutUs from "./AboutUs";
import Philosophy from "./Philosophy";

const FloatingCircles = ({ count = 10 }) => {
  const [circles, setCircles] = useState([]);
  const mouse = React.useRef({ x: null, y: null });

  const getRandomPosition = React.useCallback(
    () => ({
      x: Math.random() * (window.innerWidth - 40),
      y: Math.random() * (window.innerHeight * 2 - 40),
    }),
    []
  );

  const getRandomColor = () => {
    const colors = [
      "#f36c21",
      "#f4eb27",
      "#42b7e9",
      "#00b0ba",
      "#006582",
      "#e94e77",
      "#7d5fff",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    function spawnCircles() {
      setCircles(
        Array.from({ length: count }).map(() => ({
          id: Math.random(),
          pos: getRandomPosition(),
          dir: {
            dx: (Math.random() - 0.5) * 1.2,
            dy: (Math.random() - 0.5) * 1.2,
          },
          color: getRandomColor(),
          repel: false,
        }))
      );
    }
    spawnCircles();
    window.addEventListener("resize", spawnCircles);
    return () => window.removeEventListener("resize", spawnCircles);
  }, [count, getRandomPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles((prev) =>
        prev.map((c) => {
          let { x, y } = c.pos;
          let { dx, dy } = c.dir;

          if (c.repel && mouse.current.x !== null && mouse.current.y !== null) {
            const distX = x + 20 - mouse.current.x;
            const distY = y + 20 - mouse.current.y;
            const dist = Math.sqrt(distX * distX + distY * distY);
            if (dist < 120 && dist > 0) {
              dx += (distX / dist) * 0.2;
              dy += (distY / dist) * 0.2;
            }
          }

          x += dx;
          y += dy;

          if (x <= 0 || x >= window.innerWidth - 40) dx *= -1;
          if (y <= 0 || y >= window.innerHeight * 2 - 40) dy *= -1;

          return {
            ...c,
            pos: {
              x: Math.max(0, Math.min(x, window.innerWidth - 40)),
              y: Math.max(0, Math.min(y, window.innerHeight * 2 - 40)),
            },
            dir: { dx, dy },
          };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  };

  const handleMouseLeave = () => {
    mouse.current.x = null;
    mouse.current.y = null;
    setCircles((prev) => prev.map((c) => ({ ...c, repel: false })));
  };

  const handleBubbleHover = (id) => {
    setCircles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, repel: true } : c))
    );
  };

  const handleBubbleUnhover = (id) => {
    setCircles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, repel: false } : c))
    );
  };

  const changeColor = (id) => {
    setCircles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, color: getRandomColor() } : c))
    );
  };

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none z-10"
      style={{
        width: "100vw",
        height: window.innerHeight * 2,
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {circles.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full pointer-events-auto cursor-pointer"
          style={{
            width: 40,
            height: 40,
            left: c.pos.x,
            top: c.pos.y,
            backgroundColor: c.color,
            zIndex: 20,
          }}
          whileHover={{ scale: 1.1 }}
          onMouseEnter={() => handleBubbleHover(c.id)}
          onMouseLeave={() => handleBubbleUnhover(c.id)}
          onClick={() => changeColor(c.id)}
        />
      ))}
    </div>
  );
};

const Line = ({ text, onClick, isLink = false }) => {
  const interactive = text === "CONTACT" || isLink;

  const renderText = () => {
    if (text === "CROSS") return "CROSS";
    if (text === "DOT &")
      return (
        <>
          DOT <span className="font-inter">&</span>
        </>
      );
    return text;
  };

  return (
    <div
      className={`relative ${
        interactive ? "inline-block" : "block"
      } w-full overflow-hidden`}
    >
      <div
        onClick={interactive ? onClick : undefined}
        className={`text-fluid font-black uppercase tracking-tight leading-[0.75] transition-opacity duration-300 ${
          interactive ? "hover-fade cursor-pointer inline-block" : ""
        }`}
      >
        {renderText()}
      </div>
    </div>
  );
};

const Home = () => {
  const [showContact, setShowContact] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      showContact || showCapabilities || showAbout ? "hidden" : "auto";
  }, [showContact, showCapabilities, showAbout]);

  const navigate = useNavigate();

  return (
    <div className="app-container relative text-[#1e1e1e] min-h-screen cursor-crosshair transition-all duration-700 ease-in-out px-1 pt-[1vh] flex flex-col gap-[-0.75em] overflow-hidden">
      {/* Header Lines */}
      <Line text="DOT &" onClick={() => window.location.reload(true)} isLink={true} />
      <Line text="CROSS " onClick={() => window.location.reload(true)} isLink={true} />
      <Line text="ABOUT" onClick={() => setShowAbout(true)} isLink={true} />
      {/* Link to Philosophy Page */}
      <Line text="PHILOSOPHY" onClick={() => navigate("/philosophy")} isLink={true} />
      <Line
        text="CAPABILITIES"
        onClick={() => setShowCapabilities(true)}
        isLink={true}
      />
      <Line text="CONTACT" onClick={() => setShowContact((v) => !v)} />

      {/* Floating Circles */}
      <FloatingCircles count={10} />

      {/* Footer */}
      <div className="absolute bottom-3 right-1 pr-10 text-xs text-right leading-[0.8] tracking-tight text-[#1e1e1e] opacity-80 indent-10">
        <p>
          We don’t brand for attention ——<br />
          We brand for alignment.
        </p>
        <p> © {new Date().getFullYear()} DOT&CROSS. All rights reserved. </p>
      </div>

      {/* Contact Overlay */}
      {showContact && (
        <div className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col justify-between px-4 pt-[120px] overflow-y-auto">
          <div className="absolute top-0 left-0 w-full h-[100px] bg-[#1e1e1e]"></div>
          <div
            onClick={() => setShowContact(false)}
            className="absolute top-0 left-5 text-[80px] font-inter text-[#fafafa] cursor-pointer select-none leading-[1.25]"
          >
            &amp;
          </div>
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
            className="inline-block overflow-visible mt-10"
          >
            <div className="text-fluid font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3] cursor-pointer inline-block">
              BACK
            </div>
          </div>
        </div>
      )}

      {/* Capabilities Overlay */}
      {showCapabilities && (
        <BrandCapabilities
          onClose={() => setShowCapabilities(false)}
          onShowContact={() => {
            setShowCapabilities(false);
            setShowContact(true);
          }}
        />
      )}

      {/* About Overlay */}
      {showAbout && (
        <AboutUs
          onClose={() => setShowAbout(false)}
          onFindYourWay={() => setShowCapabilities(true)}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/philosophy" element={<Philosophy />} />
      </Routes>
    </Router>
  );
};

export default App;

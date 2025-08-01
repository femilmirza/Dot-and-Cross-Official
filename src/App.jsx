import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
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

/* ---------------- Floating Circles ---------------- */
const FloatingCircle = ({ circle, onHover, onUnhover, onClick, mousePos, allCircles }) => {
  const controls = useAnimation();
  const x = useMotionValue(circle.pos.x);
  const y = useMotionValue(circle.pos.y);

  useEffect(() => {
    let animationId;

    const animate = () => {
      const currentX = x.get();
      const currentY = y.get();

      let { dx, dy } = circle.dir;
      let speed = circle.speed;

      // Speed adjustment
      const targetSpeed = circle.repel ? 12 : 0.08;
      speed += (targetSpeed - speed) * 0.04;
      circle.speed = speed;

      // Mouse repulsion
      if (circle.repel && mousePos.x !== null && mousePos.y !== null) {
        const distX = currentX + 20 - mousePos.x;
        const distY = currentY + 20 - mousePos.y;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < 150 && dist > 10) {
          const force = 0.9 / dist;
          dx += distX * force;
          dy += distY * force;
        }
      }

      // Circle-to-circle collision physics
      allCircles.forEach((other) => {
        if (other.id !== circle.id) {
          const otherX = other.pos.x + 20;
          const otherY = other.pos.y + 20;
          const currentCenterX = currentX + 20;
          const currentCenterY = currentY + 20;

          const distX = currentCenterX - otherX;
          const distY = currentCenterY - otherY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          const minDistance = 45;

          if (distance < minDistance && distance > 0) {
            const overlap = minDistance - distance;
            const separationForce = overlap * 0.3;

            const separationX = (distX / distance) * separationForce;
            const separationY = (distY / distance) * separationForce;

            dx += separationX * 0.1;
            dy += separationY * 0.1;
          }
        }
      });

      // Normalize direction
      const mag = Math.sqrt(dx * dx + dy * dy) || 1;
      dx /= mag;
      dy /= mag;
      circle.dir = { dx, dy };

      // Calculate new position
      const moveX = dx * speed * 4;
      const moveY = dy * speed * 4;
      const newX = currentX + moveX * 0.6;
      const newY = currentY + moveY * 0.6;

      // Boundary collision
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight * 2;

      let finalX = newX;
      let finalY = newY;

      if (finalX <= 0 || finalX >= windowWidth - 40) {
        circle.dir.dx *= -0.8;
        finalX = Math.max(0, Math.min(finalX, windowWidth - 40));
      }
      if (finalY <= 0 || finalY >= windowHeight - 40) {
        circle.dir.dy *= -0.8;
        finalY = Math.max(0, Math.min(finalY, windowHeight - 40));
      }

      // Update position
      circle.pos.x = finalX;
      circle.pos.y = finalY;

      // Set position in motion value
      x.set(finalX);
      y.set(finalY);

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [circle, mousePos, allCircles, x, y]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-auto cursor-pointer"
      style={{
        x,
        y,
        width: 40,
        height: 40,
        backgroundColor: circle.color,
        zIndex: 20,
      }}
      whileHover={{
        scale: 1.1,
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
      onMouseEnter={() => onHover(circle.id)}
      onMouseLeave={() => onUnhover(circle.id)}
      onClick={() => onClick(circle.id)}
    />
  );
};

const FloatingCircles = ({ count = 10 }) => {
  const [circles, setCircles] = useState([]);
  const [height, setHeight] = useState(window.innerHeight * 2);
  const mousePos = useRef({ x: null, y: null });
  const circlesRef = useRef([]);

  const getRandomPosition = useCallback(
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
    const updateHeight = () => setHeight(window.innerHeight * 2);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    function spawnCircles() {
      const newCircles = Array.from({ length: count }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        return {
          id: Math.random(),
          pos: getRandomPosition(),
          dir: { dx: Math.cos(angle), dy: Math.sin(angle) },
          speed: 0.15,
          color: getRandomColor(),
          repel: false,
        };
      });
      setCircles(newCircles);
      circlesRef.current = newCircles;
    }
    spawnCircles();
    window.addEventListener("resize", spawnCircles);
    return () => window.removeEventListener("resize", spawnCircles);
  }, [count, getRandomPosition]);

  const handleMouseMove = (e) => {
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;
  };

  const handleMouseLeave = () => {
    mousePos.current.x = null;
    mousePos.current.y = null;
    circlesRef.current.forEach((circle) => (circle.repel = false));
  };

  const handleBubbleHover = (id) => {
    const circle = circlesRef.current.find((c) => c.id === id);
    if (circle) circle.repel = true;
  };

  const handleBubbleUnhover = (id) => {
    const circle = circlesRef.current.find((c) => c.id === id);
    if (circle) circle.repel = false;
  };

  const changeColor = (id) => {
    const circle = circlesRef.current.find((c) => c.id === id);
    if (circle) {
      circle.color = getRandomColor();
      setCircles([...circlesRef.current]);
    }
  };

  return (
    <motion.div
      className="absolute top-0 left-0 pointer-events-none z-10"
      style={{ width: "100vw", height, overflow: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {circles.map((circle) => (
        <FloatingCircle
          key={circle.id}
          circle={circle}
          onHover={handleBubbleHover}
          onUnhover={handleBubbleUnhover}
          onClick={changeColor}
          mousePos={mousePos.current}
          allCircles={circlesRef.current}
        />
      ))}
    </motion.div>
  );
};

/* ---------------- Homepage + Routes ---------------- */
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
    <div className="relative overflow-hidden">
      <div
        onClick={interactive ? onClick : undefined}
        className={`font-black uppercase tracking-tight leading-[0.75]
        text-[15vw] whitespace-nowrap
        ${interactive ? "hover-fade cursor-pointer inline-block" : ""}`}
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

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow =
      showContact || showCapabilities || showAbout ? "hidden" : "auto";
  }, [showContact, showCapabilities, showAbout]);

  return (
    <div className="app-container relative text-[#1e1e1e] min-h-screen cursor-crosshair px-1 pt-[1vh] flex flex-col gap-[-0.75em] overflow-hidden">
      {/* Header Lines */}
      <Line text="DOT &" onClick={() => window.location.reload()} isLink={true} />
      <Line text="CROSS" onClick={() => window.location.reload()} isLink={true} />
      <Line text="ABOUT" onClick={() => setShowAbout(true)} isLink={true} />
      <Line text="PHILOSOPHY" onClick={() => navigate("/philosophy")} isLink={true} />
      <Line text="CAPABILITIES" onClick={() => setShowCapabilities(true)} isLink={true} />
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
            <div className="text-[13vw] font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3] cursor-pointer inline-block">
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

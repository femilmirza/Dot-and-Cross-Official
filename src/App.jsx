import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import "./index.css";
import BrandCapabilities from "./BrandCapabilities";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Philosophy from "./Philosophy";
import PrivacyPolicy from "./PrivacyPolicy";

/* Floating Circles, Page Animations, and Line Component remain unchanged */
const FloatingCircle = ({ circle, onHover, onUnhover, onClick, mousePos, allCircles }) => {
  const x = useMotionValue(circle.pos.x);
  const y = useMotionValue(circle.pos.y);
  useEffect(() => {
    let animationId;
    const animate = () => {
      const currentX = x.get(), currentY = y.get();
      let { dx, dy } = circle.dir, speed = circle.speed;
      const isSmallScreen = window.innerWidth <= 768;
      const targetSpeed = circle.repel ? (isSmallScreen ? 0.5 : 12) : 0.08;
      speed += (targetSpeed - speed) * 0.04;
      circle.speed = speed;

      if (!circle.dragging && circle.repel && mousePos.x !== null && mousePos.y !== null) {
        const distX = currentX + 20 - mousePos.x;
        const distY = currentY + 20 - mousePos.y;
        const dist = Math.hypot(distX, distY);
        if (dist < 150 && dist > 10) {
          const force = 25 / dist;
          dx += distX * force;
          dy += distY * force;
        }
      }

      allCircles.forEach(other => {
        if (other.id !== circle.id) {
          const distX = currentX + 20 - (other.pos.x + 20);
          const distY = currentY + 20 - (other.pos.y + 20);
          const distance = Math.hypot(distX, distY);
          const minDistance = 50;
          if (distance < minDistance && distance > 0) {
            const overlap = (minDistance - distance) / 2;
            const nx = distX / distance;
            const ny = distY / distance;
            circle.pos.x += nx * overlap;
            circle.pos.y += ny * overlap;
            other.pos.x -= nx * overlap;
            other.pos.y -= ny * overlap;
            circle.dir.dx += nx * 0.2;
            circle.dir.dy += ny * 0.2;
            other.dir.dx -= nx * 0.2;
            other.dir.dy -= ny * 0.2;
          }
        }
      });

      const mag = Math.hypot(dx, dy) || 1;
      dx /= mag; dy /= mag;
      circle.dir = { dx, dy };

      let newX = currentX + dx * speed * 4;
      let newY = currentY + dy * speed * 4;
      const w = window.innerWidth, h = window.innerHeight * 2;
      if (newX <= 0 || newX >= w - 40) dx *= -0.8, newX = Math.min(Math.max(0, newX), w - 40);
      if (newY <= 0 || newY >= h - 40) dy *= -0.8, newY = Math.min(Math.max(0, newY), h - 40);
      circle.pos.x = newX; circle.pos.y = newY;

      x.set(newX); y.set(newY);
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [circle, mousePos, allCircles, x, y]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-auto cursor-pointer touch-none"
      style={{ x, y, width: 40, height: 40, backgroundColor: circle.color, zIndex: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => onHover(circle.id)}
      onMouseLeave={() => onUnhover(circle.id)}
      onClick={() => onClick(circle.id)}
      drag={window.innerWidth <= 768}
      dragMomentum={false}
      dragElastic={0.2}
      onDragStart={() => (circle.dragging = true)}
      onDragEnd={(e, info) => {
        circle.pos.x = info.point.x - 20;
        circle.pos.y = info.point.y - 20;
        circle.dragging = false;
      }}
    />
  );
};

const FloatingCircles = ({ count = 10 }) => {
  const [circles, setCircles] = useState([]);
  const [height, setHeight] = useState(window.innerHeight * 2);
  const mousePos = useRef({ x: null, y: null });
  const circlesRef = useRef([]);

  const getRandomPosition = useCallback(() => ({
    x: Math.random() * (window.innerWidth - 40),
    y: Math.random() * (window.innerHeight * 2 - 40),
  }), []);

  const getRandomColor = () => ["#f36c21", "#f4eb27", "#42b7e9", "#00b0ba", "#006582", "#e94e77", "#7d5fff"][Math.floor(Math.random() * 7)];

  useEffect(() => {
    window.addEventListener("resize", () => setHeight(window.innerHeight * 2));
    return () => window.removeEventListener("resize", () => {});
  }, []);

  useEffect(() => {
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
  }, [count, getRandomPosition]);

  const handleMouseMove = (e) => { mousePos.current.x = e.clientX; mousePos.current.y = e.clientY; };
  const handleMouseLeave = () => { mousePos.current = { x: null, y: null }; circlesRef.current.forEach(c => (c.repel = false)); };
  const handleBubbleHover = (id) => circlesRef.current.find(c => c.id === id).repel = true;
  const handleBubbleUnhover = (id) => circlesRef.current.find(c => c.id === id).repel = false;
  const changeColor = (id) => {
    const c = circlesRef.current.find(c => c.id === id);
    c.color = getRandomColor();
    setCircles([...circlesRef.current]);
  };

  return (
    <motion.div className="absolute top-0 left-0 pointer-events-none z-10" style={{ width: "100vw", height, overflow: "hidden" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {circles.map(c => (
        <FloatingCircle
          key={c.id}
          circle={c}
          allCircles={circlesRef.current}
          mousePos={mousePos.current}
          onHover={handleBubbleHover}
          onUnhover={handleBubbleUnhover}
          onClick={changeColor}
        />
      ))}
    </motion.div>
  );
};

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

const pageTransition = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1],
};

const Line = ({ text, onClick, isLink = false }) => {
  const interactive = text === "CONTACT" || isLink;
  const renderText = () => (text === "CROSS" ? "CROSS" : text === "DOT &" ? <>DOT <span className="font-inter">&</span></> : text);
  return (
    <div className="relative overflow-hidden w-full">
      <div onClick={interactive ? onClick : undefined} className={`font-black uppercase tracking-tight leading-[0.75] text-[15vw] sm:text-[12vw] md:text-[16vw] whitespace-nowrap ${interactive ? "hover-fade cursor-pointer inline-block" : ""}`}>
        {renderText()}
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <motion.div className="app-container relative text-[#1e1e1e] min-h-screen cursor-crosshair px-2 pt-[2vh] flex flex-col gap-[0.25em] overflow-hidden" initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition} key="home">
      <Line text="DOT &" onClick={() => navigate("/")} isLink />
      <Line text="CROSS" onClick={() => navigate("/")} isLink />
      <Line text="ABOUT" onClick={() => navigate("/about")} isLink />
      <Line text="PHILOSOPHY" onClick={() => navigate("/philosophy")} isLink />
      <Line text="CAPABILITIES" onClick={() => navigate("/capabilities")} isLink />
      <Line text="CONTACT" onClick={() => navigate("/contact")} isLink/>


      <FloatingCircles count={10} />

      <div onClick={() => navigate("/privacypolicy")} className="absolute bottom-3 right-1 pr-10 text-xs text-right leading-[0.8] tracking-tight text-[#1e1e1e] opacity-80 indent-10">
        <p>We don’t brand for attention ——<br />We brand for alignment.</p>
        <p>© {new Date().getFullYear()} DOT&CROSS. All rights reserved. <span className="underline cursor-pointer hover:opacity-80">Privacy Policy</span></p>
      </div>
    </motion.div>
  );
};

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/capabilities" element={<BrandCapabilities />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
    </AnimatePresence>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);

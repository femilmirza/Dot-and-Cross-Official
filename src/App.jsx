import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence, motionValue } from "framer-motion"; // CORRECTED IMPORT
import "./index.css";
import BrandCapabilities from "./BrandCapabilities";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Philosophy from "./Philosophy";
import PrivacyPolicy from "./PrivacyPolicy";
import NotFound from "./NotFound";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";

const Ampersand = () => (
  <span style={{ fontFamily: 'Trap', fontWeight: 900 }} aria-hidden="true">
    &amp;
  </span>
);

// --- Floating Circle (Dumb Component) ---
const FloatingCircle = ({ circle, onClick }) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-auto cursor-pointer touch-none"
      style={{
        x: circle.x,
        y: circle.y,
        width: 40,
        height: 40,
        backgroundColor: circle.color,
        zIndex: 20,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      drag={window.innerWidth <= 768}
      dragMomentum={false}
      dragElastic={0.2}
      onDragStart={() => (circle.dragging = true)}
      onDragEnd={(e, info) => {
        circle.x.set(info.point.x - 20);
        circle.y.set(info.point.y - 20);
        circle.dragging = false;
      }}
    />
  );
};

// --- Floating Circles Wrapper (Centralized Animation Engine) ---
const FloatingCircles = ({ count = 10 }) => {
  const [circles, setCircles] = useState([]);
  const mousePos = useRef({ x: null, y: null });
  const circlesRef = useRef([]);
  const animationFrameId = useRef(null);

  const getRandomPosition = useCallback((w, h) => ({
    x: Math.random() * (w - 40),
    y: Math.random() * (h - 40),
  }), []);

  const getRandomColor = useCallback(
    () =>
      ["#f36c21", "#f4eb27", "#42b7e9", "#00b0ba", "#006582", "#e94e77", "#7d5fff"][
        Math.floor(Math.random() * 7)
      ],
    []
  );

  // Initialize circles only once
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight * 2;

    const newCircles = Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const pos = getRandomPosition(w, h);
      return {
        id: Math.random(),
        // CORRECTED: Use motionValue() factory function, NOT the useMotionValue() hook
        x: motionValue(pos.x),
        y: motionValue(pos.y),
        dir: { dx: Math.cos(angle), dy: Math.sin(angle) },
        color: getRandomColor(),
        radius: 20,
        speed: 0.4 + Math.random() * 0.4,
        dragging: false,
      };
    });

    circlesRef.current = newCircles;
    setCircles(newCircles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // The single, centralized animation loop
  useEffect(() => {
    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight * 2;
      const allCircles = circlesRef.current;

      allCircles.forEach((c) => {
        if (c.dragging) return;
        c.dir.dx += (Math.random() - 0.5) * 0.05;
        c.dir.dy += (Math.random() - 0.5) * 0.05;

        if (mousePos.current.x !== null) {
          const currentX = c.x.get();
          const currentY = c.y.get();
          const vecX = currentX + c.radius - mousePos.current.x;
          const vecY = currentY + c.radius - mousePos.current.y;
          const dist = Math.hypot(vecX, vecY);
          const repelRadius = 120;

          if (dist < repelRadius) {
            const force = (1 - dist / repelRadius) * 1.5;
            c.dir.dx += (vecX / dist) * force;
            c.dir.dy += (vecY / dist) * force;
            const extraSpeed = (repelRadius - dist) / repelRadius * 1.2;
            c.speed = Math.min(c.speed + extraSpeed, 4);
          }
        }

        const mag = Math.hypot(c.dir.dx, c.dir.dy) || 1;
        c.dir.dx = (c.dir.dx / mag) * c.speed;
        c.dir.dy = (c.dir.dy / mag) * c.speed;

        const MIN_SPEED = 0.2;
        if (c.speed < MIN_SPEED) {
          c.speed = MIN_SPEED;
        }
        // Slow down naturally
        c.speed = Math.max(c.speed * 0.98, MIN_SPEED);

      });

      for (let i = 0; i < allCircles.length; i++) {
        for (let j = i + 1; j < allCircles.length; j++) {
          const c1 = allCircles[i];
          const c2 = allCircles[j];

          if (c1.dragging || c2.dragging) continue;

          const c1x = c1.x.get();
          const c1y = c1.y.get();
          const c2x = c2.x.get();
          const c2y = c2.y.get();

          const vecX = c1x + c1.radius - (c2x + c2.radius);
          const vecY = c1y + c1.radius - (c2y + c2.radius);
          const dist = Math.hypot(vecX, vecY);
          const minDistance = c1.radius + c2.radius;

          if (dist < minDistance) {
            const overlap = (minDistance - dist) / 2;
            const normX = vecX / dist;
            const normY = vecY / dist;
            c1.x.set(c1x + normX * overlap);
            c1.y.set(c1y + normY * overlap);
            c2.x.set(c2x - normX * overlap);
            c2.y.set(c2y - normY * overlap);

            const v1 = { x: c1.dir.dx, y: c1.dir.dy };
            const v2 = { x: c2.dir.dx, y: c2.dir.dy };
            const v1n = v1.x * normX + v1.y * normY;
            const v2n = v2.x * normX + v2.y * normY;
            const v1t = v1.x * -normY + v1.y * normX;
            const v2t = v2.x * -normY + v2.y * normX;
            const newV1n = v2n;
            const newV2n = v1n;
            c1.dir.dx = newV1n * normX + v1t * -normY;
            c1.dir.dy = newV1n * normY + v1t * normX;
            c2.dir.dx = newV2n * normX + v2t * -normY;
            c2.dir.dy = newV2n * normY + v2t * normX;

            const DAMPING = 0.85;
            c1.speed *= DAMPING;
            c2.speed *= DAMPING;
          }
        }
      }

      allCircles.forEach((c) => {
        if (c.dragging) return;

        let newX = c.x.get() + c.dir.dx;
        let newY = c.y.get() + c.dir.dy;

        if (newX <= 0 || newX >= w - c.radius * 2) {
          c.dir.dx *= -1;
          newX = Math.max(0, Math.min(newX, w - c.radius * 2));
        }
        if (newY <= 0 || newY >= h - c.radius * 2) {
          c.dir.dy *= -1;
          newY = Math.max(0, Math.min(newY, h - c.radius * 2));
        }

        c.x.set(newX);
        c.y.set(newY);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: null, y: null };
  };

  const changeColor = useCallback((id) => {
      const targetCircle = circlesRef.current.find((c) => c.id === id);
      if (targetCircle) {
        targetCircle.color = getRandomColor();
      }
      setCircles([...circlesRef.current]);
    },
    [getRandomColor]
  );

  return (
    <motion.div
      className="absolute top-0 left-0 pointer-events-none z-10"
      style={{ width: "100vw", height: "200vh", overflow: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {circles.map((c) => (
        <FloatingCircle key={c.id} circle={c} onClick={() => changeColor(c.id)} />
      ))}
    </motion.div>
  );
};

// --- Animation Settings ---
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

const pageTransition = {
  duration: 0.1,
  ease: [0, 0, 0, 0],
};

// --- Line Component ---
// --- Line Component --- (The new, flexible version)
const Line = ({ text, onClick, isLink = false, customClassName = "" }) => { // <-- ADD customClassName PROP
  const interactive = text === "CONTACT" || isLink;
  const renderText = () =>
    text === "CROSS" ? (
      "CROSS"
    ) : text === "DOT &" ? (
      <>
        DOT <span className="font-inter leading-[0.7]"><Ampersand /></span>
      </>
    ) : (
      text
    );
  return (
    <div className="relative overflow-hidden w-full">
      <div
        onClick={interactive ? onClick : undefined}
        className={`font-black uppercase tracking-tight leading-[0.75] whitespace-nowrap ${
          interactive ? "hover-fade cursor-pointer inline-block" : ""
        } ${customClassName}`} // <-- USE THE PROP HERE
      >
        {renderText()}
      </div>
    </div>
  );
};

// --- Home Page ---
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Dot & Cross – Home</title>
        <meta
          name="description"
          content="Creative branding agency – DOT & CROSS"
        />
      </Helmet>

      <motion.div
        className="app-container relative text-[#1e1e1e] min-h-screen cursor-crosshair px-2 pt-[2vh] flex flex-col gap-[0.25em] overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        key="home"
      >
        <Line text="DOT &" onClick={() => navigate("/")} isLink customClassName="text-[28vw] md:text-[16vw]" />
        <Line text="CROSS" onClick={() => navigate("/")} isLink customClassName="text-[28vw] md:text-[16vw]" />
        <Line text="ABOUT" onClick={() => navigate("/about")} isLink customClassName="text-[15vw] sm:text-[12vw] md:text-[16vw]" />
        <Line text="PHILOSOPHY" onClick={() => navigate("/philosophy")} isLink customClassName="text-[15vw] sm:text-[12vw] md:text-[16vw]" />
        <Line text="CAPABILITIES" onClick={() => navigate("/capabilities")} isLink customClassName="text-[15vw] sm:text-[12vw] md:text-[16vw]" />
        <Line text="CONTACT" onClick={() => navigate("/contact")} isLink customClassName="text-[15vw] sm:text-[12vw] md:text-[16vw]" />
        <FloatingCircles count={10} />
                {/* CTA Button */}
                <motion.div
                  onClick={() =>
                    window.open("https://calendly.com/discoverycall-dotandcross/30min", "_blank")
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="self-start text-center text-2xl md:text-3xl font-black uppercase cursor-pointer transition-all duration-300 bg-[#1e1e1e] text-white hover:bg-[#42b7e9] hover:text-[#1e1e1e] px-8 py-5 mt-6 mb-10"
                >
                  BOOK A FREE DISCOVERY CALL
                </motion.div>
        <div
          onClick={() => navigate("/privacypolicy")}
          className="absolute bottom-3 right-1 pr-10 text-xs font-semibold text-right leading-[0.8] text-[#1e1e1e] opacity-80 indent-10"
        >
          <p>
            We don’t brand for attention ——<br />
            We brand for alignment.
          </p>
          <p>
            © {new Date().getFullYear()} DOT<Ampersand />CROSS. All rights reserved.{" "}
            <span className="underline cursor-pointer hover:opacity-80">
              Privacy Policy
            </span>
          </p>
        </div>
      </motion.div>
    </>
  );
};


// --- App Wrapper ---
const App = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/capabilities" element={<BrandCapabilities />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

// --- Root Entry ---
const Root = () => (
  <HelmetProvider>
    <Router>
      <App />
    </Router>
  </HelmetProvider>
);

export default Root;
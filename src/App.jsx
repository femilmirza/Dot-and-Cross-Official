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

      // Smooth speed transition
      const targetSpeed = circle.repel ? 12 : 0.08;
      speed += (targetSpeed - speed) * 0.04;
      circle.speed = speed;

      // Mouse repulsion
      if (circle.repel && mousePos.x !== null && mousePos.y !== null) {
        const distX = currentX + 20 - mousePos.x;
        const distY = currentY + 20 - mousePos.y;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < 150 && dist > 10) {
          const force = 25 / dist;
          dx += distX * force;
          dy += distY * force;
        }
      }

      // Circle-to-circle collision physics (mutual displacement)
      allCircles.forEach((other) => {
        if (other.id !== circle.id) {
          const currentCenterX = currentX + 20;
          const currentCenterY = currentY + 20;
          const otherCenterX = other.pos.x + 20;
          const otherCenterY = other.pos.y + 20;

          const distX = currentCenterX - otherCenterX;
          const distY = currentCenterY - otherCenterY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          const minDistance = 50;

          if (distance < minDistance && distance > 0) {
            const overlap = (minDistance - distance) / 2;

            // Normalized direction
            const nx = distX / distance;
            const ny = distY / distance;

            // Displace both circles equally
            circle.pos.x += nx * overlap;
            circle.pos.y += ny * overlap;
            other.pos.x -= nx * overlap;
            other.pos.y -= ny * overlap;

            // Add small bounce to direction
            circle.dir.dx += nx * 0.2;
            circle.dir.dy += ny * 0.2;
            other.dir.dx -= nx * 0.2;
            other.dir.dy -= ny * 0.2;
          }
        }
      });

      // Normalize direction
      const mag = Math.sqrt(dx * dx + dy * dy) || 1;
      dx /= mag;
      dy /= mag;
      circle.dir = { dx, dy };

      // Calculate new position (allow free movement)
      const moveX = dx * speed * 4;
      const moveY = dy * speed * 4;
      const newX = currentX + moveX;
      const newY = currentY + moveY;

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
        text-[16vw] whitespace-nowrap
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
  const [showPrivacy, setShowPrivacy] = useState(false);


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
      <div
      className="absolute bottom-3 right-1 pr-10 text-xs text-right leading-[0.8] tracking-tight text-[#1e1e1e] opacity-80 indent-10"
      >
        <p>
          We don’t brand for attention ——<br />
          We brand for alignment.
        </p>
        <p>
          © {new Date().getFullYear()} DOT&CROSS. All rights reserved.{" "}
          <span
            onClick={() => setShowPrivacy(true)}
            className="underline cursor-pointer hover:opacity-80"
          >
          Privacy Policy
          </span>
        </p>
      </div>


      {/* Contact Page */}
      {showContact && (
        <div className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col px-4 pt-20 sm:pt-28 overflow-y-auto">
          {/* Header Bar */}
          <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-[#1e1e1e]"></div>

          {/* Close Button */}
          <div
            onClick={() => setShowContact(false)}
            className="absolute top-0 left-5 text-[80px] font-inter text-[#fafafa] cursor-pointer select-none leading-[1.25]"
          >
            &amp;
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-start gap-1 sm:mt-2 mb-2">
            <a
              href="mailto:hi@dotandcross.agency"
              className="block text-3xl sm:text-4xl md:text-7xl font-medium leading-tight hover:opacity-80 transition-opacity duration-200 px-1 break-words"
            >
              hi@dotandcross.agency
            </a>
            <a
              href="tel:+971521612390"
              className="block text-3xl sm:text-4xl md:text-7xl font-medium leading-tight px-1 hover:opacity-80 transition-opacity duration-200"
            >
              +971 52 161 2390
            </a>
            <a
              href="https://maps.app.goo.gl/F79xDWS4qsbTLUL5A"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-3xl sm:text-4xl md:text-7xl font-medium px-1 hover:opacity-80 transition-opacity duration-200"
            >
              MBZ City, Abu Dhabi, UAE
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="fixed bottom-5 right-5 flex gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/dotandcross.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1e1e1e] text-white hover:text-[#E4405F] hover:bg-white border border-[#1e1e1e] transition-all duration-300 hover:scale-105"
            >
              {/* Instagram SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/dot-and-cross-creative/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1e1e1e] text-white hover:text-[#0077B5] hover:bg-white border border-[#1e1e1e] transition-all duration-300 hover:scale-105"
            >
              {/* LinkedIn SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452H16.9v-5.569c0-1.327-.025-3.034-1.85-3.034-1.853 0-2.137 1.445-2.137 2.939v5.664H9.366V9h3.396v1.561h.047c.474-.9 1.637-1.85 3.368-1.85 3.6 0 4.264 2.368 4.264 5.455v6.286zM5.337 7.433a1.978 1.978 0 01-1.98-1.978 1.978 1.978 0 111.98 1.978zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.204 24 24 23.225 24 22.271V1.729C24 .774 23.204 0 22.225 0z" />
              </svg>
            </a>
          </div>

          {/* Back Button */}
          <div
            onClick={() => setShowContact(false)}
            className="inline-block overflow-visible mt-10 mb-8 px-1"
          >
            <div className="text-[13vw] font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3] cursor-pointer">
              BACK
            </div>
          </div>
        </div>
      )}

      {showPrivacy && (
  <div className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col px-4 pt-20 sm:pt-28 overflow-y-auto">
    <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-[#1e1e1e]"></div>
    <div
      onClick={() => setShowPrivacy(false)}
      className="absolute top-0 left-5 text-[80px] font-inter text-[#fafafa] cursor-pointer select-none leading-[1.25]"
    >
      &amp;
    </div>
    <div className="flex flex-col gap-6 sm:mt-20 mb-20 px-1 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium">
        Privacy Policy
      </h1>
      <p className="text-lg leading-relaxed">
        DOT & CROSS respects your privacy. We collect only the information
        necessary to respond to inquiries and improve our services. Any data
        shared via contact forms, email, or analytics is never sold or shared
        with third parties, except as required by law.
      </p>
      <p className="text-lg leading-relaxed">
        We use standard web analytics (like Google Analytics) to understand how
        visitors interact with our site. This data is anonymized and used solely
        to improve the experience.
      </p>
      <p className="text-lg leading-relaxed">
        By using our website, you consent to this Privacy Policy. For questions
        or data requests, please contact us at{" "}
        <a
          href="mailto:hi@dotandcross.agency"
          className="underline hover:text-[#42b7e9]"
        >
          hi@dotandcross.agency
        </a>
        .
      </p>
    </div>
    <div
      onClick={() => setShowPrivacy(false)}
      className="inline-block overflow-visible mt-10 mb-8 px-1"
    >
      <div className="text-[13vw] font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3] cursor-pointer">
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

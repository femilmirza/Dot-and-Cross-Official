import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BrandCapabilities.css";
import "@fontsource/inter/900.css";

const capabilitiesData = [
  {
    id: "fullSpectrum",
    title: "Full-Spectrum Branding",
    description:
      "Ideal for start-ups and scale-ups for a durable, investor-ready brand from the ground up.",
    items: [
      "◉ Brand Strategy: Define your purpose, vision, and values.",
      "◉ Verbal Identity: Craft your brand story, tone of voice, key messages, and tagline.",
      "◉ Visual Identity System: Your logo set, color palette, typography, etc.",
      "◉ Brand Playbook: A clear guide on how to use your brand correctly.",
      "◉ Digital Starter Kit: Social media templates, website, email signatures.",
      "◉ Roll-out Support: Help with getting your brand live.",
    ],
  },
  {
    id: "launchReady",
    title: "Launch-Ready Branding",
    description:
      "Tailored for bold ideas on the brink of reveal that need instant credibility and a killer pitch.",
    items: [
      "◉ Everything in Full-spectrum branding plus:",
      "◉ Name checks & trademark screening",
      "◉ Compelling pitch deck",
      "◉ Templates for your launch: social posts, email signature",
      "◉ Domain purchase, website design, development and hosting",
      "◉ Go-live checklist and on-call support during launch week",
    ],
  },
  {
    id: "claritySessions",
    title: "Brand Clarity Sessions",
    description:
      "Great for founders and teams who want quick clarity, direction, or even just validation.",
    items: [
      "◉ Pulse Call (60 min): Quick chat to tackle one challenge.",
      "◉ Clarity Sprint (Half-day): Pre-survey, workshop, 1-page brand summary.",
      "◉ Clarity Intensive (Full day): Everything in the Sprint + customer profiles.",
    ],
  },
  {
    id: "onDemand",
    title: "On-Demand Collateral",
    description:
      "Popular asks: Pitch decks, social media graphics, branded swag, packaging, event designs, and one-off design requests. Pick a bundle or build your own.",
    items: [],
  },
];

const BrandCapabilities = ({ onClose }) => {
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const toggleSection = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <motion.div
      className="page-bg pt-[100px] flex flex-col justify-between min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Black bar background */}
      <div className="absolute top-0 left-0 w-full h-[100px] bg-[#1e1e1e]"></div>

      {/* Clickable & symbol (Home button) */}
      <div
        onClick={onClose}
        className="absolute top-0 left-5 text-[80px] font-inter text-[#fafafa] cursor-pointer select-none leading-[1.25]"
      >
        &amp;
      </div>

      <div className="w-full px-4">
        {/* Title */}
        <motion.h1
          className="inline-block text-fluid font-black uppercase tracking-tight leading-[-0.75] text-[#1e1e1e] mb-6"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          OUR CAPABILITIES
        </motion.h1>

        {/* CTA Button (moved just below title) */}
        <motion.div
          onClick={() =>
            window.open("https://calendly.com/femita-dotandcross/", "_blank")
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block text-2xl md:text-3xl font-black tracking-tight uppercase cursor-pointer transition-all duration-300 bg-[#1e1e1e] text-white hover:bg-[#42b7e9] hover:text-[#1e1e1e] px-8 py-5 mb-10"
        >
          BOOK A FREE DISCOVERY CALL
        </motion.div>

        {/* Accordion */}
        <div className="accordion-container">
          {capabilitiesData.map((section) => {
            const isActive = activeId === section.id;
            const isHovered = hoveredId === section.id;

            return (
              <div key={section.id} className="accordion-item w-full">
                <motion.button
                  layout
                  className={`accordion-header w-full ${
                    isActive || isHovered ? "active-header" : ""
                  }`}
                  onClick={() => toggleSection(section.id)}
                  onMouseEnter={() => setHoveredId(section.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  initial={false}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <span className="inline-block text-5xl sm:text-6xl md:text-7xl font-medium leading-tight px-1">
                    {section.title}
                  </span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        opacity: { duration: 0.3 },
                      }}
                      className="accordion-body w-full"
                    >
                      <motion.p
                        className="inline-block text-2xl sm:text-3xl md:text-4xl font-medium leading-tight px-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {section.description}
                      </motion.p>

                      <motion.ul className="mt-4">
                        {section.items.map((item, idx) => (
                          <motion.li
                            key={idx}
                            className="inline-block text-2xl sm:text-3xl md:text-4xl font-medium leading-tight px-1"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.05 * (idx + 1),
                              duration: 0.4,
                              ease: "easeOut",
                            }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* BACK Button */}
      <div className="px-4 pb-4">
        <div
          onClick={onClose}
          className="text-fluid font-black uppercase tracking-tight leading-[-1.259] text-[#B3B3B3] cursor-pointer inline-block relative group"
        >
          BACK
        </div>
      </div>
    </motion.div>
  );
};

export default BrandCapabilities;

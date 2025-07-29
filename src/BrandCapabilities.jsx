import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BrandCapabilities.css";

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

const BrandCapabilities = ({ onClose, onShowContact }) => {
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
      {/* Top black bar */}
      <div
        onClick={onClose}
        className="fixed inset-x-0 top-0 h-[75px] bg-[#1e1e1e] cursor-pointer z-50"
      />

      <div>
        <motion.h1
          className="page-title"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          OUR CAPABILITIES
        </motion.h1>

        {/* Accordion */}
        <div className="accordion-container">
          {capabilitiesData.map((section) => {
            const isActive = activeId === section.id;
            const isHovered = hoveredId === section.id;

            return (
              <div key={section.id} className="accordion-item">
                <motion.button
                  layout
                  className={`accordion-header ${
                    isActive || isHovered ? "active-header" : ""
                  }`}
                  onClick={() => toggleSection(section.id)}
                  onMouseEnter={() => setHoveredId(section.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  initial={false}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <span>{section.title}</span>
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
                      className="accordion-body"
                    >
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {section.description}
                      </motion.p>

                      <motion.ul>
                        {section.items.map((item, idx) => (
                          <motion.li
                            key={idx}
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

      {/* Bottom CTA + BACK button */}
      <div className="px-4 pb-4 flex flex-col items-start gap-3">
        {/* BIG BOLD CTA styled same as DOT/CROSS/BACK */}
        <div
          onClick={() =>
            window.open("https://calendly.com/femita-dotandcross/", "_blank")
          }
          className="text-fluid font-black uppercase tracking-tight mt-20 leading-[0.8] text-[#1e1e1e] cursor-pointer hover:opacity-70 transition-opacity duration-300"
        >
          BOOK A FREE DISCOVERY CALL
        </div>

        {/* BACK button */}
        <div
          onClick={onClose}
          className="text-fluid font-black uppercase tracking-tight leading-[3] text-[#B3B3B3] cursor-pointer inline-block"
        >
          BACK
        </div>
      </div>
    </motion.div>
  );
};

export default BrandCapabilities;

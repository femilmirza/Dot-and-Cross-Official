import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "@fontsource/inter/900.css";
import { Helmet } from "react-helmet";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

const pageTransition = {
  duration: 0.1,
  ease: [0, 0, 0, 0],
};

const capabilitiesData = [
  {
    id: "BrandClaritySessions",
    title: "BRAND CLARITY SESSIONS",
    color: "#f4eb27",
    description:
      "Designed for founders and teams needing quick clarity, direction or validation.",
    items: [
      "◉ Pulse Call (60 min): Focused chat on one challenge, plus a bullet-point summary",
      "◉ Clarity Sprint (3–4 h): Pre-survey, guided workshop and a 1-page brand blueprint",
      "◉ Clarity Intensive (full day): Everything in the Sprint, plus customer profiles, competitor map and team-alignment deck",
    ],
  },
  {
    id: "brandGlowUp",
    title: "BRAND GLOW UP",
    color: "#83cdb8",
    description:
      "Ideal when your visual identity needs to catch up with your growth.",
    items: [
      "◉ Refreshed logo mark, color palette and typography",
      "◉ Collateral pack: business cards, stationery and mock-ups",
      "◉ Compact style guide with key do’s and don’ts",
    ],
  },
  {
    id: "strategicBrandRefresh",
    title: "STRATEGIC BRAND REFRESH",
    color: "#f36c21",
    description:
      "Perfect for established brands seeking a modern look and sharper messaging.",
    items: [
      "◉ Brand health check: audit of what’s working and what’s not",
      "◉ Opportunity map: where to stand out or lean in",
      "◉ Updated foundation: mission, values, tone and story",
      "◉ Visual tune-up: logo, colors, fonts and design language",
      "◉ Key assets: refreshed homepage, pitch deck and social templates",
      "◉ Roll-out plan: GTM strategy and internal onboarding",
    ],
  },
  {
    id: "fullSpectrumBranding",
    title: "FULL-SPECTRUM BRANDING",
    color: "#42b7e9",
    description:
      "Ideal for start-ups and scale-ups building a durable, investor-ready brand from scratch.",
    items: [
      "◉ Strategy: purpose, vision, values, positioning and GTM strategy",
      "◉ Verbal ID: story arc, tone, messaging pillars and tagline",
      "◉ Visual system: logo suite, palette, type, icons and imagery style",
      "◉ Brand playbook: guidelines, do’s and don’ts, plus a launch checklist",
      "◉ Digital kit: social templates, website framework, email signature and slide styles",
      "◉ Launch support: go-live checklist and week-of on-call assistance",
    ],
  },
  {
    id: "launchReadyBranding",
    title: "LAUNCH-READY BRANDING",
    color: "#f28d7a",
    description:
      "Tailored to ventures on the brink of launch that need instant credibility and a compelling pitch.",
    items: [
      "Includes everything in Full-Spectrum Branding, plus:",
      "◉ Name checks and trademark screening",
      "◉ Custom pitch deck aligned to your story",
      "◉ Launch-day templates: social posts and email signature",
      "◉ Domain registration, website design, development and hosting",
      "◉ Go-live checklist and on-call support during launch week",
    ],
  },
  {
    id: "onDemandCollateralKits",
    title: "ON-DEMAND COLLATERAL KITS",
    color: "#a78bcc",
    description:
      "Perfect for teams needing fast turn-around on individual design assets.",
    items: [
      "◉ Pitch decks and proposals",
      "◉ Social graphics and ad covers",
      "◉ Branded merchandise, packaging and point-of-sale materials",
      "◉ Event assets: banners, signage and wayfinding",
      "◉ Custom one-off design requests",
    ],
  },
];

const BrandCapabilities = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const toggleSection = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-white text-[#1e1e1e] flex flex-col justify-between overflow-y-auto pt-[100px] z-40"
    >
      <Helmet>
        <title>Capabilities – Dot & Cross</title>
        <meta name="description" content="Explore our strategic branding capabilities, from brand identity to creative systems and naming architecture." />
        <link rel="canonical" href="https://dotandcross.agency/capabilities" />
      </Helmet>

      {/* Black top bar behind the buttons */}
      <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-[#1e1e1e] z-[-1]" />

      {/* & Home button */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-0 left-5 text-[60px] sm:text-[80px] font-inter text-[#fafafa] cursor-pointer select-none leading-[1.25] z-50"
      >
        &amp;
      </div>

      <div className="w-full px-4">
        {/* Accordion */}
        <div className="flex flex-col gap-6 w-full mt-4">
          {capabilitiesData.map((section) => {
            const isActive = activeId === section.id;
            const isHovered = hoveredId === section.id;

            return (
              <div key={section.id} className="w-full border-b border-gray-300">
                <motion.button
                  layout
                  className="w-full flex justify-between items-center text-left font-extrabold uppercase transition-all duration-300 px-1 py-4"
                  style={{
                    backgroundColor: isActive || isHovered ? section.color : "transparent",
                    color: "#1e1e1e",
                  }}
                  onClick={() => toggleSection(section.id)}
                  onMouseEnter={() => setHoveredId(section.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  initial={false}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <span className="text-4xl sm:text-3xl md:text-6xl font-medium leading-tight">
                    {section.title}
                  </span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                        opacity: { duration: 0.1 },
                      }}
                      className="w-full"
                    >
                      <motion.p
                        className="block text-3xl sm:text-4xl md:text-4xl font-medium leading-tight px-1"
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
                            className="block text-3xl sm:text-4xl md:text-4xl font-medium leading-tight px-1 mb-2"
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

        {/* CTA Button */}
        <motion.div
          onClick={() =>
            window.open("https://calendly.com/discoverycall-dotandcross/30min", "_blank")
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block text-center text-2xl md:text-3xl font-black uppercase cursor-pointer transition-all duration-300 bg-[#1e1e1e] text-white hover:bg-[#42b7e9] hover:text-[#1e1e1e] px-8 py-5 mt-6 mb-10"
        >
          BOOK A FREE DISCOVERY CALL
        </motion.div>
      </div>

      {/* BACK Button */}
      <div className="inline-block overflow-visible mt-10 mb-8 px-6">
        <div
          onClick={() => navigate("/")}
          className="text-[13vw] font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3] cursor-pointer z-50"
        >
          BACK
        </div>
      </div>
    </motion.div>
  );
};

export default BrandCapabilities;

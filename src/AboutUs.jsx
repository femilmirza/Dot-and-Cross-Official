import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const overlayVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

const pageTransition = {
  duration: 0.1,
  ease: [0, 0, 0, 0],
};

const Ampersand = () => (
  <span style={{ fontFamily: 'Trap', fontWeight: 900 }} aria-hidden="true">
    &amp;
  </span>
);

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col justify-between px-4 pt-[120px] overflow-y-auto"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <Helmet>
        <title>About Us – Dot & Cross</title>
        <meta name="description" content="Learn about the team behind DOT & CROSS and our vision for strategic branding." />
        <link rel="canonical" href="https://dotandcross.agency/about" />
      </Helmet>

      <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-[#1e1e1e] z-0" />

      <div
        onClick={() => navigate(-1)}
        className="absolute top-0 left-5 text-[60px] sm:text-[80px] font-inter text-[#fafafa] cursor-pointer select-none leading-[1.25] z-10"
      >
        <Ampersand />
      </div>

      <div className="flex flex-col gap-10">
        <p className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight px-1">
          Dot & Cross is a strategy-first agency that helps brands find their voice and build clarity.
          <br /><br />
          Brands don’t start out wanting to blend in. But somewhere between the pressure to fit the mold 
          and the fear of being overlooked, many begin to mirror each other.
          <br /><br />
          They speak in the same voice, follow the same formulas, chase the same aesthetics. And over time, 
          that repetition dulls their edge. The distinct purpose they were built on, what made them necessary 
          in the first place fades into the background.
          <br /><br />
          Not because it stopped mattering, but because it got buried under the need to belong. 
          <br /><br />
        </p>
        </div>

      <div className="flex flex-col gap-10">
        <p className="text-4xl sm:text-6xl md:text-7xl font-medium leading-tight px-1">
          Resonate?
        </p>

        <button
          onClick={() => navigate("/capabilities")}
          className="text-4xl sm:text-6xl md:text-7xl border-b-4 border-[#1e1e1e] font-medium leading-tight px-1 w-fit hover:text-[#42b7e9] hover:border-[#42b7e9] transition-all duration-300 cursor-pointer"
        >
          Find Your Way →
        </button>
      </div>

      <div onClick={() => navigate(-1)} className="mt-10 mb-8 px-1 cursor-pointer z-10">
        <div className="text-[13vw] font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3]">
          BACK
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;

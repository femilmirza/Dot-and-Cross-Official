import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Ampersands = () => (
  <span style={{ fontFamily: 'Trap', fontWeight: 400 }} aria-hidden="true">
    &amp;
  </span>
);
const Ampersandl = () => (
  <span style={{ fontFamily: 'Trap', fontWeight: 900 }} aria-hidden="true">
    &amp;
  </span>
);
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

const pageTransition = {
  duration: 0.1,
  ease: [0, 0, 0, 0],
};

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col px-4 pt-20 sm:pt-28 overflow-y-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Top black bar */}
      <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-[#1e1e1e] z-[-1]" />

      {/* Close (&) button */}
      <div
        onClick={() => navigate(-1)}
        className="absolute top-0 left-5 text-[60px] sm:text-[80px] text-[#fafafa] cursor-pointer select-none leading-[1.25]"
      >
        <Ampersandl />
      </div>

      {/* Privacy Policy content */}
      <div className="flex flex-col gap-6 sm:mt-20 mb-20 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium pt-10 sm:pt-1 md:pt-1">
          Privacy Policy
        </h1>

        <p className="text-lg leading-relaxed">
          DOT <Ampersands /> CROSS respects your privacy. We collect only the information
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

      {/* Back button */}
      <div
        onClick={() => navigate(-1)}
        className="inline-block overflow-visible mt-10 mb-8 px-1 cursor-pointer"
      >
        <div className="text-[14vw] sm:text-[10vw] font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3]">
          BACK
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;

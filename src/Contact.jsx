import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";


const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

const pageTransition = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1],
};

const Ampersand = () => (
  <span style={{ fontFamily: 'Trap', fontWeight: 900 }} aria-hidden="true">
    &amp;
  </span>
);

const Contacts = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] flex flex-col justify-between overflow-y-auto pt-[100px] z-40"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Helmet>
        <title>Contact – Dot & Cross</title>
        <meta name="description" content="Get in touch with DOT & CROSS. We're ready to help align your brand with purpose and clarity." />
        <link rel="canonical" href="https://dotandcross.agency/contact" />
      </Helmet>

      {/* Black top bar behind buttons */}
      <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-[#1e1e1e] z-[-1]" />

      {/* & Home button */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-0 left-5 text-[60px] sm:text-[80px] font-inter text-[#fafafa] cursor-pointer select-none leading-[1.25] z-50"
      >
        <Ampersand />
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-start gap-1 mt-4 sm:mt-6 md:mt-8 mb-6 px-4">
        <a
          href="mailto:hi@dotandcross.agency"
          className="block text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight hover:opacity-80 transition-opacity duration-200 break-words cursor-pointer"
        >
          hi@dotandcross.agency
        </a>
        <a
          href="tel:+971521612390"
          className="block text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight hover:opacity-80 transition-opacity duration-200 cursor-pointer"
        >
          +971 52 161 2390
        </a>
        <a
          href="https://maps.app.goo.gl/F79xDWS4qsbTLUL5A"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight hover:opacity-80 transition-opacity duration-200 cursor-pointer"
        >
          MBZ City, Abu Dhabi, UAE
        </a>
        
        <motion.div
                onClick={() =>
                  window.open("https://calendly.com/discoverycall-dotandcross/30min", "_blank")
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block text-center text-2xl md:text-3xl font-black uppercase cursor-pointer transition-all duration-300 bg-[#1e1e1e] text-white hover:bg-[#42b7e9] hover:text-[#1e1e1e] whitespace-nowrap text-sm px-8 py-5 mt-6 mb-10"
              >
                BOOK A FREE DISCOVERY CALL
      </motion.div>
      
      </div>

      

      {/* Social Icons */}
      <div className="fixed bottom-6 right-6 flex gap-4">
        <a
          href="https://www.instagram.com/dotandcross.ae/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-[#1e1e1e] hover:scale-110 transition-transform duration-200"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/company/dot-and-cross-creative/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-[#1e1e1e] hover:scale-110 transition-transform duration-200"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://wa.me/971521612390"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-[#1e1e1e] hover:scale-110 transition-transform duration-200"
        >
          <FaWhatsapp />
        </a>
      </div>
      
      {/* BACK Button */}
      <div className="inline-block overflow-visible mt-10 mb-8 px-4">
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

export default Contacts;

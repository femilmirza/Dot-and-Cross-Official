// components/RepelText.jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const RepelText = ({ text, onClick }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(useTransform(mouseX, [-100, 0, 100], [30, 0, -30]), {
    stiffness: 300,
    damping: 30,
  });

  const y = useSpring(useTransform(mouseY, [-100, 0, 100], [30, 0, -30]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      className="text-fluid font-black uppercase tracking-tight leading-[0.75] cursor-pointer bg-[#F8F8F8] inline-block"
    >
      {text}
    </motion.div>
  );
};

export default RepelText;

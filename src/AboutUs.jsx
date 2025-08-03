import React from "react";

const AboutUs = ({ onClose, onFindYourWay }) => {
  return (
    <div className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col justify-between px-4 pt-[120px] overflow-y-auto">
      {/* Black bar background */}
      <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-[#1e1e1e]"></div>

      {/* Clickable & symbol (Home button only) */}
      <div
        onClick={onClose}
        className="absolute top-0 left-5 text-[60px] sm:text-[80px] font-inter text-[#fafafa] cursor-pointer select-none leading-[1.25]"
      >
        &amp;
      </div>

      {/* Content */}
      <div className="flex flex-col gap-10">
        {/* BODY */}
        <p className="inline-block text-4xl sm:text-5xl md:text-6xl font-medium leading-[1] px-1">
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
          Resonate?
        </p>

        {/* BUTTON */}
        <button
          onClick={() => {
            onClose(); // Close About overlay
            onFindYourWay(); // Open Contact/Capabilities overlay
          }}
          className="inline-block text-4xl text-left sm:text-6xl md:text-7xl border-b-4 border-[#1e1e1e] font-medium leading-tight 0 px-1 w-fit one-line hover:text-[#42b7e9] hover:border-[#42b7e9] transition-all duration-300"
        >
          Find Your Way →
        </button>
      </div>

      {/* BACK Button */}
      <div onClick={onClose} className="inline-block overflow-visible mt-10 mb-8 px-1">
        <div className="text-[13vw] font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3] cursor-pointer">
          BACK
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

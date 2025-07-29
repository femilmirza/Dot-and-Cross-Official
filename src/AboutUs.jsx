import React from "react";

const AboutUs = ({ onClose, onFindYourWay }) => {
  return (
    <div className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col justify-between px-4 py-20 overflow-y-auto">
      {/* Content */}
      <div className="flex flex-col gap-10">
        {/* HERO */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight uppercase">
          Dot & Cross is a strategy-first agency that helps brands find their voice and build clarity.
        </h1>

        {/* BODY */}
        <p className="text-lg sm:text-xl md:text-medium leading-relaxed max-w-4xl">
          Brands don’t start out wanting to blend in. But somewhere between the pressure to fit the mold 
          and the fear of being overlooked, many begin to mirror each other.
          <br /><br />
          They speak in the same voice, follow the same formulas, chase the same aesthetics. And over time, 
          that repetition dulls their edge. The distinct purpose they were built on, what made them necessary 
          in the first place fades into the background.
          <br /><br />
          Not because it stopped mattering, but because it got buried under the need to belong. Resonate?
        </p>

        {/* BUTTON */}
        <button
          onClick={() => {
            onClose(); // Close About overlay
            onFindYourWay(); // Open Contact overlay
          }}
          className="inline-block text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1e1e1e] border-b-2 border-[#1e1e1e] hover:opacity-80 transition-opacity duration-200 w-fit"
        >
          Find Your Way →
        </button>
      </div>

      {/* BACK Button */}
      <div onClick={onClose} className="inline-block overflow-visible mt-10">
        <div className="text-fluid font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3] cursor-pointer inline-block">
          BACK
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

import React from "react";
import { useNavigate } from "react-router-dom";

const Philosophy = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col justify-between px-4 pt-[120px] overflow-y-auto">
      {/* Black bar background */}
      <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-[#1e1e1e]"></div>

      {/* Clickable & symbol (Home button) */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-0 left-5 text-[60px] sm:text-[80px] font-inter text-[#fafafa] cursor-pointer select-none leading-[1.25]"
      >
        &amp;
      </div>

      {/* Philosophy Content */}
      <div className="flex flex-col gap-10">
        <div className="inline-block text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight px-1 space-y-5">          
          <p>
            <span className="font-medium underline">
              Authenticity is the strongest magnet
            </span>{" "}
            <br />
            <span className="font-medium text-2xl sm:text-3xl md:text-4xl">
              Authenticity is a brand's true self, unfiltered by trends or borrowed identities.
            </span>
          </p>

          <p>
            <span className="font-medium underline">
              Honesty always wins.
            </span>{" "}
            <br />
            <span className="font-medium text-2xl sm:text-3xl md:text-4xl">
              The strongest brand story is the one that’s true.
            </span>
          </p>

          <p>
            <span className="font-medium underline">Purpose is Power</span>
            <br />
            <span className="font-medium text-2xl sm:text-3xl md:text-4xl">
              A brand without true purpose is merely a business. Its real strength comes from a genuine reason for being, driving every action and connection.
            </span>
          </p>

          <p>
            <span className="font-medium underline">It starts within</span>
            <br />
            <span className="font-medium text-2xl sm:text-3xl md:text-4xl">
              A brand's external voice is only as strong as its internal alignment. Real power comes from a shared purpose, lived by everyone, not just declared outwardly.
            </span>
          </p>

          <p>
            <span className="font-medium underline">50/50</span>
            <br />
            <span className="font-medium text-2xl sm:text-3xl md:text-4xl">
              Branding is a decision-making tool. We’ll do our half–Strategy, clarity and direction. The rest is yours to live.
            </span>
          </p>

          <p>
            <span className="font-medium underline">
              Humans are intuitive and emotional so are brands
            </span>
            <br />
            <span className="font-medium text-2xl sm:text-3xl md:text-4xl">
              People connect with feeling, not formulas. Brands should do the same. When they tap into genuine emotion, they forge a bond that goes far deeper than any calculated strategy.
            </span>
          </p>
        </div>
      </div>

      {/* BACK Button */}
      <div
        onClick={() => navigate("/")}
        className="inline-block overflow-visible mt-10 mb-8 px-1"
      >
        <div className="text-[13vw] font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3] cursor-pointer">
          BACK
        </div>
      </div>
    </div>
  );
};

export default Philosophy;

import React from "react";
import { useNavigate } from "react-router-dom";

const Philosophy = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col justify-between px-4 pt-[120px] overflow-y-auto">
      {/* Black bar background */}
      <div className="absolute top-0 left-0 w-full h-[100px] bg-[#1e1e1e]"></div>

      {/* Clickable & symbol (Home button) */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-0 left-5 text-[80px] font-inter text-[#fafafa] cursor-pointer select-none leading-[1.25]"
      >
        &amp;
      </div>

      {/* Philosophy Content */}
      <div className="flex flex-col mt-8 mb-10">
        <div className="inline-block text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight px-1 space-y-8">
          <p>
            <u>Authenticity is the strongest magnet</u> <br />
            Authenticity is a brand's true self, unfiltered by trends or borrowed identities.
          </p>
          <p>
            <u>Honesty always wins.</u> <br />
            The strongest brand story is the one that’s true.
          </p>
          <p>
            <u>Purpose is Power</u><br />
            A brand without true purpose is merely a business. Its real strength comes from a genuine reason for being, driving every action and connection.
          </p>
          <p>
            <u>It starts within</u> <br />
            A brand's external voice is only as strong as its internal alignment. Real power comes from a shared purpose, lived by everyone, not just declared outwardly.
          </p>
          <p>
            <u>50/50</u> <br />
            Branding is a decision-making tool. We’ll do our half–Strategy, clarity and direction. The rest is yours to live.
          </p>
          <p>
            <u>Humans are intuitive and emotional so are brands</u> <br />
            People connect with feeling, not formulas. Brands should do the same. When they tap into genuine emotion, they forge a bond that goes far deeper than any calculated strategy.
          </p>
        </div>
      </div>

      {/* BACK Button */}
      <div
        onClick={() => navigate("/")}
        className="inline-block overflow-visible mt-10 mb-10"
      >
        <div className="text-fluid font-black font-inter uppercase tracking-tight leading-[0.25] text-[#B3B3B3] cursor-pointer inline-block">
          BACK
        </div>
      </div>
    </div>
  );
};

export default Philosophy;

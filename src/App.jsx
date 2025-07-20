import React, { useState, useEffect } from 'react';
import './index.css';

const Line = ({ text, onClick }) => {
  const isInteractive = text === 'HERE';

  const renderText = () => {
    if (text === 'CROSS') {
      return (
        <>
          CR
          <span className="o-inward">
            <span className="o-letter">O</span>
          </span>
          SS
        </>
      );
    }
    if (text === 'DOT &') {
      return (
        <>
          DOT <span className="font-inter">&</span>
        </>
      );
    }
    return text;
  };

  return (
    <div className={isInteractive ? 'inline-block overflow-visible' : 'block overflow-visible'}>
      <div
        onClick={isInteractive ? onClick : undefined}
        className={`text-fluid font-black uppercase tracking-tight leading-[0.75] transition-opacity duration-300 ${
          isInteractive ? 'hover-fade cursor-pointer inline-block' : ''
        }`}
      >
        {renderText()}
      </div>
    </div>
  );
};

const App = () => {
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showContact ? 'hidden' : 'auto';
  }, [showContact]);

  return (
    <div className="bg-[#F8F8F8] text-[#1e1e1e] min-h-screen cursor-crosshair transition-all duration-700 ease-in-out px-1 pt-[1vh] flex flex-col gap-[-0.75em]">
      {/* Top black bar (click to close) */}
      {showContact && (
        <div
          onClick={() => setShowContact(false)}
          className="fixed inset-x-0 top-0 h-[75px] bg-[#1e1e1e] cursor-pointer z-50"
        />
      )}

      {/* Main navigation lines */}
      <Line text="DOT &" />
      <Line text="CROSS" />
      <Line text="BRANDS" />
      <Line text="START" />
      <Line text="HERE" onClick={() => setShowContact(!showContact)} />

      {/* Contact Info Overlay */}
      {showContact && (
        <div className="fixed inset-0 bg-[#F8F8F8] text-[#1e1e1e] z-40 flex flex-col justify-between px-1 py-40">
          {/* Top-left contact links */}
          <div className="flex flex-col items-start gap-1">
            <a
              href="mailto:hi@dotandcross.agency"
              className="inline-block text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight hover:opacity-80 transition-opacity duration-200 px-1"
            >
              hi@dotandcross.agency
            </a>
            <a
              href="tel:+971521612390"
              className="inline-block text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight px-1 hover:opacity-80 transition-opacity duration-200"
            >
              +971 52 161 2390
            </a>
            <a
              href="https://maps.app.goo.gl/F79xDWS4qsbTLUL5A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-5xl sm:text-6xl md:text-7xl font-semibold px-1 inline-block hover:opacity-80 transition-opacity duration-200"
            >
              MBZ City, Abu Dhabi, UAE
            </a>
          </div>

          {/* Bottom-left BACK button */}
          <div onClick={() => setShowContact(false)} className="inline-block overflow-visible">
            <div className="text-fluid font-black uppercase tracking-tight leading-[1.25] text-[#B3B3B3] cursor-pointer inline-block">
              BACK
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

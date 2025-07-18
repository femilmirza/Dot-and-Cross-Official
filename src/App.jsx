import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [showContact, setShowContact] = useState(false);

  // Lock scroll when contact is shown
  useEffect(() => {
    document.body.style.overflow = showContact ? 'hidden' : 'auto';
  }, [showContact]);

  return (
    <div className="bg-[#C6C6C6] text-[#1E1E1E] min-h-screen overflow-hidden cursor-crosshair transition-all duration-700 ease-in-out">

      {/* Top Line to Close Contact Section */}
      {showContact && (
        <div
          onClick={() => setShowContact(false)}
          className="fixed top-0 left-0 w-full h-[75px] bg-[#C6C6C6] cursor-pointer z-50"
          title="Back to Home"
        ></div>
      )}

      {/* Main Content */}
      <div
        className={`transition-transform duration-700 ease-in-out flex flex-col items-start px-6 ${
          showContact ? '-translate-y-[40vh]' : ''
        }`}
      >
        {/* DOT & CROSS */}
        <div className="space-y-[-5vw]">
          <div className="flex items-center space-x-1 text-fluid font-extrabold uppercase tracking-tight font-inter">
            <span>DOT</span>
            <span className="relative">
              <span className="absolute inset-0 bg-[#42b7e9] z-0 w-full h-full"></span>
              <span className="relative z-10 text-white">&</span>
            </span>
          </div>
          <div className="text-fluid font-extrabold uppercase tracking-tight font-inter">
            CROSS
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-[-5vw] space-y-[-5vw] text-fluid font-extrabold uppercase tracking-tight font-inter">
          <div>BRANDS</div>
          <div>START</div>

          {/* HERE Button */}
          <div
            onClick={() => setShowContact(!showContact)}
            className="relative z-20"
          >
            <div
              className={`cursor-pointer hover:opacity-60 transition-transform duration-500 ease-in-out ${
                showContact ? 'translate-y-[90vh]' : 'translate-y-0'
              }`}
            >
              HERE
            </div>
          </div>
        </div>
      </div>

      {/* Contact Overlay Section */}
      <div
        className={`fixed left-0 top-0 w-full h-screen flex flex-col items-start justify-center px-6 text-left transition-all duration-700 bg-[#1E1E1E] text-[#C6C6C6] z-10 ${
          showContact ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <p className="text-6xl font-semibold mb-4">hi@dotandcross.agency</p>
        <p className="text-6xl font-semibold mb-4">+97 156 933 0515</p>
        <p className="text-6xl font-medium">M1, C231, ME12, MBZ City, Abu Dhabi, UAE</p>
      </div>
    </div>
  );
};

export default App;

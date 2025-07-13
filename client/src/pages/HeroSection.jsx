import React from 'react';
import { FaCogs } from 'react-icons/fa';
import '../assets/animation.css';

export default function HeroSection() {
  return (
    <section className="relative w-full h-140 bg-gradient-to-br from-black via-indigo-950 to-indigo-900 flex items-center justify-center overflow-hidden px-6">

      {/* Left Text */}
      <div className="flex-1 max-w-2xl z-10 text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
          Welcome to <span className="text-indigo-400">EasyKaaj</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8">
          All your daily tools — from PDFs to QR codes — in one smart, fast, and ad-free place.
        </p>
        <a
          href="#tools"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
        >
          Explore Tools
        </a>
      </div>

      {/* Right: Gears cluster */}
      <div className="flex-1 hidden md:flex justify-center items-center">
        <div className="gears-container">
          <div className="gear-big">
            <FaCogs size="100%" />
          </div>
          <div className="gear-small">
            <FaCogs size="100%" />
          </div>
          <div className="gear-medium">
            <FaCogs size="100%" />
          </div>
        </div>
      </div>

    </section>
  );
}

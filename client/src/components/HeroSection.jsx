import React from 'react';
import { FaCogs, FaToolbox, FaLightbulb,FaTools } from 'react-icons/fa';
import '../assets/animation.css';

export default function HeroSection() {
    return (
        <section className="relative w-full h-140 bg-gradient-to-br from-black via-indigo-950 to-indigo-900 flex items-center justify-center overflow-hidden px-9">

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
                    className="inline-block bg-indigo-200 hover:bg-indigo-700 transition-colors text-black font-semibold py-3 px-6 rounded-xl shadow-lg"
                >
                    Explore Tools
                </a>
            </div>

            {/* Right: Gears cluster */}
            <div className="flex-1 hidden md:flex justify-center items-center">
  <div className="gears-container relative w-[300px] h-[260px]">

    {/* 💡 Glowing Rotated Bulb */}
    <div className="absolute -top-8 -left-15 rotate-[160deg] text-yellow-400 text-6xl drop-shadow-[0_0_20px_rgba(250,204,21,0.9)] animate-pulse ">
  {/* Wire (as a div behind bulb) */}
  <div className="absolute w-[2px] h-12 bg-gray-600 top-full left-1/2 -translate-x-1/2 rotate-[20deg] origin-top z-[-1] text-yellow-400 animate-flicker  " />
  <FaLightbulb />
</div>

    {/* ⚙️ Big Gear */}
    <div className="gear-big drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]">
      <FaCogs size="100%" />
    </div>

    {/* ⚙️ Small Gear */}
    <div className="gear-small drop-shadow-[0_0_10px_rgba(129,140,248,0.4)]">
      <FaCogs size="100%" />
    </div>

    {/* ⚙️ Medium Gear */}
    <div className="gear-medium drop-shadow-[0_0_10px_rgba(67,56,202,0.4)]">
      <FaCogs size="100%" />
    </div>

    {/* 🧰 Toolbox - Floating & Glowing */}
    <div className="absolute top-[220px] left-[40px] text-indigo-400 text-[70px] drop-shadow-[0_0_15px_rgba(129,140,248,0.4)] animate-bounce-slow">
      < FaTools/>
    </div>
    <div className="absolute top-[160px] left-[-60px] text-indigo-400 text-[90px] drop-shadow-[0_0_15px_rgba(129,140,248,0.4)] animate-bounce-slow">
      <FaToolbox />
    </div>

  </div>
</div>


        </section>
    );
}

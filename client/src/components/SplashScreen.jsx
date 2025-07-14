// src/components/SplashScreen.jsx
import { useEffect, useState } from 'react';
import { FaTools } from 'react-icons/fa';
import '../assets/animation.css';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-black to-indigo-950 flex flex-col items-center justify-center text-white z-[9999]">
      <div className="flex flex-col items-center animate-fade-in">
        <FaTools className="text-yellow-400 text-5xl mb-4 animate-spin-slow" />
        <h1 className="text-4xl md:text-6xl font-bold tracking-wider">EasyKaaj</h1>
        <p className="mt-2 text-sm md:text-lg text-indigo-200 tracking-wide">Your All-in-One Smart Toolbelt</p>
      </div>
    </div>
  );
}

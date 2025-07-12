import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indbg-gradient-to-r from-indigo-800 to-indigo-600 
  hover:from-indigo-700 hover:to-indigo-900 
  transition-all duration-[1500ms] ease-[cubic-bezier(0.83,0,0.17,1)]
  shadow-sm sticky top-0 z-50igo-700 hover:to-indigo-900 transition-all duration-900 ... shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <a href="/" className="text-2xl font-extrabold text-white tracking-wide">
          EasyKaaj
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6">
          <a href="/" className="text-white hover:text-blue-200 font-medium transition duration-200">Home</a>
          <a href="/tools" className="text-white hover:text-blue-200 font-medium transition duration-200">Tools</a>
          <a href="/about" className="text-white hover:text-blue-200 font-medium transition duration-200">About</a>
          <a href="/contact" className="text-white hover:text-blue-200 font-medium transition duration-200">Contact</a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-blue-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {/* Hamburger icon */}
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu: show only if isOpen */}
      {isOpen && (
        <div className="md:hidden bg-transparent px-6 pb-4 space-y-2 shadow-md">
          <a href="/" className="block text-white hover:text-blue-700 font-medium transition duration-200">Home</a>
          <a href="/tools" className="block text-white hover:text-blue-700 font-medium transition duration-200">Tools</a>
          <a href="/about" className="block text-white hover:text-blue-700 font-medium transition duration-200">About</a>
          <a href="/contact" className="block text-white hover:text-blue-700 font-medium transition duration-200">Contact</a>
        </div>
      )}
    </nav>
  );
}

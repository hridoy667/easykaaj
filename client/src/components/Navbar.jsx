import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfDropdownOpen, setPdfDropdownOpen] = useState(false);

  // List of PDF tools
  const pdfTools = [
    { name: 'Text to PDF', link: '/pdf' },
    { name: 'Image to PDF', link: '/imgtopdf' },
    { name: 'PDF Compressor', link: '/pdf-compressor' },
    { name: 'Merge PDFs', link: '/merge-pdf' },
    { name: 'Pdf text Extractor', link: '/pdf-text-extractor' },
  ];

  return (
    <nav className="bg-indigo-900/40 backdrop-blur-lg border-b border-white/10 shadow-md sticky top-0 z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <a href="/" className="text-2xl font-extrabold text-white tracking-wide">
          EasyKaaj
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6 items-center relative">
          <a href="/" className="text-white hover:text-blue-200 font-medium transition duration-200">
            Home
          </a>
          <a href="/tools" className="text-white hover:text-blue-200 font-medium transition duration-200">
            Tools
          </a>

          {/* PDF Tools Dropdown */}
          <div
            onMouseEnter={() => setPdfDropdownOpen(true)}
            onMouseLeave={() => setPdfDropdownOpen(false)}
            className="relative"
          >
            <button
              className="text-white hover:text-blue-200 font-medium transition duration-200 flex items-center"
              onClick={() => setPdfDropdownOpen(!pdfDropdownOpen)}
              type="button"
              aria-haspopup="true"
              aria-expanded={pdfDropdownOpen}
            >
              PDF Tools
              <svg
                className="ml-1 w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.516 7.548l4.484 4.484 4.484-4.484" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {pdfDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-indigo-900 rounded-md shadow-lg z-50">
                <ul className="py-2">
                  {pdfTools.map((tool) => (
                    <li key={tool.name}>
                      <a
                        href={tool.link}
                        className="block px-4 py-2 text-white hover:bg-indigo-700 transition"
                      >
                        {tool.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <a href="/about" className="text-white hover:text-blue-200 font-medium transition duration-200">
            About
          </a>
          <a href="/contact" className="text-white hover:text-blue-200 font-medium transition duration-200">
            Contact
          </a>
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
          <a href="/" className="block text-white hover:text-blue-700 font-medium transition duration-200">
            Home
          </a>
          <a href="/tools" className="block text-white hover:text-blue-700 font-medium transition duration-200">
            Tools
          </a>

          {/* Mobile PDF Tools Dropdown */}
          <div>
            <button
              onClick={() => setPdfDropdownOpen(!pdfDropdownOpen)}
              className="w-full text-left text-white hover:text-blue-700 font-medium transition duration-200 flex items-center justify-between"
              type="button"
              aria-haspopup="true"
              aria-expanded={pdfDropdownOpen}
            >
              PDF Tools
              <svg
                className={`ml-2 w-4 h-4 fill-current transform transition-transform duration-300 ${
                  pdfDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.516 7.548l4.484 4.484 4.484-4.484" />
              </svg>
            </button>

            {pdfDropdownOpen && (
              <ul className="pl-4 mt-2 space-y-1">
                {pdfTools.map((tool) => (
                  <li key={tool.name}>
                    <a
                      href={tool.link}
                      className="block px-4 py-2 text-white hover:bg-indigo-700 rounded-md transition"
                    >
                      {tool.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a href="/about" className="block text-white hover:text-blue-700 font-medium transition duration-200">
            About
          </a>
          <a href="/contact" className="block text-white hover:text-blue-700 font-medium transition duration-200">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}

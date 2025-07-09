export default function Navbar() {
    return (
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo / Brand */}
          <a href="/" className="text-2xl font-extrabold text-blue-700 tracking-wide">
            EasyKaaj
          </a>
  
          {/* Navigation Links */}
          <div className="hidden md:flex gap-6">
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition duration-200">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition duration-200">Tools</a>
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition duration-200">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition duration-200">Contact</a>
          </div>
  
          {/* Optional Mobile Menu Icon (future feature) */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-700">
              {/* You can later add hamburger icon here */}
              ☰
            </button>
          </div>
        </div>
      </nav>
    )
  }
  
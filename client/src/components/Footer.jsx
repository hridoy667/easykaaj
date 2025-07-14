import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-indigo-800 via-indigo-900 to-black/90 backdrop-blur-md text-white py-5 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / Logo */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 tracking-widest">
            EasyKaaj
          </h2>
          <p className="text-indigo-300 max-w-sm leading-relaxed">
            Smart, fast, and free tools to boost your productivity. No logins, no hassle.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-indigo-200">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/tools" className="hover:text-white transition">Tools</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
          <div className="flex space-x-5 mb-6">
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaTwitter size={24} />
            </a>
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              <FaFacebookF size={24} />
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
              <FaLinkedinIn size={24} />
            </a>
          </div>
          <p className="text-indigo-400 text-sm">
            &copy; {new Date().getFullYear()} EasyKaaj. All rights reserved.
          </p>
          <p className="text-indigo-400 text-sm">
            Designed and Developed by <a href="https://facebook.com/aliimam.hridoy" target='blank'>Ali Imam Hridoy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

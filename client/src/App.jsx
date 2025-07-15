import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MergePdfPage from './pages/MergePdfPage';
import Home from './pages/Home'
import Tools from './pages/Tools';
import QRCodePage from './pages/QRCodePage'
import AgeCalculatorPage from './pages/AgeCalculatorPage'
import PDFPage from './pages/PDFPage'
import CurrencyConverterPage from './pages/CurrencyConverterPage'
import UrlShortenerPage from './pages/UrlShortenerPage'
import QRScanner from './pages/QRScanner'
import ImageToPdfPage from './pages/ImageToPdfPage'
import PDFCompressorPage from './pages/PDFCompressorPage'
import KeyboardTesterPage from './pages/KeyboardTesterPage';
import ImageCompressorPage from './pages/ImageCompressor'; 
import PDFTextExtractor from './pages/PDFTextExtractor';
import About from './pages/About';


export default function App() {
  return (
    <div className="bg-gradient-to-b from-indigo-950 to-indigo-900 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about" element={<About />} />
        <Route path="/qr" element={<QRCodePage />} />
        <Route path="/pdf" element={<PDFPage />} />
        <Route path="/shorten" element={<UrlShortenerPage />} />
        <Route path="/qrscanner" element={<QRScanner />} />
        <Route path="/imgtopdf" element={<ImageToPdfPage />} />
        <Route path="/image-compressor" element={<ImageCompressorPage />} />  
        <Route path="/age" element={<AgeCalculatorPage />} />
        <Route path="/currency" element={<CurrencyConverterPage />} />
        <Route path="/pdf-compressor" element={<PDFCompressorPage />} />
        <Route path="/merge-pdf" element={<MergePdfPage />} />
        <Route path="/keyboard-tester" element={<KeyboardTesterPage />} />
        <Route path="/pdf-text-extractor" element={<PDFTextExtractor />} />
      </Routes>
    </div>
  );
}

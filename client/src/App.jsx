import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import QRCodePage from './pages/QRCodePage'
import AgeCalculatorPage from './pages/AgeCalculatorPage'
import PDFPage from './pages/PDFPage'
import CurrencyConverterPage from './pages/CurrencyConverterPage'
import UrlShortenerPage from './pages/UrlShortenerPage';
import QRScanner from './pages/QRScanner';
import ImageToPdfPage from './pages/ImageToPdfPage';
import PDFCompressorPage from './pages/PDFCompressorPage';


export default function App() {
  return (
    <div className="bg-gradient-to-b from-indigo-950 to-indigo-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qr" element={<QRCodePage />} />
        <Route path="/pdf" element={<PDFPage />} />
        <Route path="/shorten" element={<UrlShortenerPage />} />
        <Route path="/qrscanner" element={<QRScanner />} />
        <Route path="/imgtopdf" element={<ImageToPdfPage />} />
        <Route path="/age" element={<AgeCalculatorPage />} />
        <Route path="/currency" element={<CurrencyConverterPage />} />
        <Route path="/pdf-compressor" element={<PDFCompressorPage />} />
      </Routes>


    </div>
  )
}

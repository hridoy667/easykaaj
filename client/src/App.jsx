import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import QRCodePage from './pages/QRCodePage'
import AgeCalculatorPage from './pages/AgeCalculatorPage'
import PDFPage from './pages/PDFPage'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qr" element={<QRCodePage />} />
        <Route path="/age" element={<AgeCalculatorPage />} />
        <Route path="/pdf" element={<PDFPage />} />
      </Routes>
    </>
  )
}

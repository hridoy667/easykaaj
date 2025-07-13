import { Link } from 'react-router-dom'
import { 
  FaQrcode, FaCalculator, FaFilePdf, 
  FaDollarSign, FaCut, FaCamera, 
  FaImages, FaCompress 
} from 'react-icons/fa'

const iconMap = {
  'QR Code Generator': <FaQrcode size={48} className="text-indigo-300 drop-shadow-sm" />,
  'QR Scanner': <FaCamera size={48} className="text-indigo-300 drop-shadow-sm" />,
  'Age Calculator': <FaCalculator size={48} className="text-indigo-300 drop-shadow-sm" />,
  'Text to PDF': <FaFilePdf size={48} className="text-indigo-300 drop-shadow-sm" />,
  'Currency Converter': <FaDollarSign size={48} className="text-indigo-300 drop-shadow-sm" />,
  'URL Shortener': <FaCut size={48} className="text-indigo-300 drop-shadow-sm" />,
  'Image to PDF': <FaImages size={48} className="text-indigo-300 drop-shadow-sm" />,
  'PDF Compressor': <FaCompress size={48} className="text-indigo-300 drop-shadow-sm" />,
}

export default function FeatureCard({ title, link, description }) {
  return (
    <Link to={link} className="block">
      <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center">
        {iconMap[title]}
        <h2 className="mt-4 text-xl font-semibold text-white drop-shadow">{title}</h2>
        <p className="mt-2 text-white/80 text-sm">{description}</p>
      </div>
    </Link>
  )
}

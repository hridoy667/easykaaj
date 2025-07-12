import { Link } from 'react-router-dom'
import { FaQrcode, FaCalculator, FaFilePdf, FaDollarSign, FaCut } from 'react-icons/fa'

const iconMap = {
  'QR Code Generator': <FaQrcode size={48} className="text-indigo-600" />,
  'Age Calculator': <FaCalculator size={48} className="text-indigo-600" />,
  'Text to PDF': <FaFilePdf size={48} className="text-indigo-600" />,
  'Currency Converter': <FaDollarSign size={48} className="text-indigo-600" />,
  'URL Shortener': <FaCut size={48} className="text-indigo-600" />
}

export default function FeatureCard({ title, link , description}) {
  return (
    <Link to={link} className="block">
      <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center text-center">
        {iconMap[title]}
        <h2 className="mt-4 text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  )
}

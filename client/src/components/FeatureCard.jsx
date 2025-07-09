import { Link } from 'react-router-dom'

export default function FeatureCard({ title, link }) {
  return (
    <Link to={link} className="block">
      <div className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition duration-200 cursor-pointer text-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
    </Link>
  )
}

import FeatureCard from './FeatureCard'

export default function FeaturesGrid() {
  const features = [
    { title: 'QR Code Generator', link: '/qr' },
    { title: 'Age Calculator', link: '/age' },
    { title: 'Text to PDF', link: '/pdf' },
    { title: 'Currency Converter', link: '/currency' },
    // add more here
  ]

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} title={feature.title} link={feature.link} />
        ))}
      </div>
    </div>
  )
}

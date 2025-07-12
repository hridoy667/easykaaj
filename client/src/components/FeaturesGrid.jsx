import FeatureCard from './FeatureCard';

export default function FeaturesGrid() {
  const features = [
    { title: 'Text to PDF', link: '/pdf', description: 'Convert any text into a downloadable PDF document.' },
    { title: 'QR Code Generator', link: '/qr', description: 'Create custom QR codes quickly and easily.' },
    { title: 'URL Shortener', link: '/shorten', description: 'Turn long URLs into short, shareable links.' },
    { title: 'QR Scanner', link: '/qrscanner', description: 'Scan QR codes using image upload or your device camera.' }, 
    { title: 'Currency Converter', link: '/currency', description: 'Convert currencies with up-to-date exchange rates.' },
    { title: 'Age Calculator', link: '/age', description: 'Calculate your exact age from your birth date.' },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-10 text-center">
        Handy tools you may need to work with
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} title={feature.title} link={feature.link} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
}

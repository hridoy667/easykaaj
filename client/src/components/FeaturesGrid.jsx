import FeatureCard from './FeatureCard';

export default function FeaturesGrid() {
  const features = [
    { title: 'PDF Compressor', link: '/pdf-compressor', description: 'Compress PDF files to reduce their size quickly and easily.' },
    { title: 'Text to PDF', link: '/pdf', description: 'Convert any text into a downloadable PDF document.' },
    { title: 'Merge PDFs', link: '/merge-pdf', description: 'Combine multiple PDFs into a single file.' },
    { title: 'PDF Text Extractor', link: '/pdf-text-extractor', description: 'Extract text from any PDF quickly and easily.' },
    { title: 'Image to PDF', link: '/imgtopdf', description: 'Convert one or more images into a single downloadable PDF.' },
    { title: 'Image Compressor', link: '/image-compressor', description: 'Compress your images quickly without losing quality.' },
    { title: 'URL Shortener', link: '/shorten', description: 'Turn long URLs into short, shareable links.' },
    { title: 'QR Code Generator', link: '/qr', description: 'Create custom QR codes quickly and easily.' },
    { title: 'QR Scanner', link: '/qrscanner', description: 'Scan QR codes using image upload or your device camera.' },
    { title: 'Keyboard Tester', link: '/keyboard-tester', description: 'Test your keyboard and check for malfunctioning keys.' },
    { title: 'Currency Converter', link: '/currency', description: 'Convert currencies with up-to-date exchange rates.' },
    { title: 'Age Calculator', link: '/age', description: 'Calculate your exact age from your birth date.' }, 
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-indigo-900 to-black min-h-screen py-4">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-white mb-5 text-lg md:text-xl font-small text-gray-700 max-w-2xl mx-auto px-4 leading-relaxed">
          From PDFs to QR codes, conversions to calculations — <span className="font-semibold text-blue-200">EasyKaaj</span> brings you a clean, ad-free experience to get things done faster. No logins, no fuss — just smart tools that work instantly, anytime, anywhere.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              link={feature.link}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

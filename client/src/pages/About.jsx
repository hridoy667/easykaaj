export default function About() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-200 flex flex-col items-center px-6 py-16">
        <div className="max-w-4xl bg-white rounded-3xl shadow-xl p-10">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">
            About EasyKaaj
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            EasyKaaj is your one-stop solution for quick and efficient online tools — 
            from PDF converters, QR code generators, currency converters to keyboard testers. 
            Our goal is to simplify your daily digital tasks with an intuitive, ad-free experience.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Built with modern web technologies, EasyKaaj works instantly, anywhere, anytime, 
            no logins required. We continuously add new tools and features to help you get things done faster.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Thank you for choosing EasyKaaj. We hope our tools make your life easier and more productive!
          </p>
        </div>
      </div>
    );
  }
  
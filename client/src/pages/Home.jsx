// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import SplashScreen from '../components/SplashScreen';
import HeroSection from '../components/HeroSection';
import FeaturesGrid from '../components/FeaturesGrid';
import FeedbackForm from '../components/FeedbackForm';
import Footer from '../components/Footer';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <SplashScreen onFinish={() => setShowIntro(false)} />
      ) : (
        <div>
          <HeroSection />
          <FeaturesGrid />
          <FeedbackForm />
          <Footer />
        </div>
      )}
    </>
  );
}

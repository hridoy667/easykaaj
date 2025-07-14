import FeaturesGrid from '../components/FeaturesGrid'
import FeedbackForm from '../components/FeedbackForm'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'

export default function Home() {
  return (
    <div className="">
      <HeroSection/>
      <FeaturesGrid />
      <FeedbackForm/>
      <Footer/>
    </div>
  )
}

import { useState, useEffect } from 'react'
import Footer from './components/custom/Footer'
import Hero from './components/custom/Hero'
import Features from './components/custom/Features'
import Destinations from './components/custom/Destinations'
import Testimonials from './components/custom/Testimonials'
import Newsletter from './components/custom/Newsletter'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Hero />
      <Features />
      <Destinations />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default App
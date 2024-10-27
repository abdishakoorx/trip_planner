import { useState, useEffect } from 'react'
import CenterSection from './components/custom/CenterSection'
import Footer from './components/custom/Footer'
import Hero from './components/custom/Hero'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Hero />
      <CenterSection />
      <Footer />
    </div>
  )
}

export default App
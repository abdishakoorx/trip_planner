export default function Footer() {
  return (
    <footer className="py-8 mt-12 bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col space-y-8 md:flex-row md:justify-between md:items-center md:space-y-0">
          {/* Logo and Description */}
          <div className="max-w-md space-y-4">
            <div className="flex justify-center md:justify-start">
              <img src="/logo1.png" alt="AI TripPlanner Logo" className="h-10 w-60"/>
            </div>
            <p className="leading-relaxed text-center text-gray-400 md:text-left">
              Revolutionizing travel planning with AI-powered personalized itineraries and expert recommendations.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col space-y-6">
            <div className="flex justify-center space-x-6 md:justify-end">
              <a href="#" target="_blank" rel="noopener noreferrer" 
                className="p-3 transition-colors duration-200 rounded-full bg-white/80 hover:bg-gray-600">
                <img src="/facebook.svg" alt="Facebook" className="w-5 h-5"/>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="p-3 transition-colors duration-200 rounded-full bg-white/80 hover:bg-gray-600">
                <img src="/twitter.svg" alt="Twitter" className="w-5 h-5"/>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="p-3 transition-colors duration-200 rounded-full bg-white/80 hover:bg-gray-600">
                <img src="/instagram.svg" alt="Instagram" className="w-5 h-5"/>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="p-3 transition-colors duration-200 rounded-full bg-white/80 hover:bg-gray-600">
                <img src="/youtube.svg" alt="YouTube" className="w-5 h-5"/>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 mt-8 border-t border-gray-700">
          <p className="text-sm text-center text-gray-400">
            &copy; {new Date().getFullYear()} AI Trip Planner.
          </p>
        </div>
      </div>
    </footer>
  )
}
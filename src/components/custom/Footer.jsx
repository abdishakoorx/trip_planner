export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#E6F0FF] to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-8 md:space-y-0">
          {/* Logo and Description */}
          <div className="space-y-4 max-w-md">
            <div className="flex md:justify-start justify-center">
              <img src="/logo.webp" alt="AI TripPlanner Logo" className="h-10 w-60"/>
            </div>
            <p className="text-gray-700 leading-relaxed text-center md:text-left">
              Revolutionizing travel planning with AI-powered personalized itineraries and expert recommendations.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col space-y-6">
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="#" target="_blank" rel="noopener noreferrer" 
                className="bg-white/80 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200">
                <img src="/facebook.svg" alt="Facebook" className="h-5 w-5"/>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="bg-white/80 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200">
                <img src="/twitter.svg" alt="Twitter" className="h-5 w-5"/>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="bg-white/80 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200">
                <img src="/instagram.svg" alt="Instagram" className="h-5 w-5"/>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="bg-white/80 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200">
                <img src="/youtube.svg" alt="YouTube" className="h-5 w-5"/>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} AI Trip Planner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
import { Check } from 'lucide-react'

function CenterSection() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">Experience Travel Planning Across All Devices</h2>
        <div className="flex items-center justify-center mb-16">
          <div className="flex-shrink-0 w-1/4">
            <img src="/phone.png" alt="Phone view" className="w-full h-auto" />
          </div>
          <div className="flex-shrink-0 w-1/2 px-8">
            <img src="/laptop.png" alt="Laptop view" className="w-full h-auto" />
          </div>
          <div className="flex-shrink-0 w-1/4">
            <img src="/tablet.png" alt="Tablet view" className="w-full h-auto" />
          </div>
        </div>
        <div className="mb-16 text-center">
          <h3 className="mb-4 text-2xl font-semibold">Seamless Experience on Every Device</h3>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Whether you&apos;re planning on your laptop, checking details on your phone, or browsing on your tablet, 
            our AI-powered travel assistant ensures a consistent and user-friendly experience across all platforms.
          </p>
        </div>
        <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {['Personalized Itineraries', 'Real-time Updates', 'Local Recommendations', 'Seamless Booking', 'Travel Insights', 'Budget Tracking'].map((feature, index) => (
            <div key={index} className="flex items-center p-4 space-x-3 rounded-lg shadow">
              <Check className="flex-shrink-0 text-green-500" />
              <span className="font-medium text-gray-800">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CenterSection
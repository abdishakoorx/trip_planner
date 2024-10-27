import { Button } from "@/components/ui/button"
import { PlaneTakeoff } from 'lucide-react'
import AvatarList from "../ui/avatar"
import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-center bg-cover" style={{ backgroundImage: "url('/travel.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 max-w-5xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          AI-Powered Travel Planning, Tailored Just for You
        </h1>
        <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-200 sm:text-2xl">
          Discover your perfect trip with our intelligent travel assistant. Get personalized itineraries, insider tips, and seamless bookings.
        </p>
        <div className="mt-8">
          <Link to='/create-trip'>
            <Button className="px-8 py-6 text-lg text-white bg-orange-500 hover:bg-orange-600 border-white/20">
              <PlaneTakeoff className="w-6 h-6 mr-2" />
              Start Planning Your Adventure
            </Button>
          </Link>
        </div>
        <AvatarList className="mt-12" />
      </div>
    </section>
  )
}
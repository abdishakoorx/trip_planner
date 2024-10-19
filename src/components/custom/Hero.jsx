import { Button } from "@/components/ui/button";
import { PlaneTakeoff } from 'lucide-react';
import AvatarList from "../ui/avatar";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative">
      <section className="relative h-screen w-full overflow-hidden bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/travel.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            AI-Powered Travel Planning, Tailored Just for You
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8">
            Discover your perfect trip with our intelligent travel assistant. Get personalized itineraries, insider tips, and seamless bookings.
          </p>
          <div className="mt-8">
            <Link to={'/create-trip'}>
              <Button className="bg-secondary/80 text-white hover:bg-secondary/90 border-white/20">
                <PlaneTakeoff className="mr-2 h-5 w-5" />
                Explore Popular Destinations
              </Button>
            </Link>
          </div>
          <AvatarList className="mt-8" />
        </div>
      </section>
    </div>
  );
}
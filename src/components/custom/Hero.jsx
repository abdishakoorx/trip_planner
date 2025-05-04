import React from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-center bg-cover" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)',
          backgroundBlendMode: 'multiply',
          filter: 'brightness(0.6)'
        }}
      />

      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-primary opacity-20 animate-spin-slow"></div>
        <div className="absolute top-[40%] right-[5%] w-48 h-48 rounded-full bg-accent opacity-10 animate-float"></div>
        <div className="absolute bottom-[15%] left-[20%] w-40 h-40 rounded-full bg-secondary opacity-10 animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="container relative flex flex-col justify-center h-full px-4 pb-12 mx-auto pt-28 md:pb-32">
        <div className="max-w-3xl">
          <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl text-shadow">
            <span className="block">Discover Your Perfect</span> 
            <span className="text-secondary-foreground">Adventure with AI</span>
          </h1>
          <p className="max-w-2xl mb-8 text-lg text-white md:text-xl text-shadow md:mb-12">
            Let our AI travel assistant plan your dream vacation. Personalized itineraries, hidden gems, and local insights tailored to your preferences.
          </p>
          
          {/* Search panel */}
          <div className="p-4 mt-8 bg-white shadow-xl rounded-xl md:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Destination" 
                  className="w-full py-3 pl-10 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Month" 
                  className="w-full py-3 pl-10 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button className="flex items-center justify-center h-full px-4 py-3 space-x-2 font-semibold transition-colors rounded-md bg-accent hover:bg-accent/90 text-accent-foreground">
                <Search className="w-5 h-5" />
                <span>Explore Now</span>
              </Button>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-8">
            <div className="px-4 py-2 text-sm text-white rounded-full bg-white/20 backdrop-blur-sm">
              #AI Powered
            </div>
            <div className="px-4 py-2 text-sm text-white rounded-full bg-white/20 backdrop-blur-sm">
              #Personalized
            </div>
            <div className="px-4 py-2 text-sm text-white rounded-full bg-white/20 backdrop-blur-sm">
              #Hidden Gems
            </div>
            <div className="px-4 py-2 text-sm text-white rounded-full bg-white/20 backdrop-blur-sm">
              #Local Insights
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
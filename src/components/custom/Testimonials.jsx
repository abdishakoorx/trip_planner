import React from 'react';
import { Star, Quote } from 'lucide-react';
import AvatarList from '../ui/avatar';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Emma Thompson",
      location: "London, UK",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "Greatertrips completely transformed our family vacation. The AI recommended places I never would have found on my own, and the itinerary was perfectly paced for traveling with kids."
    },
    {
      name: "Michael Chen",
      location: "San Francisco, USA",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      text: "As someone who travels for business frequently, I need efficient planning. This app creates perfect itineraries that maximize my free time while respecting my work commitments."
    },
    {
      name: "Sophie Laurent",
      location: "Paris, France",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      rating: 4,
      text: "I was skeptical about AI planning my romantic getaway, but Greatertrips exceeded my expectations. It found charming local spots that weren't in any guidebook!"
    }
  ];

  return (
    <section className="py-16 md:py-24 gradient-primary text-primary-foreground">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">What Our Travelers Say</h2>
          <p className="max-w-2xl mx-auto text-primary-foreground/80">
            Real experiences from travelers who have explored the world with Greatertrips' AI assistance.
          </p>
        </div>
        
        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 shadow-lg bg-white/10 backdrop-blur-sm rounded-xl"
            >
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-secondary-foreground opacity-80" />
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i + testimonial.rating} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              
              {/* Testimonial text */}
              <p className="mb-6 text-primary-foreground">"{testimonial.text}"</p>
              
              {/* User info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="object-cover w-12 h-12 mr-4 border-2 rounded-full border-white/30"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-primary-foreground/70">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-20 text-center">
          <p className="mb-6 text-primary-foreground/80">Trusted by thousands of travelers worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <AvatarList />
            <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <span className="text-xl font-bold">50K+</span>
              <span className="ml-2 text-sm text-primary-foreground/70">Happy Travelers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
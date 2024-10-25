/* eslint-disable react/prop-types */

import { Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

const Hotels = ({ trip }) => {
  // Helper function to render rating stars
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-200/50" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="mt-8 mb-4 space-y-6 border-t-2 border-blue-300">
      {/* Hotels Section */}
      <h2 className="mt-8 text-3xl font-semibold text-gray-900">Accomodation</h2>
      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trip.tripInfo?.hotels.map((hotel, index) => (
            <Card key={index} className="overflow-hidden transition-shadow bg-transparent hover:shadow-lg">
              <CardContent className="p-4">
                <h4 className="mb-2 text-lg font-semibold text-gray-900">{hotel.name}</h4>
                <div className="flex items-center gap-2 mb-2">
                  {renderRating(parseFloat(hotel.rating))}
                  <span className="text-sm text-gray-600">({hotel.rating})</span>
                </div>
                <p className="mb-2 text-sm text-gray-600">{hotel.address}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="px-3 rounded-full bg-accent hover:bg-accent/90">{hotel.price}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Dining Section */}
      <section className='space-y-6'>
      <h2 className="mt-8 text-3xl font-semibold text-gray-900">Restaurants</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trip.tripInfo?.dining.map((restaurant, index) => (
            <Card key={index} className="mb-4 transition-shadow bg-transparent hover:shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">{restaurant.name}</h4>
                  {/* <span className="text-sm font-medium text-gray-900">{restaurant.price}</span> */}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {renderRating(parseFloat(restaurant.rating))}
                  <span className="text-sm text-gray-600">({restaurant.rating})</span>
                </div>
                <p className="mb-2 text-sm text-gray-600">{restaurant.specialty}</p>
                <div className="flex items-center justify-between mt-3">
                <Badge variant="secondary" className="px-3 rounded-full bg-accent hover:bg-accent/90">
                    {restaurant.type}
                  </Badge>
                  <span className="text-xs text-gray-600">{restaurant.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hotels;
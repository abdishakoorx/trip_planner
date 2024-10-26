/* eslint-disable react/prop-types */
import { Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { useEffect, useState, useCallback } from 'react';
import { GetPlacesInfo } from "@/config/GlobalApi";

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?max_height_px=1000&max_width_px=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const Hotels = ({ trip }) => {
  const [hotelPhotos, setHotelPhotos] = useState({});
  const [restaurantPhotos, setRestaurantPhotos] = useState({});

  const getPlacePhoto = useCallback(async (placeName, type) => {
    const data = {
      textQuery: placeName,
      languageCode: "en",
      maxResultCount: 1
    };

    try {
      const result = await GetPlacesInfo(data);
      if (result.data.places[0]?.photos?.length > 0) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[0].name);
        if (type === 'hotel') {
          setHotelPhotos(prev => ({
            ...prev,
            [placeName]: photoUrl
          }));
        } else {
          setRestaurantPhotos(prev => ({
            ...prev,
            [placeName]: photoUrl
          }));
        }
      }
    } catch (error) {
      console.error(`Error fetching ${type} photo:`, error);
    }
  }, []);

  useEffect(() => {
    // Fetch hotel photos
    if (trip?.tripInfo?.hotels) {
      trip.tripInfo.hotels.forEach(hotel => {
        getPlacePhoto(hotel.name, 'hotel');
      });
    }
    
    // Fetch restaurant photos
    if (trip?.tripInfo?.dining) {
      trip.tripInfo.dining.forEach(restaurant => {
        getPlacePhoto(restaurant.name, 'restaurant');
      });
    }
  }, [trip?.tripInfo?.hotels, trip?.tripInfo?.dining, getPlacePhoto]);

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
      <h2 className="mt-8 text-3xl font-semibold text-gray-900">Accommodation</h2>
      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trip.tripInfo?.hotels.map((hotel, index) => (
            <Card key={index} className="overflow-hidden transition-shadow bg-transparent hover:shadow-lg">
              <div className="relative w-full h-48">
                <img
                  src={hotelPhotos[hotel.name] || "/hotel.jpg"}
                  alt={hotel.name}
                  className="object-cover w-full h-full"
                />
              </div>
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
            <Card key={index} className="overflow-hidden transition-shadow bg-transparent hover:shadow-lg">
              <div className="relative w-full h-48">
                <img
                  src={restaurantPhotos[restaurant.name] || "/restaurant.jpg"}
                  alt={restaurant.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">{restaurant.name}</h4>
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
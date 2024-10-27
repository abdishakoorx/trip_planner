/* eslint-disable react/prop-types */

import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

const SkeletonPulse = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const RatingSkeletonStars = () => (
  <div className="flex items-center gap-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className="w-4 h-4 text-gray-200" />
    ))}
    <SkeletonPulse className="w-12 h-4" />
  </div>
);

const PlaceCardSkeleton = () => (
  <Card className="overflow-hidden transition-shadow bg-transparent hover:shadow-lg">
    <div className="relative w-full h-48">
      <SkeletonPulse className="w-full h-full" />
    </div>
    <CardContent className="p-4">
      <SkeletonPulse className="w-3/4 h-6 mb-2" />
      <RatingSkeletonStars />
      <SkeletonPulse className="w-full h-4 mt-2 mb-2" />
      <div className="flex items-center justify-between">
        <SkeletonPulse className="w-24 h-6 rounded-full" />
        <SkeletonPulse className="w-20 h-4" />
      </div>
    </CardContent>
  </Card>
);

const HotelsSkeletonLoader = () => {
  return (
    <div className="mt-8 mb-4 space-y-6 border-t-2 border-blue-300">
      {/* Hotels Section */}
      <h2 className="mt-8 text-3xl font-semibold text-gray-900">Accommodation</h2>
      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <PlaceCardSkeleton key={`hotel-${i}`} />
          ))}
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="space-y-8">
        <h2 className="mt-8 text-3xl font-semibold text-gray-900">Restaurants</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <PlaceCardSkeleton key={`restaurant-${i}`} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HotelsSkeletonLoader;
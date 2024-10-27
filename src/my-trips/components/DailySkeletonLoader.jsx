/* eslint-disable react/prop-types */

import { Card, CardContent } from "@/components/ui/card";
import { Bus, Car, DollarSign } from 'lucide-react';

const SkeletonPulse = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const ActivityCardSkeleton = () => (
  <Card className="overflow-hidden transition-shadow bg-transparent hover:shadow-lg">
    <div className="grid gap-4 md:grid-cols-3">
      {/* Activity Image Skeleton */}
      <div className="relative h-64 md:col-span-1">
        <SkeletonPulse className="w-full h-full rounded-l-lg" />
      </div>
      
      {/* Activity Details Skeleton */}
      <div className="p-6 md:col-span-2">
        <div className="flex items-start justify-between mb-4">
          <SkeletonPulse className="w-48 h-7" />
          <SkeletonPulse className="w-24 h-6 rounded-full" />
        </div>

        {/* Description Skeleton */}
        <div className="mb-4 space-y-2">
          <SkeletonPulse className="w-full h-4" />
          <SkeletonPulse className="w-5/6 h-4" />
          <SkeletonPulse className="w-4/6 h-4" />
        </div>

        {/* Info Items Skeleton */}
        <div className="grid gap-3 text-sm">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <SkeletonPulse className="w-4 h-4" />
              <SkeletonPulse className="w-40 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </Card>
);

const TransportItemSkeleton = ({ icon }) => (
  <div className="flex items-start space-x-4">
    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full">
      {icon}
    </div>
    <div className="flex-1 min-w-0 space-y-2">
      <SkeletonPulse className="w-40 h-5" />
      <SkeletonPulse className="h-4 w-60" />
    </div>
  </div>
);

const DailySkeletonLoader = () => {
  return (
    <div className="space-y-8 border-t-2 border-blue-300">
      {/* Activities Section */}
      <h2 className="mt-8 text-3xl font-semibold text-gray-900">Activities</h2>
      
      {/* Daily Itinerary Skeleton */}
      {[1, 2, 3].map((day) => (
        <div key={day} className="p-4 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Day {day}</h3>
          
          <div className="grid gap-6">
            {[1, 2].map((activity) => (
              <ActivityCardSkeleton key={activity} />
            ))}
          </div>
        </div>
      ))}

      {/* Transportation Section */}
      <div className="space-y-8 border-t-2 border-blue-300">
        <h2 className="mt-8 text-3xl font-semibold text-gray-900">Transportation</h2>
        <Card className="overflow-hidden bg-transparent border-0 shadow-none">
          <CardContent className="">
            <div className="space-y-6">
              <TransportItemSkeleton icon={<Car className="w-5 h-5 text-blue-500" />} />
              <TransportItemSkeleton icon={<Bus className="w-5 h-5 text-green-500" />} />
              <TransportItemSkeleton icon={<DollarSign className="w-5 h-5 text-yellow-500" />} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailySkeletonLoader;
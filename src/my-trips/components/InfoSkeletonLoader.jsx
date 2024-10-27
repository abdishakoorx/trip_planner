/* eslint-disable react/prop-types */

import { Info as InfoIcon } from "lucide-react";

const SkeletonPulse = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const InfoSkeletonLoader = () => {
  return (
    <div>
      {/* Hero Image Skeleton */}
      <SkeletonPulse className="w-full h-[400px] rounded-lg" />

      {/* Destination and Badges Section */}
      <div className="flex flex-col gap-2 mt-3 md:justify-between md:flex-row">
        <SkeletonPulse className="w-64 h-8" />
        <div className="flex flex-wrap items-center gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonPulse key={i} className="w-24 h-6 rounded-full" />
          ))}
        </div>
      </div>

      {/* Destination Basics Section */}
      <div className="mt-8 rounded-2xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Info Cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 border border-gray-300 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <SkeletonPulse className="w-5 h-5" />
                <SkeletonPulse className="w-32 h-5" />
              </div>
              <SkeletonPulse className="w-full h-4" />
            </div>
          ))}
        </div>

        {/* Travel Tips Section */}
        <div className="mt-8">
          <SkeletonPulse className="w-40 mb-4 h-7" />
          <div className="w-full px-4 rounded-lg bg-gray-50">
            <div className="py-4">
              <div className="flex items-center gap-3">
                <InfoIcon className="flex-shrink-0 w-5 h-5 text-gray-200" />
                <SkeletonPulse className="w-48 h-5" />
              </div>
              <div className="mt-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-gray-300">•</span>
                    <SkeletonPulse className="w-full h-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSkeletonLoader;
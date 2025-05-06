import { Skeleton } from "@/components/ui/skeleton";

const TripHistoryLoading = () => {
  return (
    <div className="w-full space-y-6">
      {/* Search bar skeleton */}
      <Skeleton className="w-full h-12" />
      
      {/* Filter pills skeleton */}
      <div className="flex items-center py-2 space-x-2 overflow-x-auto">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="w-24 h-8 rounded-full" />
        ))}
      </div>
      
      {/* Trip cards skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="overflow-hidden border border-gray-100 rounded-lg">
            <Skeleton className="w-full h-48" />
            <div className="p-4 space-y-3">
              <Skeleton className="w-3/4 h-6" />
              <Skeleton className="w-1/2 h-4" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="w-24 h-5" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHistoryLoading;
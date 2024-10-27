/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bus, Car, Clock, DollarSign, MapPin } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { GetPlacesInfo, PHOTO_REF_URL } from "@/config/GlobalApi";
import DailySkeletonLoader from "./DailySkeletonLoader";



const Daily = ({ trip }) => {
  const [activityPhotos, setActivityPhotos] = useState({});
  const [loading, setLoading] = useState(true)

  const getActivityPhoto = useCallback(async (activityName) => {
    const data = {
      textQuery: activityName,
      languageCode: "en",
      maxResultCount: 1
    };

    try {
      const result = await GetPlacesInfo(data);
      if (result.data.places[0]?.photos?.length > 0) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[0].name);
        setActivityPhotos(prev => ({
          ...prev,
          [activityName]: photoUrl
        }));
      }
    } catch (error) {
      console.error('Error fetching activity photo:', error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (trip?.tripInfo?.itinerary?.dayPlans) {
      const fetchAllPhotos = async () => {
        const promises = trip.tripInfo.itinerary.dayPlans.flatMap(day =>
          day.activities.map(activity => getActivityPhoto(activity.name))
        );
        await Promise.all(promises);
        setLoading(false);
      };
      fetchAllPhotos();
    }
  }, [trip?.tripInfo?.itinerary?.dayPlans, getActivityPhoto]);


  if (loading) {
    return <DailySkeletonLoader />;
  }



  return (
    <div className="space-y-8 border-t-2 border-blue-300">
      <h2 className="mt-8 text-3xl font-semibold text-gray-900">Activities</h2>
      {/* Daily Itinerary */}
      {trip.tripInfo?.itinerary?.dayPlans.map((day) => (
        <div key={day.day} className="p-4 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Day {day.day}</h3>

          <div className="grid gap-6">
            {day.activities.map((activity, index) => (
              <Card key={index} className="overflow-hidden transition-shadow bg-transparent hover:shadow-lg">
                <div className="grid gap-4 md:grid-cols-3">
                  {/* Activity Image */}
                  <div className="relative h-64 md:col-span-1">
                    <img
                      src={activityPhotos[activity.name] || "/activity.jpg"}
                      alt={activity.name}
                      className="object-cover w-full h-full rounded-l-lg"
                    />
                  </div>
                  {/* Activity Details */}
                  <div className="p-6 md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-semibold text-gray-900">{activity.name}</h4>
                      <Badge variant="secondary" className="px-3 rounded-full bg-accent hover:bg-accent/90">
                        {activity.duration}
                      </Badge>
                    </div>

                    <p className="mb-4 text-gray-600">{activity.description}</p>

                    <div className="grid gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{activity.hours}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{activity.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{activity.cost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Transport Information Card - Unchanged */}
      <div className="space-y-8 border-t-2 border-blue-300">
        <h2 className="mt-8 text-3xl font-semibold text-gray-900">Transportation</h2>
        <Card className="overflow-hidden bg-transparent border-0 shadow-none">
          <CardContent className="">
            <div className="space-y-6">
              {/* Main Transportation Item */}
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full">
                  <Car className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900">Main Transportation</p>
                  <p className="text-sm text-gray-500">{trip.tripInfo?.transport?.mainOption}</p>
                </div>
              </div>

              {/* Airport Transfer Item */}
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full">
                  <Bus className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900">Airport Transfer</p>
                  <p className="text-sm text-gray-500">{trip.tripInfo?.transport?.airportTransfer}</p>
                </div>
              </div>

              {/* Daily Budget Item */}
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900">Daily Budget</p>
                  <p className="text-sm text-gray-500">{trip.tripInfo?.transport?.dailyCost}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Daily;
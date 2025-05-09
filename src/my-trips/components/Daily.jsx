/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bus, Car, Clock, DollarSign, MapPin, Calendar, InfoIcon } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { GetPlacesInfo, PHOTO_REF_URL } from "@/config/GlobalApi"
import DailySkeletonLoader from "./DailySkeletonLoader"

const Daily = ({ trip, showActivities = true, showTransport = true }) => {
  const [activityPhotos, setActivityPhotos] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeDay, setActiveDay] = useState(1)

  const getActivityPhoto = useCallback(async (activityName) => {
    const data = {
      textQuery: activityName,
      languageCode: "en",
      maxResultCount: 1,
    }

    try {
      const result = await GetPlacesInfo(data)
      if (result.data.places[0]?.photos?.length > 0) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[0].name)
        setActivityPhotos((prev) => ({
          ...prev,
          [activityName]: photoUrl,
        }))
      }
    } catch (error) {
      console.error("Error fetching activity photo:", error)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    if (trip?.tripInfo?.itinerary?.dayPlans && showActivities) {
      const fetchAllPhotos = async () => {
        const promises = trip.tripInfo.itinerary.dayPlans.flatMap((day) =>
          day.activities.map((activity) => getActivityPhoto(activity.name)),
        )
        await Promise.all(promises)
        setLoading(false)
      }
      fetchAllPhotos()
    } else {
      setLoading(false)
    }
  }, [trip?.tripInfo?.itinerary?.dayPlans, getActivityPhoto, showActivities])

  if (loading) {
    return <DailySkeletonLoader />
  }

  const dayPlans = trip.tripInfo?.itinerary?.dayPlans || []

  return (
    <div className="max-w-5xl px-4 py-8 mx-auto">
      {/* Activities Section */}
      {showActivities && dayPlans.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Daily Itinerary</h2>
            <Badge
              variant="outline"
              className="px-3 py-1 text-sm font-medium text-purple-600 border-purple-200 bg-purple-50"
            >
              {dayPlans.length} Days
            </Badge>
          </div>

          {/* Day Selector */}
          <div className="flex items-center justify-start mb-6 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-2">
              {dayPlans.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeDay === day.day ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Day {day.day}
                </button>
              ))}
            </div>
          </div>

          {/* Activities for Selected Day */}
          {dayPlans.map(
            (day) =>
              day.day === activeDay && (
                <div key={day.day} className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 text-purple-600 bg-purple-100 rounded-full">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Day {day.day} Activities</h3>
                  </div>

                  {day.activities.map((activity, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden transition-all duration-300 border-none shadow-sm hover:shadow-md"
                    >
                      <div className="grid gap-0 md:grid-cols-3">
                        {/* Activity Image */}
                        <div className="relative h-64 md:h-full md:col-span-1">
                          <img
                            src={activityPhotos[activity.name] || "/activity.jpg"}
                            alt={activity.name}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-0 right-0 px-2 py-1 m-3 text-xs font-bold text-white bg-purple-600 rounded">
                            {activity.duration}
                          </div>
                        </div>

                        {/* Activity Details */}
                        <div className="p-6 md:col-span-2">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-xl font-semibold text-gray-900">{activity.name}</h4>
                          </div>

                          <p className="mb-4 text-gray-600">{activity.description}</p>

                          <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="flex-shrink-0 w-4 h-4 text-purple-500" />
                              <span>{activity.hours}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="flex-shrink-0 w-4 h-4 text-red-500" />
                              <span className="line-clamp-1">{activity.address}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <DollarSign className="flex-shrink-0 w-4 h-4 text-green-500" />
                              <span>{activity.cost}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ),
          )}
        </section>
      )}

      {/* Transport Information */}
      {showTransport && (
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-full">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Transportation</h3>
          </div>

          <Card className="overflow-hidden border-none shadow-sm">
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-3">
                {/* Main Transportation Item */}
                <div className="p-5 transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full">
                      <Car className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-gray-900">Main Transportation</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {trip.tripInfo?.transport?.mainOption || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Airport Transfer Item */}
                <div className="p-5 transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-100 rounded-full">
                      <Bus className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-gray-900">Airport Transfer</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {trip.tripInfo?.transport?.airportTransfer || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Daily Budget Item */}
                <div className="p-5 transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-amber-100">
                      <DollarSign className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-gray-900">Daily Budget</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {trip.tripInfo?.transport?.dailyCost || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation Tips */}
              <div className="p-5 mt-6 transition-all duration-300 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full">
                    <InfoIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <h4 className="text-base font-medium text-gray-900">Transportation Tips</h4>
                </div>
                <ul className="pl-10 space-y-2 text-gray-600 list-disc">
                  <li>Book airport transfers in advance to avoid high on-the-spot prices</li>
                  <li>Consider purchasing a local transport card for better rates</li>
                  <li>Use ride-sharing apps for convenience in urban areas</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}

export default Daily

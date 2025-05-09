/* eslint-disable react/prop-types */
import { Star, MapPin, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState, useCallback } from "react"
import { GetPlacesInfo, PHOTO_REF_URL } from "@/config/GlobalApi"
import HotelsSkeletonLoader from "./HotelsSkeletonLoader"

const Hotels = ({ trip }) => {
  const [hotelPhotos, setHotelPhotos] = useState({})
  const [restaurantPhotos, setRestaurantPhotos] = useState({})
  const [loading, setLoading] = useState(true)

  const getPlacePhoto = useCallback(async (placeName, type) => {
    const data = {
      textQuery: placeName,
      languageCode: "en",
      maxResultCount: 1,
    }

    try {
      const result = await GetPlacesInfo(data)
      if (result.data.places[0]?.photos?.length > 0) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[0].name)
        if (type === "hotel") {
          setHotelPhotos((prev) => ({
            ...prev,
            [placeName]: photoUrl,
          }))
        } else {
          setRestaurantPhotos((prev) => ({
            ...prev,
            [placeName]: photoUrl,
          }))
        }
      }
    } catch (error) {
      console.error(`Error fetching ${type} photo:`, error)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    const fetchAllPhotos = async () => {
      const hotelPromises = trip?.tripInfo?.hotels?.map((hotel) => getPlacePhoto(hotel.name, "hotel")) || []
      const restaurantPromises =
        trip?.tripInfo?.dining?.map((restaurant) => getPlacePhoto(restaurant.name, "restaurant")) || []

      await Promise.all([...hotelPromises, ...restaurantPromises])
      setLoading(false)
    }

    fetchAllPhotos()
  }, [trip?.tripInfo?.hotels, trip?.tripInfo?.dining, getPlacePhoto])

  if (loading) {
    return <HotelsSkeletonLoader />
  }

  // Helper function to render rating stars
  const renderRating = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-200/50" />)
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />)
      }
    }
    return stars
  }

  return (
    <div className="max-w-5xl px-4 py-8 mx-auto">
      {/* Hotels Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Accommodation</h2>
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium text-blue-600 border-blue-200 bg-blue-50">
            {trip.tripInfo?.hotels?.length || 0} Options
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trip.tripInfo?.hotels.map((hotel, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-300 border-none shadow-sm hover:shadow-md"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={hotelPhotos[hotel.name] || "/hotel.jpg"}
                  alt={hotel.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-0 right-0 px-2 py-1 m-2 text-xs font-bold text-white bg-blue-600 rounded">
                  {hotel.price}
                </div>
              </div>
              <CardContent className="p-5">
                <h4 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-1">{hotel.name}</h4>
                <div className="flex items-center gap-2 mb-3">
                  {renderRating(Number.parseFloat(hotel.rating))}
                  <span className="text-sm text-gray-600">({hotel.rating})</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <MapPin className="flex-shrink-0 w-4 h-4 text-gray-400" />
                  <span className="line-clamp-1">{hotel.address}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Badge variant="secondary" className="text-blue-700 bg-blue-100">
                    {hotel.price}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Dining Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Restaurants</h2>
          <Badge
            variant="outline"
            className="px-3 py-1 text-sm font-medium text-green-600 border-green-200 bg-green-50"
          >
            {trip.tripInfo?.dining?.length || 0} Options
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trip.tripInfo?.dining.map((restaurant, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-300 border-none shadow-sm hover:shadow-md"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={restaurantPhotos[restaurant.name] || "/restaurant.jpg"}
                  alt={restaurant.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-0 right-0 px-2 py-1 m-2 text-xs font-bold text-white bg-green-600 rounded">
                  {restaurant.type}
                </div>
              </div>
              <CardContent className="p-5">
                <h4 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-1">{restaurant.name}</h4>
                <div className="flex items-center gap-2 mb-3">
                  {renderRating(Number.parseFloat(restaurant.rating))}
                  <span className="text-sm text-gray-600">({restaurant.rating})</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <Tag className="flex-shrink-0 w-4 h-4 text-gray-400" />
                  <span className="line-clamp-1">{restaurant.specialty}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="flex-shrink-0 w-4 h-4 text-gray-400" />
                  <span className="line-clamp-1">{restaurant.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hotels

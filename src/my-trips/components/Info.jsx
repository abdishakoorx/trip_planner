/* eslint-disable react/prop-types */
"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Globe, InfoIcon } from "lucide-react"
import { GetPlacesInfo, PHOTO_REF_URL } from "@/config/GlobalApi"
import { useCallback, useEffect, useState } from "react"
import InfoSkeletonLoader from "./InfoSkeletonLoader"

function Info({ trip, imageOnly = false, basicsOnly = false, fullHeight = false }) {
  const [photoURL, setphotoURL] = useState(null)
  const [loading, setLoading] = useState(true)

  const getPlacePhotos = useCallback(async () => {
    if (!trip?.userSelection?.destination) return

    const data = {
      textQuery: trip.userSelection.destination,
      languageCode: "en",
      maxResultCount: 1,
    }

    try {
      const result = await GetPlacesInfo(data)
      const Photo_URL = PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[5].name)
      setphotoURL(Photo_URL)
    } catch (error) {
      console.error("Error fetching place photos:", error)
      if (error.response) {
        console.error("Error details:", error.response.data)
      }
    }
  }, [trip?.userSelection?.destination])

  useEffect(() => {
    setLoading(true)
    if (trip?.userSelection?.destination) {
      getPlacePhotos().finally(() => {
        setLoading(false)
      })
    }
  }, [trip?.userSelection?.destination, getPlacePhotos])

  if (loading) {
    return <InfoSkeletonLoader />
  }

  const basics = trip?.tripInfo?.destination?.basics || {}
  const tips = basics?.tips || []

  // If we only need to show the image
  if (imageOnly) {
    return (
      <img
        src={photoURL || "/travel.jpg"}
        alt={trip?.userSelection?.destination || "Travel Destination"}
        className={`object-cover w-full ${fullHeight ? "h-full" : "h-[400px]"}`}
        onError={(e) => {
          console.log("Image failed to load, using fallback")
          e.target.onerror = null
          e.target.src = "/travel.jpg"
        }}
      />
    )
  }

  // If we only need to show the basics
  if (basicsOnly) {
    return (
      <div>
        {/* Destination Basics Section */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Destination Basics</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Currency Card */}
            <div className="overflow-hidden transition-all bg-white border-none shadow-sm rounded-xl hover:shadow-md">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Currency</h3>
                </div>
                <p className="text-gray-700">{basics.currency || "Information not available"}</p>
              </div>
            </div>

            {/* Language Card */}
            <div className="overflow-hidden transition-all bg-white border-none shadow-sm rounded-xl hover:shadow-md">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 text-purple-600 bg-purple-100 rounded-full">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
                </div>
                <p className="text-gray-700">{basics.language || "Information not available"}</p>
              </div>
            </div>

            {/* Best Time Card */}
            <div className="overflow-hidden transition-all bg-white border-none shadow-sm rounded-xl hover:shadow-md">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full text-amber-600 bg-amber-100">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Best Time to Visit</h3>
                </div>
                <p className="text-gray-700">{basics.bestTime || "Information not available"}</p>
              </div>
            </div>
          </div>

          {/* Travel Tips Section */}
          {tips.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Travel Tips</h2>
              <div className="overflow-hidden bg-white shadow-sm rounded-xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tips" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                      <div className="flex items-center gap-3 text-gray-900">
                        <div className="flex items-center justify-center w-8 h-8 text-teal-600 bg-teal-100 rounded-full">
                          <InfoIcon className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-medium">Essential Travel Tips</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <ul className="space-y-3">
                        {tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 mt-0.5 text-xs text-white bg-teal-500 rounded-full">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Default return (should not be reached with the new structure)
  return null
}

export default Info

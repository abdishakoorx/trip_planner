/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GetPlacesInfo, PHOTO_REF_URL } from "@/config/GlobalApi";

// Skeleton component for loading state
const SkeletonPulse = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
);

const TripCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="relative w-full h-48">
        <SkeletonPulse className="absolute inset-0" />
      </div>
      <CardHeader className="py-4">
        <SkeletonPulse className="w-3/4 h-6" />
      </CardHeader>
      <CardContent className="py-0">
        <div className="space-y-3">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-gray-300" />
            <SkeletonPulse className="w-1/2 h-4" />
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-300" />
            <SkeletonPulse className="w-24 h-4" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 pb-5">
        <SkeletonPulse className="w-full h-10" />
      </CardFooter>
    </Card>
  );
};

const statusColors = {
  upcoming: "bg-blue-500",
  completed: "bg-green-500",
  canceled: "bg-red-500",
  // Default status if none is provided
  default: "bg-gray-500"
};

// Function to format Firebase Timestamp or date string
const formatDate = (date) => {
  if (!date) return "Date not specified";

  // Check if the date is a Firebase Timestamp (has seconds & nanoseconds properties)
  if (date && typeof date === 'object' && 'seconds' in date) {
    // Convert Firebase timestamp to JavaScript Date
    return new Date(date.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // If it's already a string, just return it
  if (typeof date === 'string') {
    return date;
  }

  // If it's a JavaScript Date object
  if (date instanceof Date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  return "Date format unknown";
};

const TripCard = ({ trip }) => {
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine trip status
  const status = trip.status || "default";

  const getPlacePhotos = useCallback(async () => {
    // Check if we already have a photoURL in the trip data
    if (trip.photoURL) {
      setPhotoURL(trip.photoURL);
      setLoading(false);
      return;
    }

    // If no destination, exit early
    if (!trip?.userSelection?.destination) {
      setLoading(false);
      return;
    }

    const data = {
      textQuery: trip.userSelection.destination,
      languageCode: "en",
      maxResultCount: 1
    };

    try {
      const result = await GetPlacesInfo(data);
      if (result.data?.places?.[0]?.photos?.[0]?.name) {
        // Use first photo instead of specifically the 5th photo
        const Photo_URL = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[0].name);
        setPhotoURL(Photo_URL);
      } else {
        // If no photos available, set to null to use fallback
        setPhotoURL(null);
      }
    } catch (error) {
      console.error('Error fetching place photos:', error);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
      // On error, set to null to use fallback
      setPhotoURL(null);
    } finally {
      setLoading(false);
    }
  }, [trip]);

  // Cache for photos to prevent repeated API calls
  const photoCache = useMemo(() => ({}), []);

  useEffect(() => {
    // Check if we already have this destination in our cache
    const destination = trip?.userSelection?.destination;
    if (destination && photoCache[destination]) {
      setPhotoURL(photoCache[destination]);
      setLoading(false);
    } else if (destination) {
      getPlacePhotos().then(url => {
        if (url) {
          // Store in cache for future use
          photoCache[destination] = url;
        }
      });
    } else {
      setLoading(false);
    }
  }, [trip?.userSelection?.destination, getPlacePhotos, photoCache]);

  if (loading) {
    return <TripCardSkeleton />;
  }

  return (
    <Link to={`/my-trips/${trip.id}`}>
      <Card className="overflow-hidden border-gray-100 hover-card">
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={photoURL || "/travel.jpg"}
            alt={trip.userSelection?.destination || "Trip destination"}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              console.log("Image failed to load, using fallback");
              e.target.onerror = null; // Prevent infinite error loop
              e.target.src = "/travel.jpg"; // Set fallback image
            }}
          />
          {trip.status && (
            <div className="absolute top-3 right-3">
              <Badge
                className={`${statusColors[status] || statusColors.default} text-white font-medium px-3 py-1`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold">
              {trip.title || trip.userSelection?.destination || "Trip"}
            </h3>
          </div>
        </CardHeader>
        <CardContent className="py-0">
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span>{trip.userSelection?.destination || "Destination"}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span>{formatDate(trip.date)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4 pb-5">
          <Link to={`/my-trips/${trip.id}`} className="w-full">
            <Button variant="outline" className="w-full group">
              <span className="mr-2">View Details</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TripCard;
/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from 'react';
import { GetPlacesInfo, PHOTO_REF_URL } from "@/config/GlobalApi";
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';



const SkeletonPulse = ({ className }) => (
    <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
);

const TripCardSkeleton = () => {
    return (
        <div className="block">
            <div className="overflow-hidden transition-all duration-300 rounded-lg">
                {/* Image skeleton */}
                <div className="relative aspect-video">
                    <SkeletonPulse className="absolute inset-0" />
                </div>

                {/* Content skeleton */}
                <div className="p-4 space-y-2">
                    {/* Title skeleton */}
                    <SkeletonPulse className="w-3/4 h-8" />

                    {/* Date skeleton */}
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <SkeletonPulse className="w-24 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};



function UserInfo({ trip }) {
    const [photoURL, setPhotoURL] = useState(null);
    const [loading, setLoading] = useState(true)

    const getPlacePhotos = useCallback(async () => {
        if (!trip?.userSelection?.destination) return;

        const data = {
            textQuery: trip.userSelection.destination,
            languageCode: "en",
            maxResultCount: 1
        };

        try {
            const result = await GetPlacesInfo(data);
            const Photo_URL = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[5].name);
            setPhotoURL(Photo_URL);
        } catch (error) {
            console.error('Error fetching place photos:', error);
            if (error.response) {
                console.error('Error details:', error.response.data);
            }
        } finally {
            setLoading(false)
        }
    }, [trip?.userSelection?.destination]);

    useEffect(() => {
        if (trip?.userSelection?.destination) {
            getPlacePhotos();
        }
    }, [trip?.userSelection?.destination, getPlacePhotos]);

    if (loading) {
        return <TripCardSkeleton />;
    }

    return (
        <Link to={'/my-trips/' + trip?.id} className="block">
            <div className="overflow-hidden transition-all duration-300 rounded-lg ">
                <div className="relative aspect-video">
                    <img
                        src={photoURL || "/travel.jpg"}
                        alt={trip?.userSelection?.destination || "Trip destination"}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="p-4 space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 truncate">
                        {trip?.userSelection?.destination || <div className="h-8 bg-gray-200 rounded animate-pulse" />}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{trip?.date || <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default UserInfo;
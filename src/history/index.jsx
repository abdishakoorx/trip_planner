import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { db } from "@/config/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Calendar, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import TripCard from "./components/TripCard";
import TripFilter from "./components/TripFilter";
import TripPagination from "./components/TripPagination";
import TripHistoryLoading from "./components/TripHistoryLoading";

function History() {
  const { user, isLoaded } = useUser();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({ status: 'all', dateRange: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 6;

  // Fetch trips from Firestore
  useEffect(() => {
    const fetchTrips = async () => {
      if (!isLoaded || !user) return;

      try {
        const q = query(
          collection(db, 'Trips'),
          where("userEmail", "==", user.primaryEmailAddress.emailAddress)
        );
        const querySnapshot = await getDocs(q);
        const tripsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Check for completed trips based on end date
        const processedTrips = tripsData.map(trip => {
          // Clone the trip to avoid modifying the original data
          const processedTrip = { ...trip };

          // If status is not manually set to 'canceled', check dates
          if (processedTrip.status !== 'canceled') {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset hours to compare dates only

            // Convert string dates to Date objects for comparison
            // Format expected: "YYYY-MM-DD"
            const endDateParts = (processedTrip.userSelection?.endDateSimple || '').split('-');

            if (endDateParts.length === 3) {
              const endDate = new Date(
                parseInt(endDateParts[0]),
                parseInt(endDateParts[1]) - 1, // Month is 0-indexed
                parseInt(endDateParts[2])
              );

              // If end date is before today, mark as completed
              if (endDate < today) {
                processedTrip.status = 'completed';
              } else {
                processedTrip.status = 'upcoming';
              }
            }
          }

          return processedTrip;
        });

        setTrips(processedTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, [user, isLoaded]);

  // Apply filters to trips
  const getFilteredTrips = () => {
    return trips.filter(trip => {
      // Apply status filter
      if (filter.status !== 'all' && trip.status !== filter.status) {
        return false;
      }

      // Apply date range filter if selected
      if (filter.dateRange) {
        const today = new Date();
        const startDateParts = (trip.userSelection?.startDateSimple || '').split('-');

        if (startDateParts.length === 3) {
          const startDate = new Date(
            parseInt(startDateParts[0]),
            parseInt(startDateParts[1]) - 1, // Month is 0-indexed
            parseInt(startDateParts[2])
          );

          // Calculate the date range
          const oneMonthAgo = new Date(today);
          oneMonthAgo.setMonth(today.getMonth() - 1);

          const threeMonthsAgo = new Date(today);
          threeMonthsAgo.setMonth(today.getMonth() - 3);

          const sixMonthsAgo = new Date(today);
          sixMonthsAgo.setMonth(today.getMonth() - 6);

          const oneYearAgo = new Date(today);
          oneYearAgo.setFullYear(today.getFullYear() - 1);

          // Check if the trip falls within the selected date range
          switch (filter.dateRange) {
            case 'last-month':
              if (startDate < oneMonthAgo) return false;
              break;
            case 'last-3-months':
              if (startDate < threeMonthsAgo) return false;
              break;
            case 'last-6-months':
              if (startDate < sixMonthsAgo) return false;
              break;
            case 'last-year':
              if (startDate < oneYearAgo) return false;
              break;
            default:
              break;
          }
        }
      }

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          (trip.userSelection?.destination?.toLowerCase().includes(query)) ||
          (trip.title?.toLowerCase().includes(query))
        );
      }

      return true;
    });
  };

  const filteredTrips = getFilteredTrips();

  // Calculate pagination
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="container px-4 py-10 mx-auto md:px-6">
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight">Your Trip History</h1>
        </div>
        <TripHistoryLoading />
      </div>
    );
  }

  return (
    <div className="mb-16">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0 z-0 h-[240px]">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-slate-50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-indigo-900/30 mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 pt-32 pb-4">
          <div className="container max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h1 className="mb-4 font-serif text-4xl font-semibold text-primary md:text-5xl">
                Your Trip History
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-primary/80">
                Explore your past adventures and upcoming journeys all in one place
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container px-4 mx-auto md:px-6">
        {/* TripFilter component */}
        <TripFilter
          onFilterChange={handleFilterChange}
          onSearchChange={setSearchQuery}
        />

        {currentTrips.length > 0 ? (
          <>
            {/* Trip cards grid */}
            <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
              {currentTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>

            {/* Pagination */}
            {filteredTrips.length > tripsPerPage && (
              <TripPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full">
              <Compass className="w-8 h-8 text-primary opacity-70" />
            </div>
            <h3 className="mb-4 font-serif text-2xl font-medium">No trips found</h3>
            <p className="max-w-md mx-auto mb-8 text-gray-600">
              {filter.status !== 'all'
                ? `You don't have any ${filter.status} trips yet.`
                : 'Your journey begins with a single step. Start planning your first adventure!'}
            </p>
            <Link to="/create-trip">
              <Button className="px-6">
                <Calendar className="w-4 h-4 mr-2" />
                Plan a Trip
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
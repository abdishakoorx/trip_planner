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
  const [filter, setFilter] = useState('all');
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
        setTrips(tripsData);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, [user, isLoaded]);

  // Apply filters to trips
  const filteredTrips = trips.filter(trip => {
    // Skip status filter for now as mentioned in requirements
    // Status filtering will be implemented later

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <>
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0 z-0 h-[240px]">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-slate-50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-indigo-900/30 mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 pt-32 pb-16">
          <div className="container max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h1 className="mb-4 font-serif text-4xl font-semibold md:text-5xl text-primary">
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
          onFilterChange={setFilter}
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
              {filter !== 'all'
                ? `You don't have any ${filter} trips yet.`
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
    </>
  );
}

export default History;
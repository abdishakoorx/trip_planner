import { db } from "@/config/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import UserInfo from "./components/UserInfo";
import { useUser } from "@clerk/clerk-react";

function History() {
  const { user, isLoaded } = useUser();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-10 mx-auto">
      <h1 className="mb-8 text-3xl font-medium text-center">Your Trips</h1>
      <div className="space-y-6">
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <div key={trip.id} className="w-full">
                <UserInfo trip={trip} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No trips found.
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
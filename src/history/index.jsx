import { db } from "@/config/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import UserInfo from "./components/UserInfo";

function History() {
  const [trips, setTrips] = useState([]);
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchTrips = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSearching(true);
    setSearchPerformed(true);

    try {
      const q = query(
        collection(db, 'Trips'),
        where("userEmail", "==", email.trim())
      );
      const querySnapshot = await getDocs(q);
      const tripsData = [];
      querySnapshot.forEach((doc) => {
        tripsData.push({ id: doc.id, ...doc.data() });
      });
      setTrips(tripsData);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container px-4 py-10 mx-auto">
      <div className="max-w-xl mx-auto mb-8">
        <h1 className="mb-6 text-3xl font-medium text-center">Search Your Trips</h1>
        
        <form onSubmit={searchTrips} className="flex gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button 
            type="submit" 
            disabled={isSearching}
            className="gap-2 bg-orange-500/90 hover:bg-orange-500"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search
              </>
            )}
          </Button>
        </form>
      </div>

      {searchPerformed && (
        <div className="space-y-6">
          {trips.length > 0 ? (
            <>
              <h2 className="text-2xl font-medium">Your Past Destinations</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {trips.map((trip) => (
                  <div key={trip.id} className="w-full">
                    <UserInfo trip={trip} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              No trips found for this email address.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default History;
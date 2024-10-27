import { db } from "@/config/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./components/UserInfo";

function History() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // Fetch trips using useCallback
  const getUserTrips = useCallback(async () => {
    if (!user?.email) return;

    try {
      const q = query(
        collection(db, 'Trips'),
        where("userEmail", "==", user.email)
      );

      const querySnapshot = await getDocs(q);
      const tripsData = [];

      querySnapshot.forEach((doc) => {
        tripsData.push({ id: doc.id, ...doc.data() });
        // console.log(doc.id, " => ", doc.data());
      });

      setTrips(tripsData);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  }, [user?.email]);

  // Call getUserTrips when user is available
  useEffect(() => {
    if (user?.email) {
      getUserTrips();
    }
  }, [user, getUserTrips]);

  return (
    <div className="container px-4 py-10 mx-auto">
      <h1 className="mb-8 text-3xl font-medium">Past Destinations</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <div key={trip.id} className="w-full">
            <UserInfo trip={trip} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
import { db } from "@/config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import Info from "../components/Info";
import Hotels from "../components/Hotels";
import Daily from "../components/Daily";

function MyTrips() {
  const { tripID } = useParams();
  const [trip, setTrip] = useState([]);

  const getTripInfo = useCallback(async () => {
    const docRef = doc(db, "Trips", tripID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTrip(docSnap.data())
    }
  }, [tripID]);

  useEffect(() => {
    if (tripID) {
      getTripInfo();
    }
  }, [tripID, getTripInfo]);

  return (
    <div className="max-w-5xl px-4 py-10 mx-auto">
      {/* Info */}
      <Info trip = {trip}/>

      {/* Hotels */}
      <Hotels trip = {trip}/>

      {/* Daily plan */}
      <Daily trip = {trip}/>

    </div>
  )
}

export default MyTrips;
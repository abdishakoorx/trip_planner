import { db } from "@/config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

function MyTrips() {
  const { tripID } = useParams();

  const getTripInfo = useCallback(async () => {
    const docRef = doc(db, "Trips", tripID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
    }
  }, [tripID]);

  useEffect(() => {
    if (tripID) {
      getTripInfo();
    }
  }, [tripID, getTripInfo]);

  return <div>MyTrips: {tripID}</div>;
}

export default MyTrips;
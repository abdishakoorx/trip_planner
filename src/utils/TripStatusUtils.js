import { isBefore, isAfter, isWithinInterval } from 'date-fns';

/**
 * Determines the status of a trip based on its start and end dates
 * 
 * @param {Object} trip - The trip object containing start and end dates
 * @returns {string} - The status of the trip: 'upcoming', 'active', or 'completed'
 */
export const determineTripStatus = (trip) => {
  // If trip already has a canceled status, keep it
  if (trip.status === 'canceled') {
    return 'canceled';
  }

  const now = new Date();
  
  try {
    // Ensure we're working with proper Date objects
    const startDate = trip.userSelection?.startDate instanceof Date 
      ? trip.userSelection.startDate 
      : new Date(trip.userSelection?.startDate);
      
    const endDate = trip.userSelection?.endDate instanceof Date 
      ? trip.userSelection.endDate 
      : new Date(trip.userSelection?.endDate);
    
    // Check for invalid dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid date in trip:', trip.id);
      return trip.status || 'upcoming'; // Default to existing status or 'upcoming'
    }
    
    // Set the time to end of day for the end date for accurate comparison
    endDate.setHours(23, 59, 59, 999);
    
    // Determine status based on date comparisons
    if (isBefore(now, startDate)) {
      return 'upcoming';
    } else if (isWithinInterval(now, { start: startDate, end: endDate })) {
      return 'active';
    } else if (isAfter(now, endDate)) {
      return 'completed';
    }
    
    // Fallback
    return trip.status || 'upcoming';
  } catch (error) {
    console.error('Error determining trip status:', error);
    return trip.status || 'upcoming';
  }
};

/**
 * Updates the status of trips in a batch based on current date
 * 
 * @param {Array} trips - Array of trip objects
 * @returns {Array} - Updated trips with correct status
 */
export const updateTripsStatus = (trips) => {
  if (!Array.isArray(trips)) return [];
  
  return trips.map(trip => {
    const currentStatus = trip.status;
    const newStatus = determineTripStatus(trip);
    
    // Only update if status has changed
    if (currentStatus !== newStatus) {
      return { ...trip, status: newStatus };
    }
    
    return trip;
  });
};

/**
 * Filter trips based on status
 * 
 * @param {Array} trips - Array of trip objects
 * @param {string} status - Status to filter by ('upcoming', 'active', 'completed', 'canceled')
 * @returns {Array} - Filtered trips
 */
export const filterTripsByStatus = (trips, status) => {
  if (!Array.isArray(trips)) return [];
  
  // First ensure all trips have up-to-date status
  const updatedTrips = updateTripsStatus(trips);
  
  // Then filter by the requested status
  return updatedTrips.filter(trip => trip.status === status);
};
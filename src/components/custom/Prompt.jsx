export const AIPROMPT = `Generate travel plan for the destination: {destination}, for days: {days}, for trip type: {tripType}, for budget: {budget}, for group size of: {size}. 

Return a detailed travel guide in JSON format that includes:

1. Destination overview with:
- Full destination name and country
- Exact geo coordinates and timezone
- Best times to visit with weather info for each season
- Local currency and current exchange rates
- Language(s) spoken
- Visa requirements
- Local transportation options
- Emergency numbers
- Current travel advisories

2. Budget breakdown showing:
- Average daily costs for your specified budget level
- Estimated total trip cost
- Cost-saving tips
- Typical prices for:
  * Meals (breakfast, lunch, dinner)
  * Transportation
  * Activities
  * Shopping
  * Entertainment

3. Accommodation recommendations (3 options) matching the budget level with:
- Hotel name
- Full address
- Price per night
- Star rating
- Guest rating (out of 5)
- High-quality image URLs
- Exact geo coordinates
- Top 3 amenities
- Distance from city center
- Special features
- Booking tips

4. Day-by-day itinerary for the specified number of days, each containing:
- 3-4 activities per day
- For each activity:
  * Place name
  * Description
  * Address
  * Opening hours
  * Entrance fees
  * Booking requirements
  * Best time to visit
  * Average visit duration
  * Travel time from previous location
  * Geo coordinates
  * Rating (out of 5)
  * Image URLs
  * Insider tips
  * Nearby food options

5. Restaurant recommendations (5 options) matching the budget with:
- Restaurant name
- Cuisine type
- Price range
- Special dishes to try
- Address
- Opening hours
- Rating
- Must-try menu items
- Reservation requirements
- Dress code if any

6. Transportation guide including:
- Best ways to get around
- Public transport passes and costs
- Walking/cycling possibilities
- Taxi/rideshare estimates
- Airport transfer options
- Transport apps to download

7. Essential tips covering:
- Local customs
- Tipping practices
- Safety information
- Weather-appropriate clothing
- Important phrases
- Money-saving hacks
- Best photo spots
- Local apps to download

8. Entertainment options suitable for the group size and trip type:
- Cultural activities
- Nightlife recommendations
- Shows and performances
- Special events during visit
- Shopping areas
- Local markets
- Parks and recreation
- Unique experiences

Return the response in the following JSON structure:

{
  "destination": {
    "name": "",
    "country": "",
    "coordinates": {
      "latitude": "",
      "longitude": ""
    },
    "overview": {},
    "practicalInfo": {}
  },
  "budget": {
    "summary": {},
    "breakdown": {},
    "tips": []
  },
  "accommodations": [
    {
      "name": "",
      "details": {},
      "location": {},
      "pricing": {},
      "images": []
    }
  ],
  "itinerary": {
    "summary": "",
    "dayPlans": [
      {
        "day": 1,
        "activities": [
          {
            "name": "",
            "details": {},
            "location": {},
            "timing": {},
            "images": []
          }
        ]
      }
    ]
  },
  "dining": {
    "highlights": [],
    "restaurants": []
  },
  "transportation": {
    "options": [],
    "costs": {},
    "tips": []
  },
  "essentialTips": {
    "cultural": [],
    "practical": [],
    "safety": []
  },
  "entertainment": {
    "activities": [],
    "events": [],
    "shopping": []
  }
}

Ensure all recommendations match the specified trip type ({tripType}), budget level ({budget}), and are suitable for the group size ({size}). Optimize the itinerary for {days} days, including sufficient breaks and accounting for travel time between locations.`
export const AIPROMPT = `Generate travel plan for the destination: {destination}, for days: {days}, for trip type: {tripType}, for budget: {budget}, for group size of: {size}.

Return a focused travel guide in JSON format that includes:

1. Destination Essentials:
- Full destination name and country
- Geo coordinates
- Best time to visit
- Local currency
- Language
- Must-know travel tips

2. Accommodations (top 3 options):
- Hotel name
- Address
- Price range
- Rating
- Image URL
- Coordinates

3. Daily Itinerary:
- 2-3 main activities per day
For each activity:
  * Place name
  * Brief description
  * Address
  * Opening hours
  * Entry cost
  * Image URL
  * Coordinates
  * Time needed

4. Food Guide (3 options):
- Restaurant name
- Cuisine type
- Price range
- Location
- Must-try dish
- Rating

5. Getting Around:
- Best transport option
- Estimated daily cost
- Airport transfer tips

Return in this JSON structure:

{
  "destination": {
    "name": "",
    "country": "",
    "coordinates": {
      "lat": "",
      "lng": ""
    },
    "basics": {
      "currency": "",
      "language": "",
      "bestTime": "",
      "tips": []
    }
  },
  "hotels": [
    {
      "name": "",
      "address": "",
      "price": "",
      "rating": "",
      "coordinates": {
        "lat": "",
        "lng": ""
      },
      "imageUrl": ""
    }
  ],
  "itinerary": {
    "dayPlans": [
      {
        "day": 1,
        "activities": [
          {
            "name": "",
            "description": "",
            "address": "",
            "hours": "",
            "cost": "",
            "duration": "",
            "coordinates": {
              "lat": "",
              "lng": ""
            },
            "imageUrl": ""
          }
        ]
      }
    ]
  },
  "dining": [
    {
      "name": "",
      "type": "",
      "price": "",
      "location": "",
      "specialty": "",
      "rating": ""
    }
  ],
  "transport": {
    "mainOption": "",
    "dailyCost": "",
    "airportTransfer": ""
  }
}

Ensure all suggestions match the specified trip type ({tripType}), budget level ({budget}), and group size ({size}). Plan for {days} days with realistic timing between locations.`
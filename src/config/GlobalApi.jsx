import axios from 'axios';

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

// Make sure to replace this with your actual API key
const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?max_height_px=1000&&max_width_px=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

export const GetPlacesInfo = (data) => {
    return axios.post(BASE_URL, data, {
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.photos'
        }
    });
}
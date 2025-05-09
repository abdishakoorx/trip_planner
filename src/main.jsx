import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import CreateTrip from './create-trip';
import MyTrips from './my-trips/[tripID]';
import History from './history';
import { Layout } from './Provider';
import AboutUs from './about-us';
import ContactUs from './contact-us';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <App />, },
      { path: "/create-trip", element: <CreateTrip />, },
      { path: "/my-trips/:tripID", element: <MyTrips />, },
      { path: "/history", element: <History />, },
      { path: "/about-us", element: <AboutUs />, },
      { path: "/contact-us", element: <ContactUs />, },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
)
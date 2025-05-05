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

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Configure Clerk with modal preferences
const clerkAppearance = {
  layout: {
    socialButtonsVariant: "iconButton",
    socialButtonsPlacement: "bottom"
  },
  elements: {
    // These styles will be applied to the modal
    formButtonPrimary: "bg-accent text-white hover:bg-accent/90",
    footerActionLink: "text-accent hover:text-accent/90",
    card: "shadow-lg rounded-lg"
  }
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <App />, },
      { path: "/create-trip", element: <CreateTrip />, },
      { path: "/my-trips/:tripID", element: <MyTrips />, },
      { path: "/history", element: <History />, },
      { path: "/about-us", element: <AboutUs />, },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={clerkAppearance}
      // This configures where users will be redirected after sign-in/sign-up by default
      // Here it will return to the page they were trying to access
      navigate={(to) => window.history.pushState({}, "", to)}
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
)
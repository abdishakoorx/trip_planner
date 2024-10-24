import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Header from './components/custom/Header';
import CreateTrip from './create-trip';
import { Toaster } from './components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MyTrips from './my-trips/[tripID]';
import Footer from './components/custom/Footer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/my-trips/:tripID",
    element: <MyTrips />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Header />
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
      <Footer/>
    </GoogleOAuthProvider>
  </StrictMode>
)

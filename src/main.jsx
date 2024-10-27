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
import History from './history';

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
  {
    path: "/history",
    element: <History />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Header />
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
    </GoogleOAuthProvider>
  </StrictMode>
)

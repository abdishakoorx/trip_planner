import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import CreateTrip from './create-trip';
import MyTrips from './my-trips/[tripID]';
import History from './history';
import { Layout } from './Provider';

// Create a layout component that includes the Header


const router = createBrowserRouter([
  {
    element: <Layout />, 
    children: [
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
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
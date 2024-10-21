import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Header from './components/custom/Header';
import Footer from './components/custom/Footer';
import CreateTrip from './create-trip';
import { Toaster } from './components/ui/sonner';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Toaster position="bottom-center" />
    <Footer/>
  </StrictMode>,
)

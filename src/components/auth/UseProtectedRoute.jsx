import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useClerk } from "@clerk/clerk-react";

// Custom hook for protected routes with modal
export const useProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Wait for Clerk to load authentication state
    if (!isLoaded) return;

    // If user is not signed in, open sign-in modal
    if (!isSignedIn) {
      openSignIn({
        redirectUrl: location.pathname,
        afterSignInUrl: location.pathname,
        // Optional: Customize the appearance of the modal
        appearance: {
          elements: {
            rootBox: "rounded-lg shadow-lg",
            card: "bg-background",
          }
        }
      });
    }
  }, [isSignedIn, isLoaded, location.pathname, navigate, openSignIn]);

  return { isSignedIn, isLoaded };
};

export default useProtectedRoute;
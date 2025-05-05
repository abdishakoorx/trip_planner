import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { SignedIn, SignedOut, useAuth, useClerk, useSignIn } from "@clerk/clerk-react";
import { useEffect } from "react";
import SignInPlaceholder from "./components/ui/sign-in-placeholder";

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

export const Layout = () => {
  const location = useLocation();
  const publicPaths = ['/', '/about-us'];
  const isPublicPath = publicPaths.includes(location.pathname);

  return (
    <>
      <Header />
      {isPublicPath ? (
        <Outlet />
      ) : (
        <ProtectedRouteWithModal>
          <Outlet />
        </ProtectedRouteWithModal>
      )}
      <Toaster position="bottom-center" />
    </>
  );
};

// Component to handle protected routes with modal
const ProtectedRouteWithModal = ({ children }) => {
  const { isSignedIn, isLoaded } = useProtectedRoute();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // If signed in, show the protected content
  if (isSignedIn) {
    return children;
  }

  // If not signed in, show a placeholder while the modal is opening
  return (
    <SignInPlaceholder />
  );
};
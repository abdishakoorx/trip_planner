import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

export const Layout = () => {
  const location = useLocation();
  const publicPaths = ['/'];
  const isPublicPath = publicPaths.includes(location.pathname);

  return (
    <>
      <Header />
      {isPublicPath ? (
        <Outlet />
      ) : (
        <>
          <SignedIn>
            <Outlet />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
      <Toaster position="bottom-center" />
    </>
  );
};
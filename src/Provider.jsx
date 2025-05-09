import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import Footer from "./components/custom/Footer";
import ProtectedRouteWithModal from "./components/auth/ProtectedRouteWithModal";

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
      <Toaster position="bottom-center" richColors />
      <Footer />
    </>
  );
};

export default Layout;
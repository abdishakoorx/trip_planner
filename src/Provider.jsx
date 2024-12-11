import { Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";


export const Layout = () => {
    return (
      <>
        <Header />
        <Outlet /> 
        <Toaster position="bottom-center" />
      </>
    );
  };
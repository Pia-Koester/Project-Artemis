import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "../components/context/AuthProvider";

export default function Rootlayout() {
  const { isLoading } = useContext(AuthContext) || {};

  return (
    <>
      <AuthProvider>
        {isLoading ? (
          <div className="flex flex-col gap-4 w-52">
            <div className="skeleton h-32 w-full"></div>
          </div>
        ) : (
          <>
            <Navbar />
            <Outlet />
            <Footer />
          </>
        )}
      </AuthProvider>
    </>
  );
}

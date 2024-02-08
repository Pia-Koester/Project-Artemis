import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/AuthProvider";
import Skeleton from "../pages/Skeleton";

export default function Authlayout() {
  const { isLoading } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../components/context/AuthProvider";

export default function Rootlayout() {
  const { isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-32 w-full">TEst TEst</div>
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

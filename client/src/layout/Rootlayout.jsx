import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../components/Footer";

export default function Rootlayout() {
  return (
    <>

      <Navbar />
         <Outlet />
      <Footer />
    </>
  );
}

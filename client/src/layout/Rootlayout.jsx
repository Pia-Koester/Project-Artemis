import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Rootlayout() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      <Footer />
    </>
  );
}

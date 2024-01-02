import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";

export default function Rootlayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

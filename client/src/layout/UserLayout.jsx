import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";

export default function UserPage() {


  return (
    <>
      <NavbarLoggedIn />
        <Outlet />
      <Footer />
    </>
  );
}

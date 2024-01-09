import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import AuthProvider from "../components/context/AuthProvider";

export default function UserPage() {
  return (
    <>
      <AuthProvider>
        <NavbarLoggedIn />
        <Outlet />
        <Footer />
      </AuthProvider>
    </>
  );
}

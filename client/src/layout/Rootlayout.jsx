import { useContext } from "react";
import AuthProvider from "../components/context/AuthProvider";
import { Outlet } from "react-router-dom";

export default function Rootlayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

import { useContext } from "react";
import AuthProvider from "../components/context/AuthProvider";
import { Outlet } from "react-router-dom";

export default function Parentlayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

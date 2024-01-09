import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../components/context/AuthProvider";

export default function Protected() {
  const { isLoading, user } = useContext(AuthContext);

  return (
    <>{!isLoading && <>{user ? <Outlet /> : <Navigate to="/login" />}</>}</>
  );
}

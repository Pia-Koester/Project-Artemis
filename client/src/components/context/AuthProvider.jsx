import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

import { badCredentials } from "../../utils/badCredentials";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/users/profile")
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (data) => {
    axiosClient
      .post("/login", data)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
        //Set timout function needs to run after successful login in order to retrieve data after the post request, otherwise the data does not show
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        badCredentials();
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async () => {
    axiosClient
      .get("/logout")
      .then((response) => {
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserProfile = async (data) => {
    axiosClient
      .put("/users/profile", data)
      .then((response) => {
        console.log("Data from api", response.data);
        navigate("/userProfile/details");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          isLoading,
          login,
          logout,
          updateUserProfile,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

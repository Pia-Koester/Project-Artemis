import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { badCredentials } from "../../utils/badCredentials";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [user, setUser] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/profile", {withCredentials: true})
      .then((response) => {
        setUser(response.data);
        setUserActivity(response.data.classesRegistered)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        // if(error.response.status.toString() === "403") {
        //     navigate("/login")
        // }
      }).finally(() => {
        setIsLoading(false)
      })
  }, []);

  const login = async (data) => {
    axios
      .post("http://localhost:8080/login", data, {withCredentials: true})
      .then((response) => {
        setUser(response.data);
        console.log(response.data)
        //Set timout function needs to run after successful login in order to retrieve data after the post request, otherwise the data does not show
        navigate("/")
        setTimeout(() => {
          window.location.reload()
        }, 100);
      })
      .catch((error) => {
        console.log(error);
        badCredentials()
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async () => {
    axios
      .get("http://localhost:8080/logout", {withCredentials: true})
      .then((response) => {
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserProfile = async (data) => {
    axios
      .put("http://localhost:8080/users/profile", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Data from api", response.data);
        navigate("/userProfile/details");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <AuthContext.Provider value={{ user, userActivity, isLoading, login, logout, updateUserProfile }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../components/context/AuthProvider";

const handleCancelation = (id) => {
  const {setUser} = useContext(AuthContext);


    console.log("id of the activity:", id)
    axios
      .put(
        `http://localhost:8080/activities/${id}/cancel`,
        {},
        { withCredentials: true }
        
      )
      .then((response) => {
        console.log("Data from api", response)
        setUser((prev) => {
          return {...prev, classesRegistered: [...prev.classesRegistered, response.data.activity], activeMembership: response.data.user.activeMembership}
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

export {handleCancelation}
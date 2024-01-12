import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../components/context/AuthProvider";

const handleCancelation = (id, setUser, setOpenSlots) => {
  // const {setUser} = useContext(AuthContext);

  console.log("id of the activity:", id);
  axios
    .put(
      `http://localhost:8080/activities/${id}/cancel`,
      {},
      { withCredentials: true }
    )
    .then((response) => {
      console.log("Data from api", response.data);
      setUser((prev) => {
        return {
          ...prev,
          classesRegistered: response.data.user.classesRegistered,
          activeMembership: response.data.user.activeMembership,
        };
      });

      setOpenSlots(
        response.data.activity.capacity -
          response.data.activity.registeredUsers.length
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export { handleCancelation };

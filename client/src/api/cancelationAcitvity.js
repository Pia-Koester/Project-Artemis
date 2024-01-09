import axios from "axios"

const handleCancelation = (id) => {

    console.log("id of the activity:", id)
    axios
      .put(
        `http://localhost:8080/activities/${id}/cancel`,
        {},
        { withCredentials: true }
        
      )
      .then((response) => {
        console.log("Data from api", response)
      })
      .catch((err) => {
        console.log(err);
      });
  };

export {handleCancelation}
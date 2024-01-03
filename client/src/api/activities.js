const url = "http://localhost:8080/activities";
import axios from "axios";

const getActivities = async () => {
  try {
    const response = await axios.get(url);
    //TO DO: reduce data so that it is grouped based on weekday - if we don't do backend
    //Change GET Request in backend to only show the current week
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export { getActivities };

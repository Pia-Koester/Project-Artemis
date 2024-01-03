const url = "http://localhost:8080/activities";
import axios from "axios";

const getActivities = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export { getActivities };

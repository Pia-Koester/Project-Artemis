const url = "http://localhost:8080/activities";
import axios from "axios";

const getActivities = async ({ request }) => {
  try {
    const query = request.url.split("?")[1];
    console.log(query);
    const response = await axios.get(`${url}?${query}`);
    //TO DO: send the date for the week as a query or other parameter and then only send back the data for this week
    const activitiesByWeekday = response.data.reduce(
      (accumulator, activity) => {
        const { weekday } = activity;
        accumulator[weekday] = accumulator[weekday] || [];
        accumulator[weekday].push(activity);
        return accumulator;
      },
      {}
    );

    return activitiesByWeekday;
  } catch (error) {
    console.log(error);
    return;
  }
};

export { getActivities };

const url = "http://localhost:8080/activities";
import axios from "axios";
import { defineWeek } from "../helper/defineweek.js";

const getActivities = async ({ request }) => {
  try {
    const parameterurl = new URL(request.url);
    const instructor = parameterurl.searchParams.get("instructor");
    const skip = parameterurl.searchParams.get("skip");

    const week = defineWeek(skip);

    const response = await axios.get(
      `${url}?instructor=${instructor}&mon=${week.formattedMondayDate}&sun=${week.formattedSundayDate}`
    );

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

    const data = {
      weekstart: week.formattedMonday,
      weekend: week.formattedSunday,
      activities: activitiesByWeekday,
    };

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

const getActivity = async ({ params }) => {
  try {
    const { id } = params;
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getActivities, getActivity };

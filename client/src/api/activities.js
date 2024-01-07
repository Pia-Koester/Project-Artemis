const url = "http://localhost:8080/activities";
import axios from "axios";
import { defineWeek } from "../helper/defineweek.js";

const getActivities = async ({ request }) => {
  try {
    const parameterurl = new URL(request.url);
    const instructor = parameterurl.searchParams.get("instructor");
    const skip = parameterurl.searchParams.get("skip");
    const type = parameterurl.searchParams.get("type");

    const week = defineWeek(skip);

    const response = await axios.get(
      `${url}?instructor=${instructor}&type=${type}&mon=${week.formattedMondayDate}&sun=${week.formattedSundayDate}`
    );
    //TO DO: wo muss entschieden werden ob ein type mitgeschickt wird oder nicht. Wie können die Daten dann gefetched werden?
    const instructors = [];
    const activitytypes = [];
    console.log(response);
    const activitiesByWeekday = response.data.reduce(
      (accumulator, activity) => {
        const { weekday, instructor, type } = activity;
        accumulator[weekday] = accumulator[weekday] || [];
        accumulator[weekday].push(activity);

        if (!instructors.includes(instructor)) {
          instructors.push(instructor);
        }
        console.log(type?.type);

        if (!activitytypes.includes(type?.type)) {
          activitytypes.push(type?.type);
        }

        return accumulator;
      },
      {}
    );

    const data = {
      weekstart: week.formattedMonday,
      weekend: week.formattedSunday,
      activities: activitiesByWeekday,
      instructors: instructors,
      activitytypes,
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

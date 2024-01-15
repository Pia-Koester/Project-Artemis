import { defineWeek } from "../helper/defineweek.js";
import axiosClient from "./axiosClient.jsx";

const getActivities = async ({ request }) => {
  try {
    const parameterurl = new URL(request.url);
    const instructor = parameterurl.searchParams.get("instructor");
    const skip = parameterurl.searchParams.get("skip");
    const type = parameterurl.searchParams.get("type");

    const week = defineWeek(skip);

    const queryParams = {
      mon: week.formattedMondayDate,
      sun: week.formattedSundayDate,
    };

    if (
      instructor !== null &&
      instructor !== undefined &&
      instructor !== "All"
    ) {
      queryParams.instructor = instructor;
    }

    if (type !== null && type !== undefined && type !== "All") {
      queryParams.type = type;
    }

    const queryString = new URLSearchParams(queryParams);

    const response = await axiosClient.get(`activities?${queryString}`);

    //TO DO: wo muss entschieden werden ob ein type mitgeschickt wird oder nicht. Wie können die Daten dann gefetched werden?
    const instructors = [];
    const activitytypes = [];

    const activitiesByWeekday = response.data.reduce(
      (accumulator, activity) => {
        const { weekday, instructor, type } = activity;
        accumulator[weekday] = accumulator[weekday] || [];
        accumulator[weekday].push(activity);

        if (!instructors.includes(instructor)) {
          instructors.push(instructor);
        }

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
    throw Error(error);
  }
};

const getActivity = async ({ params }) => {
  try {
    const { id } = params;
    const response = await axiosClient.get(`activities/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getActivities, getActivity };

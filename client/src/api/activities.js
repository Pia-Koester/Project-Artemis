const url = "http://localhost:8080/activities";
import axios from "axios";
import { defineWeek } from "../helper/defineweek.js";
import axiosClient from "./axiosClient.jsx";

const getActivities = async ({ request }) => {
  try {
    const parameterurl = new URL(request.url);
    const instructor = parameterurl.searchParams.get("instructor");
    const skip = parameterurl.searchParams.get("skip");

    const week = defineWeek(skip);

    const response = await axiosClient.get(
      `activities?instructor=${instructor}&mon=${week.formattedMondayDate}&sun=${week.formattedSundayDate}`
    );

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

        // if (!activitytypes.includes(type.type)) {
        //   activitytypes.push(type.type);
        // } //QUESTION: why is this not getting populated as expected?

        return accumulator;
      },
      {}
    );

    const data = {
      weekstart: week.formattedMonday,
      weekend: week.formattedSunday,
      activities: activitiesByWeekday,
      instructors: instructors,
      // activitytypes,
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

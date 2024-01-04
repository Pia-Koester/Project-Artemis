import { useLoaderData, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ActivityCard from "../components/ActivityCard";

export default function ClassSchedule() {
  const activities = useLoaderData();
  console.log(activities);

  //array of weekdays for the grid columns
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  //functionality to make sure to filter based on week or trainer
  const [searchParams, setSearchParams] = useSearchParams();
  const [trainer, setTrainer] = useState("");
  const handleTrainer = (e) => {
    console.log(e.target.value);
    setTrainer(e.target.value);
    setSearchParams(`instructor=${e.target.value}`);
  };

  //finding date and the week
  const today = new Date();
  //const today = new Date("01.01.2025");
  const currentDayNumber = today.getDay(); // each day of the week corresponts to one numer 0 = sunday, 6 = saturday
  const daysOffset = {
    // currentDayNumber can help us identify how far away monday and sunday are
    0: { monday: -6, sunday: 0 },
    1: { monday: 0, sunday: 6 },
    2: { monday: -1, sunday: 5 },
    3: { monday: -2, sunday: 4 },
    4: { monday: -3, sunday: 3 },
    5: { monday: -4, sunday: 2 },
    6: { monday: -5, sunday: 1 },
  };
  const currentDay = today.getDate(); //this gets the day from the date so 02.04.2023 would be 2

  const mondayOffset = daysOffset[currentDayNumber].monday; //based on the day of the week 0-6 we check what the - or + for that monday are
  const sundayOffset = daysOffset[currentDayNumber].sunday;

  const formattedMondayDate = new Date(today);
  formattedMondayDate.setDate(currentDay + mondayOffset); //this sets the date for the monday of our week

  const formattedSundayDate = new Date(today);
  formattedSundayDate.setDate(currentDay + sundayOffset);

  // Formatting options for the final output
  const formattedOptions = {
    month: "short",
    day: "numeric",
  };

  const formattedMonday = formattedMondayDate.toLocaleDateString(
    "de-DE",
    formattedOptions
  );
  const formattedSunday = formattedSundayDate.toLocaleDateString(
    "de-DE",
    formattedOptions
  );

  console.log({ formattedMonday, formattedSunday });

  // //pagination based on week logic
  // const handleNext = () => {
  //   setToday(today + 7);
  // };
  // const handlePrev = () => {
  //   setToday(today + 7);
  // };

  return (
    <div className="flex gap-3 flex-col items-center p-5">
      <div className="join">
        <button className="join-item btn">«</button>
        <button className="join-item btn">
          {formattedMonday} - {formattedSunday}
        </button>
        <button className="join-item btn">»</button>
      </div>

      <select
        className="select select-secondary w-full max-w-xs"
        onChange={handleTrainer}
      >
        <option selected disabled>
          Pick trainer
        </option>
        {/* TO DO: map through all the activities and if the trainer is not yet listed create a option with trainer name
        TO DO: create logic to show only the classes for this trainer */}
        <option>Isabella</option>
        <option>Cosima</option>
        <option>John Doe</option>
        <option>Rolf</option>
      </select>
      <div className="grid md:grid-cols-7 grid-cols-1 gap-4">
        {weekdays.map((day) => {
          return (
            <div className="flex flex-col gap-2 items-center" key={day}>
              <h3>{day}</h3>
              {activities[day.toLowerCase()]?.map((activity) => {
                return <ActivityCard activity={activity} key={activity._id} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

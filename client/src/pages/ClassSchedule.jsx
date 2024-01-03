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
  console.log("today", today);
  const dayNumber = today.getDay();
  console.log(dayNumber);
  //TO DO: find out which is the monday and which is friday? - can I subtract the daynumber from the today?

  return (
    <div className="flex gap-3 flex-col items-center p-5">
      <div className="join">
        <button className="join-item btn">«</button>
        <button className="join-item btn">11.12. - 17.12.</button>
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

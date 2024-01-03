import axios from "axios";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";

export default function ClassSchedule() {
  const url = "http://localhost:8080/activities";

  const activities = useLoaderData();
  console.log(activities);
  return (
    <div className="flex gap-3 flex-col items-center p-5">
      <div className="join">
        <button className="join-item btn">«</button>
        <button className="join-item btn">11.12. - 17.12.</button>
        <button className="join-item btn">»</button>
      </div>
      <select className="select select-secondary w-full max-w-xs">
        <option disabled selected>
          Pick class type
        </option>
        <option>Self defense</option>
        <option>Yoga</option>
      </select>
      <select className="select select-secondary w-full max-w-xs">
        <option disabled selected>
          Pick trainer
        </option>
        <option>Isabella</option>
        <option>Cosima</option>
      </select>
      <div className="flex gap-3 flex-col items-center p-5">
        {activities.map((activity) => {
          return <ActivityCard activity={activity} key={activity._id} />;
        })}
      </div>
    </div>
  );
}

import { useLoaderData } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";

export default function ClassSchedule() {
  const activities = useLoaderData();
  console.log(activities);
  return (
    <div className="flex gap-3 flex-col items-center p-5">
      <div className="join">
        <button className="join-item btn">«</button>
        <button className="join-item btn">11.12. - 17.12.</button>
        <button className="join-item btn">»</button>
      </div>
      {/* <select className="select select-secondary w-full max-w-xs">
        <option disabled selected>
          Pick class type
        </option>
        <option>Self defense</option>
        <option>Yoga</option>
      </select> */}
      <select className="select select-secondary w-full max-w-xs">
        <option disabled selected>
          Pick trainer
        </option>
        {/* TO DO: map through all the activities and if the trainer is not yet listed create a option with trainer name
        TO DO: create logic to show only the classes for this trainer */}
        <option>Isabella</option>
        <option>Cosima</option>
      </select>
      <div className="grid lg:grid-cols-7 grid-cols-1 gap-4">
        {activities.map((activity) => {
          return <ActivityCard activity={activity} key={activity._id} />;
        })}
      </div>
    </div>
  );
}

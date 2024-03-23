import { useNavigate, useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../components/context/AuthProvider";
import {
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import LocationMap from "../components/Activities/LocationMap";

export default function Bookingconfirmation() {
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);

  const activity = useLoaderData();

  const startTime = new Date(activity.startTime);
  const formattedStartTime = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  console.log(activity.location.address);

  return (
    <div className="mb-4">
      <h1 className="text-4xl flex justify-center mb-6 font-titleFont font-bold">
        Buchung Erfolgreich!
      </h1>
      <h2 className="text-2xl flex justify-center mb-6 font-titleFont font-bold">
        {activity.title} - {formattedStartTime}
      </h2>
      <div className="grid grid-cols-2 grid-rows-2">
        <div className="Kursort card bg-white shadow-xl flex flex-col p-4 min-w-96 col-start-1">
          <div className="flex gap-2 m-2">
            <MapPinIcon className="w-7" />
            <p className="font-bold">Wo muss ich hinkommen?</p>
          </div>
          <LocationMap
            className="w-4/5 self-center"
            location={activity.location}
          />
          <p>Adresse: {activity.location.address}</p>
          <p>Klingel bei: Artemis Academy</p>
        </div>
        <div className="card bg-white shadow-xl flex flex-col p-4 min-w-96 col-start-2">
          <h3 className="font-bold">Kursdetails</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            ducimus recusandae non blanditiis mollitia eveniet doloremque libero
            minus id repudiandae iure placeat soluta quidem repellat voluptatem
            maiores, vitae expedita accusamus sapiente sit, consectetur facilis?
            Fuga hic magnam ipsa ab labore rerum expedita, sed impedit, eligendi
            aspernatur, assumenda sit dignissimos unde?
          </p>
        </div>
      </div>
    </div>
  );
}

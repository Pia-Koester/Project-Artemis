import { FaRegCalendar, FaClock, FaPersonDress } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { handleCancelation } from "../api/cancelationAcitvity";
import clsx from "clsx";
import { useState } from "react";
import CapacityBadge from "../components/Activities/CapacityBadge";

export default function ClassDetails() {
  const { id } = useParams();
  const activity = useLoaderData();
  const [openSlots, setOpenSlots] = useState(
    activity.capacity - activity.registeredUsers.length
  );

  const handleBooking = () => {
    axios
      .put(
        `http://localhost:8080/activities/${id}`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        setOpenSlots(
          response.data.capacity - response.data.registeredUsers.length
        );
        console.log("Data from api", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //transforming dates and times
  const startTime = new Date(activity.startTime);
  const formattedStartTime = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", //TO DO: backend must save dates with UTC+1
  });
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedStartDate = startTime.toLocaleDateString("de-DE", options);
  const startMilliseconds = startTime.getTime();

  //calculate duration based on start and end date in milliseconds
  const endTime = new Date(activity.endTime);
  const formattedEndTime = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", //TO DO: backend must save dates with UTC+1
  });
  const endMilliseconds = endTime.getTime();
  const duration = (endMilliseconds - startMilliseconds) / (1000 * 60);

  console.log(activity);

  //colors for conditional capacity badge
  const capacityColors = {
    0: "badge-error",
    1: "badge-error",
    2: "badge-error",
    3: "badge-warning",
    4: "badge-warning",
  };

  //instructor images based on name
  const photos = {
    Isabella:
      "https://static.wixstatic.com/media/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg/v1/fill/w_378,h_520,fp_0.45_0.35,q_80,usm_0.66_1.00_0.01,enc_auto/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg",
    Cosima:
      "https://static.wixstatic.com/media/87046c_2a44f60d1a8a47faad745a9a3b2e4fa1~mv2.jpg/v1/fill/w_656,h_920,fp_0.48_0.34,q_85,usm_0.66_1.00_0.01,enc_auto/87046c_2a44f60d1a8a47faad745a9a3b2e4fa1~mv2.jpg",
    Rolf: "https://static.wixstatic.com/media/87046c_8b75e3d5339f4d46b34471ccee515c3f~mv2.jpg/v1/fill/w_656,h_1040,fp_0.47_0.37,q_85,usm_0.66_1.00_0.01,enc_auto/87046c_8b75e3d5339f4d46b34471ccee515c3f~mv2.jpg",
  };

  return (
    <div className="flex md:flex-row flex-col-reverse">
      <div className="Kurs-Informationen card bg-base-100 shadow-xl flex flex-col p-4 m-2">
        {/* To Do: block für Kursinformationen erstellen */}
        <h1 className="text-2xl font-bold mb-4">{activity.title}</h1>
        <div className="carousel carousel-center rounded-box w-4/5 self-center">
          {activity.type?.images.map((image) => {
            return (
              <div className="carousel-item">
                <img
                  src={image.url}
                  alt="Pizza"
                  key={image._id}
                  className="object-center	w-96"
                />
              </div>
            );
          })}
        </div>
        <p className="mt-4">{activity.description}</p>
      </div>
      <aside className="card w-96 bg-base-100 shadow-2xl flex flex-col p-4 m-2">
        <div>
          <div className="flex gap-2 m-2">
            <FaRegCalendar className="text-2xl" />
            <p className="font-bold">Date</p>
          </div>
          <p>{formattedStartDate}</p>
        </div>
        <div>
          <div className="flex gap-2 m-2">
            <FaClock className="text-2xl" />
            <p className="font-bold">Time</p>
          </div>
          <p>
            {formattedStartTime} - {formattedEndTime} ({duration} Min.)
          </p>
        </div>

        <div>
          <div className="flex gap-2 m-2">
            <FaPersonDress className="text-2xl" />
            <p className="font-bold">Capacity</p>
          </div>
          <CapacityBadge activity={activity} />
        </div>
        <div className="avatar flex flex-col m-2 mt-4">
          <div className="w-24 mask mask-hexagon self-center">
            <img src={photos[activity.instructor]} />
          </div>
        </div>
        <button
          className="btn btn-primary w-4/5 self-center m-2"
          onClick={handleBooking}
          disabled={openSlots <= 0}
        >
          Book Now
        </button>
        <button
          className="btn btn-primary w-4/5 self-center m-2"
          onClick={handleBooking}
          disabled={openSlots > 0}
        >
          Waitlist
        </button>
        <button
          className="btn btn-primary w-4/5 self-center mt-5 m-2"
          onClick={() => handleCancelation(id)}
        >
          Cancel
        </button>
      </aside>
    </div>
  );
}

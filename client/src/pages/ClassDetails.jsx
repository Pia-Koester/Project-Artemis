import {
  FaRegCalendar,
  FaClock,
  FaPersonDress,
  FaLocationDot,
} from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { handleCancelation } from "../api/cancelationAcitvity";
import { useState } from "react";
import CapacityBadge from "../components/Activities/CapacityBadge";
import LocationMap from "../components/Activities/LocationMap";

export default function ClassDetails() {
  const { id } = useParams();
  const activity = useLoaderData();

  const [openSlots, setOpenSlots] = useState(
    activity.capacity - activity.registeredUsers.length
  );

  const navigate = useNavigate();

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
        console.log(err.response.status);
        if (err.response.status.toString() === "403") {
          navigate("/login");
        }
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

  //TO DO: upload images for all types and create more types

  //instructor images based on name
  const photos = {
    Isabella:
      "https://static.wixstatic.com/media/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg/v1/fill/w_378,h_520,fp_0.45_0.35,q_80,usm_0.66_1.00_0.01,enc_auto/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg",
    Cosima:
      "https://static.wixstatic.com/media/87046c_2a44f60d1a8a47faad745a9a3b2e4fa1~mv2.jpg/v1/fill/w_656,h_920,fp_0.48_0.34,q_85,usm_0.66_1.00_0.01,enc_auto/87046c_2a44f60d1a8a47faad745a9a3b2e4fa1~mv2.jpg",
    Rolf: "https://static.wixstatic.com/media/87046c_8b75e3d5339f4d46b34471ccee515c3f~mv2.jpg/v1/fill/w_656,h_1040,fp_0.47_0.37,q_85,usm_0.66_1.00_0.01,enc_auto/87046c_8b75e3d5339f4d46b34471ccee515c3f~mv2.jpg",
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-center">
      <div className="Kurs-Informationen card bg-base-100 shadow-xl flex flex-col p-4 m-2 min-w-96">
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
        <div className="flex gap-2 m-2">
          <FaLocationDot className="text-2xl" />
          <p className="font-bold">Location</p>
        </div>
        <LocationMap
          className="w-4/5 self-center"
          location={activity.location}
        />
      </div>
      <aside className="card w-96 bg-base-100 shadow-2xl flex flex-col p-4 m-2">
        <h1 className="text-2xl font-bold mb-4 lg:hidden">{activity.title}</h1>
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
          <CapacityBadge openSlots={openSlots} />
        </div>

        <div className="avatar self-center mt-3 sm:flex gap-2">
          <div className="grid grid-rows-2 mt-5">
            <p className="font-bold">Instructor:</p>
            <p>{activity.instructor}</p>
          </div>
          <div className="w-24 mask mask-hexagon">
            <img src={photos[activity.instructor]} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <button
            className="btn btn-primary mr-3 self-center mt-2"
            onClick={() => document.getElementById("my_modal_1").showModal()}
            disabled={openSlots <= 0}
          >
            Book Now
          </button>
          <button
            className="btn btn-neutral mr-3 self-center mt-2"
            onClick={() => navigate(`/`)}
          >
            Go Back
          </button>
        </div>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="card-body items-center text-center">
              <h3 className="font-bold text-lg">Booking Overview</h3>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <div className="flex gap-2">
                  <FaRegCalendar className="text-2xl" />
                  <p className="font-bold">Date</p>
                </div>
                <p>{formattedStartDate}</p>
              </div>

              <div>
                <div className="flex gap-2">
                  <FaClock className="text-2xl" />
                  <p className="font-bold">Time</p>
                </div>
                <p>
                  {formattedStartTime} - {formattedEndTime} ({duration} Min.)
                </p>
              </div>

              <div className="mt-5">
                <div className="flex gap-2">
                  <FaPersonDress className="text-2xl" />
                  <p className="font-bold">Capacity </p>
                </div>
                <CapacityBadge openSlots={openSlots} className="m-2" />
              </div>

              <div className="avatar mt-1">
                <span className="font-bold mt-10">Instructor</span>
                <p className="mt-10">: {activity.instructor}</p>
                <div className="w-24 mask mask-hexagon">
                  <img src={photos[activity.instructor]} />
                </div>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-primary mr-3 self-center"
                  onClick={handleBooking}
                >
                  Confirm
                </button>
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* <button
          className="btn btn-primary w-4/5 self-center mt-5"
          onClick={() => handleCancelation(id)}
      
        >
          Cancel
        </button> */}
        <button
          className="btn btn-primary w-4/5 self-center m-2"
          disabled={openSlots > 0}
        >
          Waitlist
        </button>
      </aside>
    </div>
  );
}

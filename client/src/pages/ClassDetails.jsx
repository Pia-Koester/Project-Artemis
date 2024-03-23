// hero icons for detail page
import {
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import { useNavigate, useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { handleCancelation } from "../api/cancelationAcitvity";
import { useState, useContext } from "react";
import CapacityBadge from "../components/Activities/CapacityBadge";
import LocationMap from "../components/Activities/LocationMap";
import { AuthContext } from "../components/context/AuthProvider";
import EditActivity from "../components/AdminProfile/EditActivity";
import userIcon from "../assets/logos/avatar.jpg";
import axiosClient from "../api/axiosClient";
import Toast from "../components/messages/Toast";
import Bookingmodal from "../components/messages/Bookingmodal";

export default function ClassDetails() {
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);

  const activity = useLoaderData();

  const [openSlots, setOpenSlots] = useState(
    activity.capacity - activity.registeredUsers.length
  );

  const navigate = useNavigate();

  const handleBooking = () => {
    axiosClient
      .put(`/activities/${id}`, {})
      .then((response) => {
        setOpenSlots(
          response.data.activity.capacity -
            response.data.activity.registeredUsers.length
        );
        setShowcalendarbutton(true);
        Toast("Booking Successfull");
        setUser(response.data.user);
      })
      .then(() => {
        navigate(`confirmation/${id}`);
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

  const registeredUsers = activity?.registeredUsers;

  // check if user is admin
  const [showcalendarbutton, setShowcalendarbutton] = useState(false);

  return (
    <div className="mb-4">
      {" "}
      <h1 className="text-4xl flex justify-center mb-6 font-titleFont font-bold">
        {activity.title}
      </h1>
      <div className="flex md:flex-row flex-col-reverse justify-center items-start">
        {" "}
        <button
          className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="w-5" />
        </button>
        <div
          className={`grid grid-cols-${
            user && user.role === "admin" ? 3 : 2
          } grid-rows-${
            user && user.role === "admin" ? 3 : 2
          } gap-2 self-start min-h-0 `}
        >
          <div
            className={`Kurs-Informationen card bg-white shadow-xl flex flex-col p-4 min-w-72 row-span-${
              user && user.role === "admin" ? 3 : 2
            }`}
          >
            <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-base-100 rounded-box">
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
            <p className="mt-4 max-w-md">{activity.description}</p>
          </div>
          <aside
            className={`card bg-white shadow-xl flex flex-col p-4  min-w-96  row-span-1 `}
          >
            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="lg:w-2/3 lg:pr-8">
                <div className="flex gap-2 m-2">
                  <CalendarDaysIcon className="w-7" />
                  <p className="font-titleH3 font-semibold text-xl">Datum</p>
                </div>
                <p>{formattedStartDate}</p>

                <div className="flex gap-2 m-2">
                  <ClockIcon className="w-7" />
                  <p className="font-titleH3 font-semibold text-xl">Uhrzeit</p>
                </div>
                <p>
                  {formattedStartTime} - {formattedEndTime} ({duration} Min.)
                </p>

                <div className="flex gap-2 m-2">
                  <UserIcon className="w-7" />
                  <p className="font-titleH3 font-semibold text-xl">
                    Verfügbarkeit
                  </p>
                </div>
                <CapacityBadge openSlots={openSlots} />
              </div>

              <div className="lg:w-1/3">
                <div className="avatar self-center mt-3 sm:flex gap-2">
                  <div className="w-24 mask mask-hexagon">
                    <img
                      src={activity.instructor.image.url}
                      alt={activity.instructor.firstName}
                    />
                  </div>
                </div>
                <div className="grid grid-rows-2 mt-5 mr-4">
                  <p className="font-titleH3 font-semibold text-xl">
                    Instructor:
                  </p>
                  <p>{activity.instructor.firstName}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center flex-wrap">
              {user?.role !== "admin" && (
                <>
                  {!user ||
                  !user.classesRegistered.find((activity) => {
                    return activity._id === id;
                  }) ? (
                    <button
                      className="btn btn-primary mr-3 self-center mt-2"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                      disabled={openSlots <= 0}
                    >
                      Book Now
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-secondary mr-3 self-center mt-2"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                        disabled={openSlots <= 0}
                      >
                        Cancel Booking
                      </button>{" "}
                    </>
                  )}
                </>
              )}{" "}
              {user?.role !== "admin" && (
                <button
                  className="btn btn-secondary mr-3 self-center mt-2"
                  disabled={openSlots > 0}
                >
                  Waitlist
                </button>
              )}
            </div>
            <Bookingmodal
              handleBooking={handleBooking}
              activity={activity}
              id={id}
              formattedStartTime={formattedStartTime}
              formattedEndTime={formattedEndTime}
              formattedStartDate={formattedStartDate}
            />
          </aside>
          {user && user.role === "admin" ? (
            <div className="Angemeldete-Nutzer card bg-white shadow-xl flex flex-col p-4 min-w-96 col-start-2 row-start-2 row-span-2  max-h-[550px] overflow-x-auto overflow-y-auto">
              <div>
                <h3 className="flex justify-center text-2xl leading-6 font-medium text-gray-900 font-titleH3 mb-1">
                  Angemeldete Nutzer:innen
                </h3>
                {registeredUsers.length === 0 ? (
                  <p className="text-center mt-2">
                    Bis jetzt ist niemand angemeldet
                  </p>
                ) : (
                  <table className="table p-2 m-2  max-h-[300px] overflow-x-auto overflow-y-auto">
                    <tbody>
                      {registeredUsers.map((student) => {
                        return (
                          <tr key={student._id}>
                            <th>
                              <div className="avatar">
                                <div className="w-16 rounded-full">
                                  {student.image?.url ? (
                                    <img
                                      alt="User Icon - click to see menu options"
                                      src={student.image?.url}
                                      className="w-full h-full object-cover rounded-full"
                                    />
                                  ) : (
                                    <img
                                      alt="User Icon - click to see menu options"
                                      src={userIcon}
                                    />
                                  )}
                                </div>
                              </div>
                            </th>
                            <td>
                              <div>{student.lastName}</div>
                            </td>
                            <td>{student.firstName}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            <div className="Kursort card bg-white shadow-xl flex flex-col p-4 min-w-96 col-start-2">
              <div className="flex gap-2 m-2">
                <MapPinIcon className="w-7" />
                <p className="font-bold">Ort</p>
              </div>
              <LocationMap
                className="w-4/5 self-center"
                location={activity.location}
              />
            </div>
          )}{" "}
          {user && user.role === "admin" && (
            <EditActivity activity={activity} hideBackButton />
          )}
        </div>
      </div>
    </div>
  );
}

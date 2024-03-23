import { useContext, useState } from "react";
import { handleCancelation } from "../../api/cancelationAcitvity";
import { AuthContext } from "../context/AuthProvider";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Toast from "../messages/Toast";

// hero icons for detail page
import {
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
export default function UserActivities() {
  const {
    user: { classesRegistered: userActivity },
    setUser,
  } = useContext(AuthContext);

  //change color of card based on if the time and day have already passed
  const today = new Date();
  // const [past, setPast] = useState(startTime < today);

  console.log(userActivity);

  return (
    <>
      <div className="text-center mb-5">
        <h2 className="text-2xl leading-6 font-medium text-gray-900 font-titleH3">
          Meine gebuchten Kurse
        </h2>
      </div>

      {!userActivity ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : userActivity.length === 0 ? (
        <div className="flex flex-col items-center justify-center mb-5">
          <div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-1/3">
            <h5 class="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium leading-tight dark:border-neutral-600 dark:text-neutral-50">
              Noch hast du keine Kurse gebucht{" "}
            </h5>
            <div class="p-6">
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"></h5>
              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                In order to book a class, you will need an active membership
                plan first. Click the "Purchase Membership" button below and get
                one of the available plans now!
              </p>

              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                In case you already have a membership plan, just click the "Show
                Schedule" button and start booking!
              </p>
              <div className="flex justify-end gap-2">
                <Link
                  to={"/membershipPlans"}
                  type="button"
                  href="#"
                  className="btn btn-primary mr-3 self-center mt-2"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Purchase membership
                </Link>
                <Link
                  to={"/"}
                  type="button"
                  href="#"
                  className="btn btn-success mr-3 self-center mt-2"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Show Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        userActivity
          .sort((a, b) => {
            if (a.startTime < b.startTime) {
              return 1;
            } else {
              return -1;
            }
          })
          .map((userActivity) => {
            const startTime = new Date(userActivity.startTime);
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
            const formattedStartDate = startTime.toLocaleDateString(
              "de-DE",
              options
            );
            const startMilliseconds = startTime.getTime();

            //calculate duration based on start and end date in milliseconds
            const endTime = new Date(userActivity.endTime);
            const formattedEndTime = endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const endMilliseconds = endTime.getTime();
            const duration = Math.ceil(
              ((endMilliseconds - startMilliseconds) / (1000 * 60) / 10) * 10
            );

            return (
              <div
                key={userActivity._id}
                className="mb-4 lg:w-6/12 w-11/12 mx-auto"
              >
                <div className="card bg-primary text-primary-content grid lg:grid-cols-2">
                  <div className="card-body">
                    <h2 className="card-title text-wrap font-titleFont">
                      {userActivity.title}
                    </h2>
                    <div className="flex gap-2 m-2">
                      <CalendarDaysIcon className="w-7" />
                      <p className="font-titleH3 font-semibold text-xl">
                        Datum
                      </p>
                    </div>
                    <p>{formattedStartDate}</p>

                    <div className="flex gap-2 m-2">
                      <ClockIcon className="w-7" />
                      <p className="font-titleH3 font-semibold text-xl">
                        Uhrzeit
                      </p>
                    </div>
                    <p>
                      {formattedStartTime} - {formattedEndTime} ({duration}{" "}
                      Min.)
                    </p>

                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {userActivity.location.address}, 20357, Hamburg
                    </p>

                    <div className="flex justify-between items-end">
                      <div>
                        <button
                          className=""
                          onClick={() => {
                            handleCancelation(userActivity._id, setUser);
                            Toast("Deletion Successfull");
                          }}
                        >
                          Cancel Booking
                        </button>
                      </div>
                      <div>
                        <button>Class Finished</button>
                      </div>
                    </div>
                  </div>
                  <div className="avatar flex-col items-end card-body hidden sm:flex">
                    <div className="w-24 mask mask-hexagon mr-4">
                      <img src={userActivity.instructor?.image?.url} />
                    </div>
                    <p>
                      <span className="font-medium ">Instructor: </span>
                      {userActivity.instructor?.firstName}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
      )}
    </>
  );
}

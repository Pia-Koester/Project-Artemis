import { useContext, useState } from "react";
import { handleCancelation } from "../../api/cancelationAcitvity";
import { AuthContext } from "../context/AuthProvider";
import clsx from "clsx";
import { Link } from "react-router-dom";

export default function UserActivities() {
  const {
    user: { classesRegistered: userActivity },
    setUser,
  } = useContext(AuthContext);

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based, so we add 1
  const currentDay = currentDate.getDate();
  const currentMinutes = currentDate.getMinutes();
  const currentHours = currentDate.getHours() + 1;

  return (
    <>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Your booked classes</h2>
      </div>
      {!userActivity ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : userActivity.length === 0 ? (
        <div className="flex flex-col items-center justify-center mb-5">
          <div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-1/3">
            <h5 class="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium leading-tight dark:border-neutral-600 dark:text-neutral-50">
              You don't have any classes booked yet
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
            const getStartDate = userActivity.startTime;
            const formatStartDate = getStartDate.split("T");
            const formatStartTime = formatStartDate[1].split(".");

            const getEndDate = userActivity.endTime;
            const formatEndDate = getEndDate.split("T");
            const formatEndTime = formatEndDate[1].split(".");

            const utcTimeString = userActivity.startTime;
            const date = new Date(utcTimeString);

            const year = date.getFullYear();
            const month = date.getMonth() + 1; // JavaScript months are 0-based, so we add 1
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();

            let pastDate = false;
            console.log(date.getHours() + 1);

            if (currentYear > year) {
              pastDate = true;
            } else if (currentYear === year && currentMonth > month) {
              pastDate = true;
            } else if (
              currentYear === year &&
              currentMonth === month &&
              currentDay > day
            ) {
              pastDate = true;
            } else if (
              currentYear === year &&
              currentMonth === month &&
              currentDay === day &&
              currentHours > hours
            ) {
              pastDate = true;
            } else if (
              currentYear === year &&
              currentMonth === month &&
              currentDay === day &&
              currentHours === hours &&
              currentMinutes > minutes
            ) {
              pastDate = true;
            }

            return (
              <div
                key={userActivity._id}
                className="mb-4 lg:w-6/12 w-11/12 mx-auto"
              >
                <div
                  className={clsx(
                    "card bg-primary text-primary-content grid lg:grid-cols-2",
                    pastDate && "opacity-50"
                  )}
                >
                  <div className="card-body">
                    <h2 className="card-title">{userActivity.title}</h2>

                    <p>{userActivity.description}</p>
                    <p>
                      <span className="font-medium">Start time:</span>{" "}
                      {formatStartDate[0] +
                        " at " +
                        formatStartTime[0].slice(0, 5)}
                    </p>
                    <p>
                      <span className="font-medium">End time: </span>
                      {formatEndDate[0] + " at " + formatEndTime[0].slice(0, 5)}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {userActivity.location.address}, 20357, Hamburg
                    </p>

                    <div className="flex justify-between items-end">
                      <div
                        className={clsx(
                          "badge badge-secondary",
                          pastDate && "hidden"
                        )}
                      >
                        <button
                          className=""
                          onClick={() => {
                            handleCancelation(userActivity._id, setUser);
                            // window.location.reload();
                          }}
                        >
                          Cancel Booking
                        </button>
                      </div>
                      <div
                        className={clsx(
                          "badge badge-neutral",
                          !pastDate && "hidden"
                        )}
                      >
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

import clsx from "clsx";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { handleCancelation } from "../../api/cancelationAcitvity";

import { ClockIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function Bookingmodal({
  handleBooking,
  activity,
  id,
  formattedEndTime,
  formattedStartTime,
  formattedStartDate,
}) {
  const { user, setUser } = useContext(AuthContext);

  return (
    <dialog id="my_modal_1" className="modal">
      <div
        className={clsx(
          "modal-box",
          user?.activeMembership === null ||
            (user?.activeMembership.status === "inactive" && "hidden")
        )}
      >
        <div className="card-body items-center text-center">
          <h3 className="font-bold text-lg">Booking Overview</h3>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <div className="flex gap-2">
              <CalendarDaysIcon className="w-7" />
              <p className="font-bold">Datum</p>
            </div>
            <p>{formattedStartDate}</p>
          </div>

          <div>
            <div className="flex gap-2">
              <ClockIcon className="w-7" />
              <p className="font-bold">Uhrzeit</p>
            </div>
            <p>
              {formattedStartTime} - {formattedEndTime}
            </p>
          </div>

          <div className="avatar mt-1">
            <span className="font-bold mt-10">Instructor</span>
            <p className="mt-10">: {activity.instructor.firstName}</p>
            <div className="w-24 mask mask-hexagon">
              <img src={activity.instructor.image.url} />
            </div>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            {!user ||
            !user.classesRegistered.find((activity) => {
              return activity._id === id;
            }) ? (
              <button
                className="btn btn-primary mr-3 self-center mt-2"
                onClick={() => {
                  handleBooking();
                }}
              >
                Confirm
              </button>
            ) : (
              <button
                className="btn btn-secondary mr-3 self-center mt-2"
                onClick={() => {
                  handleCancelation(id, setUser, setOpenSlots);
                  Toast("Canceled Successfully");
                }}
              >
                Cancel Booking
              </button>
            )}

            <button className="btn">Close</button>
          </form>
        </div>
      </div>

      {user?.activeMembership?.status === "inactive" && (
        <div>
          <div className="w-full mx-auto">
            <div className="flex flex-col p-5 rounded-lg shadow bg-white">
              <div className="flex flex-col items-center text-center">
                <div className="inline-block p-4 bg-yellow-50 rounded-full">
                  <svg
                    className="w-12 h-12 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                  </svg>
                </div>
                <h2 className="mt-2 font-semibold text-gray-800">
                  Warning! No credits available
                </h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  You dont have an any more credits available with your current
                  membership plan. In order to book a class, please purchase
                  another membership plan.
                </p>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-400 text-gray-800 text-sm font-medium rounded-md">
                    Cancel
                  </button>

                  <button
                    onClick={() => navigate("/membershipPlans")}
                    className="flex-1 px-4 py-2 ml-2 bg-primary hover:bg-success text-white text-sm font-medium rounded-md"
                  >
                    Purchase Membership Plan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={clsx(
          "modal-box",
          user?.activeMembership !== null && "hidden"
        )}
      >
        <div className="w-full mx-auto">
          <div className="flex flex-col p-5 rounded-lg shadow bg-white">
            <div className="flex flex-col items-center text-center">
              <div className="inline-block p-4 bg-yellow-50 rounded-full">
                <svg
                  className="w-12 h-12 fill-current text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                </svg>
              </div>
              <h2 className="mt-2 font-semibold text-gray-800">
                No active membership plan
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                You dont have an active membership plan. In order to book a
                class, please purchase one of the available membership plans
              </p>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-400 text-gray-800 text-sm font-medium rounded-md">
                  Cancel
                </button>

                <button
                  onClick={() => navigate("/membershipPlans")}
                  className="flex-1 px-4 py-2 ml-2 bg-primary hover:bg-success text-white text-sm font-medium rounded-md"
                >
                  Purchase Membership Plan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

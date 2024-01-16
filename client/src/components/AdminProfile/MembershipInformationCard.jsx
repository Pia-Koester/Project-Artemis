import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import clsx from "clsx";

export default function MembershipInformationCard({ membership }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const deleteMembership = () => {
    axiosClient
      .delete(`/plan/delete/${membership._id}`)
      .then((response) => {
        closeModal();
        notify();
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notify = () =>
    toast.success(
      "--Deleted Successfully-- Redirecting to the admin dashboard",
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

  const closeModal = () => {
    modalRef.current.close(); // Close the modal
  };

  return (
    <>
      <div className="collapse bg-base-200 mb-5 sm:w-full lg:w-full ">
        <ToastContainer
          position="top-center"
          autoClose={1500}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          {membership.title}
        </div>

        <div className="collapse-content">
          <div className="mx-auto mb-5 card w-96 bg-base-100 shadow-xl ">
            <div className="card-body items-center text-center">
            <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 w-full mx-auto">
              <div
                class={clsx(
                  "p-1",
                  membership.title === "Basic Membership" && "bg-blue-200",
                  membership.title === "Premium Membership" && "bg-green-200",
                  membership.title === "Gold Membership" && "bg-amber-200",
                  membership.title === "Platinum Membership" && "bg-purple-200"
                )}
              ></div>

              <div class="p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">
                  {membership.title}
                </h2>
                <p class="text-4xl font-bold text-gray-800 mb-6">
                  €{membership.price}.00
                </p>
                <ul class="text-sm text-gray-600 mb-6">
                  <li class="mb-2 flex items-center">
                    <svg
                      class="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Usage: {membership.totalCredits + " " + "Bookings"}
                  </li>
                  <li class="mb-2 flex items-center">
                    <svg
                      class="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Validity: {membership.validity + " " + "Days"}
                  </li>
                  <li class="mb-2 flex items-center">
                    <svg
                      class="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Cancel Scheduled Activity Anytime
                  </li>
                  <li class="mb-2 flex items-center text-left">
                    <svg
                      class="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Credits refunded if Class was not attended
                  </li>
                </ul>
              </div>
            </div>
              <Link
                to={`/userProfile/membershipsOverview/${membership._id}`}
                className="w-full  btn btn-primary text-white px-4 py-2  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Edit Membership
              </Link>

              <button
                className="w-full  btn btn-error text-white px-4 py-2  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => modalRef.current.showModal()}
              >
                Delete Membership
              </button>

              <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                  <div
                    id="alert-additional-content-2"
                    className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                    role="alert"
                  >
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <h3 className="text-lg font-medium">
                        Warning! You are about the delete the membership plan:{" "}
                        <span className="font-bold">{membership.title}</span>
                      </h3>
                    </div>
                    <div className="mt-2 mb-4 text-sm"></div>
                    <div className="mt-2 mb-4 text-sm">
                      After clicking the "Confirm" button this action can no
                      longer be reverted!
                    </div>
                    <div className="mt-2 mb-4 text-sm">
                      Are you sure you want to delte the membership plan?
                    </div>
                    <div className="flex">
                      <button
                        onClick={deleteMembership}
                        type="button"
                        className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Confirm
                      </button>
                      <form method="dialog">
                        <button className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800">
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

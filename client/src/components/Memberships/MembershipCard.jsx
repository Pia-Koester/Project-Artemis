import { useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthProvider";
import clsx from "clsx";
import axiosClient from "../../api/axiosClient";
import Toast from "../messages/Toast";

export default function MembershipCard({ plan, user }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    axiosClient
      .get(`/plan/${plan?._id}`)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const currentDate = new Date();
  const expiryDate = new Date(
    currentDate.setDate(currentDate.getDate() + plan?.validity)
  );

  const handlePurchase = () => {
    axiosClient
      .post("/memberships", {
        plan: plan?._id,
        user: user?._id,
        expiryDate: expiryDate.toISOString(),
      })
      .then((response) => {
        closeModal();
        Toast("Purchase Successfull");
        setUser((prev) => {
          return { ...prev, activeMembership: response.data };
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status.toString() === "403") {
          navigate("/login");
        }
      });
  };

  const closeModal = () => {
    modalRef.current.close(); // Close the modal
  };

  return (
    <>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 w-3/5 mx-auto">
        <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
          <div
            class={clsx(
              "p-1",
              plan.title === "Basic Membership" && "bg-blue-200",
              plan.title === "Premium Membership" && "bg-green-200",
              plan.title === "Gold Membership" && "bg-amber-200",
              plan.title === "Platinum Membership" && "bg-purple-200"
            )}
          ></div>

          <div class="p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">{plan.title}</h2>
            <p class="text-4xl font-bold text-gray-800 mb-6">
              €{plan.price}.00
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
                Usage: {plan.totalCredits + " " + "Bookings"}
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
                Validity: {plan.validity + " " + "Days"}
              </li>
              <li class="flex items-center">
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
              <li class="flex items-center">
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
          <div class="p-4">
            <button
              onClick={() => modalRef.current.showModal()}
              class={clsx(
                "w-full text-white rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800",

                plan.title === "Basic Membership" && "bg-blue-400",
                plan.title === "Premium Membership" && "bg-green-400",
                plan.title === "Gold Membership" && "bg-amber-400",
                plan.title === "Platinum Membership" && "bg-purple-400"
              )}
            >
              Select Plan
            </button>
          </div>
        </div>

        <dialog ref={modalRef} id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center">
              Confirm your purchase!
            </h3>
            <p className="py-4 text-center">
              You are about to purchase the following membership
            </p>
            <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 w-4/5 mx-auto">
              <div
                class={clsx(
                  "p-1",
                  plan.title === "Basic Membership" && "bg-blue-200",
                  plan.title === "Premium Membership" && "bg-green-200",
                  plan.title === "Gold Membership" && "bg-amber-200",
                  plan.title === "Platinum Membership" && "bg-purple-200"
                )}
              ></div>

              <div class="p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">
                  {plan.title}
                </h2>
                <p class="text-4xl font-bold text-gray-800 mb-6">
                  €{plan.price}.00
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
                    Usage: {plan.totalCredits + " " + "Bookings"}
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
                    Validity: {plan.validity + " " + "Days"}
                  </li>
                  <li class="flex items-center">
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
                  <li class="flex items-center">
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
            <div className="modal-action">
              <form method="dialog">
                <button
                  onClick={() => {
                    handlePurchase();
                  }}
                  className="btn btn-primary mr-3"
                >
                  Buy Now
                </button>
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}

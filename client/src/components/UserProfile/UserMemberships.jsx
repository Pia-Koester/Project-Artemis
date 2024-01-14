import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
export default function UserMemberships() {
  const { user } = useContext(AuthContext);

  const formatPurchasedDate = user?.activeMembership?.purchaseDate?.split("T");
  const formatExpiryDate = user?.activeMembership?.expiryDate?.split("T");

  return (
    <>
      {!user ? (
        <p>Loading...</p>
      ) : user.activeMembership === null ? (
        <div className="flex flex-col items-center justify-center mb-5">
          <div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-1/3">
            <h5 class="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium leading-tight dark:border-neutral-600 dark:text-neutral-50">
              Membership Overview
            </h5>
            <div class="p-6">
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                You don't have a membership plan yet
              </h5>
              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                In order to book a class, you will need an active membership
                plan. Click the button below and purchase one of the available
                plans now!
              </p>
              <div className="flex justify-end ">
                <Link
                  to={"/membershipPlans"}
                  type="button"
                  href="#"
                  className="btn btn-primary ml-auto mr-3 mt-2 w-fit"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Purchase membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Your active membership</h2>
          </div>
          <div class="bg-base-100 flex justify-center items-center mb-5">
            <div class="space-y-16">
              <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
                <img
                  class="relative object-cover w-full h-full rounded-xl"
                  src="https://i.imgur.com/kGkSg1v.png"
                />

                <div class="w-full px-8 absolute top-8">
                  <div class="flex justify-between">
                    <div class="">
                      <p class="font-light"></p>
                      Membership plan:
                      <p class="font-bold tracking-widest">
                        {user?.activeMembership?.plan?.title}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-9 h-9"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                  </div>
                  <div class="pt-1">
                    <p class="font-light"></p>
                    Credits available:
                    <p class="font-bold tracking-more-wider">
                      {user.activeMembership?.plan.totalCredits -
                        user?.activeMembership?.usedCredits}
                    </p>
                  </div>
                  <div class="pt-6 pr-6">
                    <div class="flex justify-between">
                      <div class="">
                        <p class="font-light text-xs"></p>
                        Date purchased:
                        <p class="font-bold tracking-wider text-sm">
                          {formatPurchasedDate[0]}
                        </p>
                      </div>
                      <div class="">
                        <p class="font-light text-xs "></p>
                        Expiry date:
                        <p class="font-bold tracking-wider text-sm">
                          {formatExpiryDate[0]}
                        </p>
                      </div>

                      <div class="">
                        <p class="font-light text-xs"></p>
                        Status
                        <p class="font-bold tracking-more-wider text-sm">
                          {user?.activeMembership?.status
                            .charAt(0)
                            .toUpperCase() +
                            user?.activeMembership?.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

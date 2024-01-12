import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import {Link} from "react-router-dom"
export default function UserMemberships() {
  const { user, checkUserMembership } = useContext(AuthContext);

  const formatPurchasedDate = user?.activeMembership?.purchaseDate?.split("T");
  const formatExpiryDate = user?.activeMembership?.expiryDate?.split("T");

  return (
    <>


      {!user ? (
        <p>Loading...</p>
      ) : checkUserMembership === null ? (
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
            In order to book a class, you will need an active membership plan. Click the button below and purchase one of the available plans now!
            </p>
            <Link
            to={"/membershipPlans"}
              type="button"
              href="#"
              class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Purchase membership
            </Link>
          </div>
        </div>
        </div>
      ) : (
        <div>
                <div className="card-body items-center text-center">
        <h2 className="card-title">Your active membership</h2>
      </div>
        <div className="card w-96 bg-neutral text-neutral-content mx-auto mb-12">
          <div className="card-body items-center text-center">
            <h2 className="card-title">{user?.activeMembership?.plan?.title}</h2>
            {formatPurchasedDate && (
              <p>Purchase Date: {formatPurchasedDate[0]}</p>
            )}
            {/* To Do: determine the expiry date of the membership plan and replace the hardcoded string TBD*/}
            {formatPurchasedDate && <p>Expiry Date: {formatExpiryDate[0]}</p>}

            <div className="card-actions justify-end">
              <p className="btn btn-primary">
                Status: {user?.activeMembership?.status}
              </p>
              <p className="btn btn-ghost">
                Credits remaining:{" "}
                {user.activeMembership?.plan.totalCredits -
                  user?.activeMembership?.usedCredits}
              </p>
            </div>
          </div>
        </div>
        </div>

      )}
    </>
  );
}

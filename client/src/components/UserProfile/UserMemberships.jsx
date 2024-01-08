import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
export default function UserMemberships() {

  const {user} = useContext(AuthContext);

  const formatPurchasedDate = user?.activeMembership.purchaseDate.split("T");

  return (
    <>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Your active membership</h2>
      </div>

      {!user ? (
        <p>Loading...</p>
      ) : (
        <div className="card w-96 bg-neutral text-neutral-content mx-auto mb-12">
          <div className="card-body items-center text-center">
            <h2 className="card-title">{user.activeMembership.plan.title}</h2>
            <p>Date purchased: {formatPurchasedDate[0]}</p>
            {/* To Do: determine the expiry date of the membership plan and replace the hardcoded string TBD*/}
            <p>Date expiry: TBD</p>
            <div className="card-actions justify-end">
              <p className="btn btn-primary">Status: {user.activeMembership.status}</p>
              <p className="btn btn-ghost">
                Credits remaining: {10 - user.activeMembership.usedCredits}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

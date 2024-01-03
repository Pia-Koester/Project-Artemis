import axios from "axios";
import { useEffect, useState } from "react";

export default function UserMemberships() {
  const [userMembership, setUserMembership] = useState(null);
  const [membershipInfo, setMembershipInfo] = useState(null);

  useEffect(() => {
    getUser("http://localhost:8080/users/profile");
    // getMembershipInfo("")
  }, []);

  const getUser = async (url) => {
    try {
      const response = await axios.get(url, { withCredentials: true });
      setUserMembership(response.data.activeMembership);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

//   const getMembershipInfo = async (url) => {
//     try {
//       const response = await axios.get(url);
//       setMembershipInfo(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <>
      {!userMembership ? (
        <p>Loading...</p>
      ) : (
        <div className="card w-96 bg-neutral text-neutral-content mx-auto">
          <div className="card-body items-center text-center">
            <h2 className="card-title">{userMembership.plan}</h2>
            <p>Date purchased: {userMembership.purchaseDate}</p>
            <p>Date expiry: TBD</p>
            <div className="card-actions justify-end">
              <p className="btn btn-primary">Status: {userMembership.status}</p>
              <p className="btn btn-ghost">Credits remaining: {10 - userMembership.usedCredits}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import MembershipCard from "./MembershipCard";
import axiosClient from "../../api/axiosClient";

export default function CreateUserMembership() {
  const [membershipPlan, setMembershipPlan] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMembershipPlan("/plan");
    getUser("/users/profile");
  }, []);

  const getMembershipPlan = async (url) => {
    try {
      const response = await axiosClient.get(url);
      setMembershipPlan(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (url) => {
    try {
      const response = await axiosClient.get(url);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //TO DO discuss if a description is needed
  return (
    <>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Chose your membership plan</h2>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1">
        {!membershipPlan && !user ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          membershipPlan.map((plan) => {
            return <MembershipCard key={plan._id} plan={plan} user={user} />;
          })
        )}
      </div>
    </>
  );
}

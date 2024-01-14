import axios from "axios";
import { useEffect, useState } from "react";
import MembershipCard from "./MembershipCard";

export default function CreateUserMembership() {
  const [membershipPlan, setMembershipPlan] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMembershipPlan("http://localhost:8080/plan");
    getUser("http://localhost:8080/users/profile");
  }, []);

  const getMembershipPlan = async (url) => {
    try {
      const response = await axios.get(url, { withCredentials: true });
      setMembershipPlan(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (url) => {
    try {
      const response = await axios.get(url, { withCredentials: true });
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
          <p>Loading...</p>
        ) : (
          membershipPlan.map((plan) => {
            return <MembershipCard key={plan._id} plan={plan} user={user} />;
          })
        )}
      </div>
    </>
  );
}

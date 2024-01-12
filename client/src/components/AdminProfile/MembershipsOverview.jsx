import { useState, useEffect } from "react";
import axios from "axios";
import MembershipInformationCard from "./MembershipInformationCard";
import { Link } from "react-router-dom";

export default function MembershipsOverview() {
  const [memberships, setMemberships] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/plan", { withCredentials: true })
      .then((response) => {
        setMemberships(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center px-4 py-3 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Membership plan overview
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Details and informations about membership plans
        </p>
      </div>
      <Link
        to={"/userProfile/createMembership"}
        type="submit"
        className=" bg-success text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
      >
        Create New Membership +
      </Link>
      {!memberships ? (
        <p>Loading...</p>
      ) : (
        memberships.map((memberships) => {
          return (
            <MembershipInformationCard
              key={memberships._id}
              membership={memberships}
            />
          );
        })
      )}
    </div>
  );
}

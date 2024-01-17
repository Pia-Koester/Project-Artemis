import { useState, useEffect } from "react";
import MembershipInformationCard from "./MembershipInformationCard";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { FaArrowLeft } from "react-icons/fa6";

export default function MembershipsOverview() {
  const [memberships, setMemberships] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/plan")
      .then((response) => {
        setMemberships(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <button
        className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
        onClick={() => navigate("/dashboard")}
      >
        <FaArrowLeft />
      </button>
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-between">
          <div className="flex flex-col items-center justify-center px-4 py-3 sm:px-6">
            <h3 className="text-2xl leading-6 font-medium text-gray-900 font-titleH3">
              Membership plan overview
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details and informations about membership plans
            </p>
          </div>
        </div>
        <Link
          to={"/userProfile/createMembership"}
          type="submit"
          className=" btn btn-success text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
        >
          Create New Membership +
        </Link>
        {!memberships ? (
          <span className="loading loading-dots loading-lg"></span>
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
    </div>
  );
}

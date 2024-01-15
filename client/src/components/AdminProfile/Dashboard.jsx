import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const { id } = useParams();

  const [users, setUsers] = useState(null);
  const [type, setType] = useState(null);
  const [activities, setActivities] = useState(null);
  const [memberships, setMemberships] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/users", {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/plan", { withCredentials: true })
      .then((response) => {
        setMemberships(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/activityTypes", { withCredentials: true })
      .then((response) => {
        setType(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/activities", { withCredentials: true })
      .then((response) => {
        setActivities(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div class="flex flex-col bg-gray-100">
        <div class="flex-1 flex flex-wrap">
          <div
            class="p-1 bg-base-100 w-full md:w-60 flex flex-col md:flex"
            id="sideNav"
          >
            <nav>
              <Link
                to={"/landingPage"}
                class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
              >
                <span className="grid grid-cols-2 w-1/3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 "
                  >
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                  </svg>
                  Home
                </span>
              </Link>

              <Link
                to={"/"}
                class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="#"
              >
                <span className="grid grid-cols-2 w-1/3 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Schedule Overview
                </span>
              </Link>

              <Link
                to={"/userProfile/usersOverview"}
                class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="#"
              >
                <span className="grid grid-cols-2 w-1/3 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                      clipRule="evenodd"
                    />
                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                  </svg>
                  Users Overview
                </span>
              </Link>

              <Link
                to={"/userProfile/membershipsOverview"}
                class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="#"
              >
                <span className="grid grid-cols-2 w-1/3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                    <path
                      fillRule="evenodd"
                      d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Memberships
                </span>
              </Link>

              <Link
                to={"/createType"}
                class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="#"
              >
                <span className="grid grid-cols-2 w-1/3 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Activity Types
                </span>
              </Link>

              <Link
                to={"/createActivity"}
                class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="#"
              >
                <span className="grid grid-cols-2 w-1/3 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                      clipRule="evenodd"
                    />
                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                  </svg>
                  <p>Create Activity</p>
                </span>
              </Link>
            </nav>
          </div>

          <div class=" shadow-inner flex-1 p-4 w-full md:w-1/2 bg-base-200">
            <div class="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
              <div class="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                <div className="flex flex-col-2 justify-between">
                  <h2 class="text-gray-500 text-lg font-semibold pb-1">
                    Membership Plans
                  </h2>
                  <Link
                    to={"/userProfile/membershipsOverview"}
                    class="btn btn-primary hover:bg-cyan-800 text-white font-semibold py-1 px-4 w-1/4 mb-2"
                  >
                    View More
                  </Link>
                </div>

                <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                <div class="chart-container">
                  <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Type Title</th>
                          <th>Price</th>
                          <th>Validity</th>
                          <th>Max Credits</th>
                        </tr>
                      </thead>
                      {!memberships ? (
                        <p>Loading...</p>
                      ) : (
                        memberships.map((membership) => {
                          return (
                            <tbody key={membership._id}>
                              <tr>
                                <td>
                                  <div className="font-bold">
                                    {membership.title}
                                  </div>
                                </td>
                                <td>
                                  <div className="font-semibold">
                                    {membership.price + ",00 €"}
                                  </div>
                                </td>
                                <td>
                                  <div className="font-semibold">
                                    {membership.validity + " " + "Days"}
                                  </div>
                                </td>
                                <td>
                                  <div className="font-semibold">
                                    {membership.totalCredits + " " + "Bookings"}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })
                      )}
                    </table>
                  </div>
                </div>
              </div>

              <div class="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                <div className="flex flex-col-2 justify-between">
                  <h2 class="text-gray-500 text-lg font-semibold pb-1">
                    Activity Types
                  </h2>
                  <button
                    class="btn btn-primary hover:bg-cyan-800 text-white font-semibold py-1 px-4 w-1/4 mb-2"
                    onClick={() => {
                      navigate("/createType");
                    }}
                  >
                    View More
                  </button>
                </div>
                <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                <div
                  class="chart-container"
                  //   style="position: relative; height:150px; width:100%"
                >
                  <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Type Title</th>
                        </tr>
                      </thead>
                      {!type ? (
                        <p>Loading...</p>
                      ) : (
                        type.map((type) => {
                          return (
                            <tbody key={type._id}>
                              <tr>
                                <td>
                                  <div className="font-bold">
                                    {type.type.charAt(0).toUpperCase() +
                                      type.type.slice(1)}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })
                      )}
                    </table>
                  </div>
                </div>
              </div>
              <div class="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                <div className="flex flex-col-2 justify-between">
                  <h2 class="text-gray-500 text-lg font-semibold pb-1">
                    Classes
                  </h2>
                  <Link
                    to={"/createActivity"}
                    class="btn btn-success hover:bg-cyan-600 text-white font-semibold py-1 px-4 w-1/4 mb-2"
                  >
                    Create New
                  </Link>
                </div>
                <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>

                <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Class Name</th>
                        <th>Start Date</th>
                        <th>Start Time</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    {!activities ? (
                      <p>Loading...</p>
                    ) : (
                      activities.map((activity) => {
                        const getStartDate = activity.startTime;
                        const formatStartDate = getStartDate.split("T");
                        const formatStartTime = formatStartDate[1].split(".");
                        return (
                          <tbody key={activity._id}>
                            <tr>
                              <td>
                                <div className="font-bold">
                                  {activity.title}
                                </div>
                              </td>
                              <td className="min-w-[110px]">
                                <div className="font-semibold">
                                  {formatStartDate[0]}
                                </div>
                              </td>
                              <td>
                                <div className="font-semibold">
                                  {formatStartTime[0].slice(0, 5)}
                                </div>
                              </td>
                              <td>
                                <Link to={`/details/${activity._id}`}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 transition-transform transform hover:scale-150"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                  </svg>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })
                    )}
                  </table>
                </div>
              </div>
            </div>

            <div class="mt-8 bg-white p-4 shadow rounded-lg">
              <h2 class="text-gray-500 text-lg font-semibold pb-4">
                Users Overview
              </h2>
              <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Profile Pic</th>
                      <th>Name</th>
                      <th>E-mail and role</th>
                      <th>Status</th>
                      <th>Classes booked</th>
                      <th>Information</th>
                      <th>Delete user</th>
                    </tr>
                  </thead>

                  {!users ? (
                    <p>Loading...</p>
                  ) : (
                    users.map((user) => {
                      return (
                        <UserCard key={user._id} user={user} id={user._id} />
                      );
                    })
                  )}
                </table>
              </div>
              <div class="text-right mt-4">
                <button class="btn btn-success hover:bg-cyan-600 text-white font-semibold py-1 px-4 w-1/8 mb-2">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function SingleUserInformation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState();

  useEffect(() => {
    axiosClient
      .get(`/users/${id}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const birthDate = user?.dateOfBirth;
  const setBirthDate = new Date(birthDate);

  const memberSinceDate = user?.dateOfRegistration;
  const setMemberSince = new Date(memberSinceDate);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedBirthDate = `${setBirthDate.getDate()}. ${
    months[setBirthDate.getMonth()]
  } ${setBirthDate.getFullYear()}`;
  const formattedMemberSinceDate = `${setMemberSince.getDate()}. ${
    months[setMemberSince.getMonth()]
  } ${setMemberSince.getFullYear()}`;
  return (
    <>
      {!user ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <div className="flex justify-center ">
          <button
            className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />
          </button>
          <div className="bg-white max-w-3xl shadow overflow-hidden sm:rounded-lg ">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-2xl leading-6 font-medium text-gray-900 font-titleH3">
                User profile for {user.firstName + " " + user.lastName}
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.firstName}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Last name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.lastName}
                  </dd>
                </div>
                <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.status}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.role}
                  </dd>
                </div>
                <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {formattedBirthDate}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">E-mail</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
                <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Member since
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {formattedMemberSinceDate}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.address}
                  </dd>
                </div>
                <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.phoneNumber}
                  </dd>
                </div>
                <div className="collapse bg-base-200">
                  <input type="checkbox" />
                  <div className="collapse-title grid grid-cols-2 text-xl font-medium bg-white">
                    View registered classes of the user
                  </div>
                  <div></div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <th className="text-left w-1/4">Class Name</th>
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>Link</th>
                          </tr>
                        </thead>
                        {user.classesRegistered.map((classItem, index) => {
                          const getStartDate = classItem.startTime;
                          const formatStartDate = getStartDate.split("T");
                          const formatStartTime = formatStartDate[1].split(".");
                          return (
                            <tbody key={classItem._id}>
                              <tr>
                                <td className="text-left">
                                  <div className="font-bold">
                                    {classItem.title}
                                  </div>
                                </td>
                                <td>
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
                                  <Link
                                    class="text-primary transition duration-150 ease-in-out hover:text-teal-800 hover:underline focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    to={`/details/${classItem._id}`}
                                  >
                                    View Details
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <Link
          to={`/userProfile/usersOverview/${id}/update`}
          className="btn btn-primary mt-5 mb-3 mr-4"
        >
          Update Profile
        </Link>
      </div>
    </>
  );
}

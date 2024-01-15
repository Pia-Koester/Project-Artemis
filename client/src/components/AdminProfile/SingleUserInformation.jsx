import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

export default function SingleUserInformation() {
  const { id } = useParams();

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
        <p>Loading....</p>
      ) : (
        <div className="bg-white max-w-3xl shadow overflow-hidden sm:rounded-lg mt-7 mx-auto">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
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
                <dt className="text-sm font-medium text-gray-500">Last name</dt>
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
                  {user.classesRegistered.map((classItem, index) => {
                    return (
                      <div key={index}>
                        <Link
                          to={`/details/${classItem._id}`}
                          className="text-sm font-medium text-gray-500 mt-2"
                        >
                          {classItem.title}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </dl>
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

        <Link
          to={"/userProfile/usersOverview"}
          className="btn btn-neutral mt-5 mb-3 mx-auto"
        >
          Go Back
        </Link>
      </div>
    </>
  );
}

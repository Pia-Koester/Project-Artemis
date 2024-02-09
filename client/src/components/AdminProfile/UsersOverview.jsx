import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axiosClient from "../../api/axiosClient";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function UsersOverview() {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-circle btn-neutral ml-2 mr-8 mt-20 self-start fixed"
      >
        <ArrowLeftIcon />
      </button>

      <div className="w-11/12 mx-auto">
        {!users ? (
          <div class="flex justify-center h-screen">
            <div class="relative">
              <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        ) : (
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

            {users.map((user) => {
              return <UserCard key={user._id} user={user} id={user._id} />;
            })}
          </table>
        )}
      </div>
    </>
  );
}

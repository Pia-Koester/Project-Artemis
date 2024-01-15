import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axiosClient from "../../api/axiosClient";

export default function UsersOverview() {
  const [users, setUsers] = useState(null);

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
              return <UserCard key={user._id} user={user} id={user._id} />;
            })
          )}
        </table>
      </div>
    </>
  );
}

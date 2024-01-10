import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import UserCard from "./UserCard";

export default function UsersOverview() {
  const { users } = useContext(AuthContext);

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

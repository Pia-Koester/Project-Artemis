import axios from "axios";
import { useEffect, useState } from "react";

export default function UserActivities() {
  const [userActivity, setUserActivity] = useState(null);

  useEffect(() => {
    getUser("http://localhost:8080/users/profile");
  }, []);

  const getUser = async (url) => {
    try {
      const response = await axios.get(url, { withCredentials: true });
      setUserActivity(response.data.classesRegistered);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!userActivity ? (
        <p>Loading...</p>
      ) : (
        userActivity.map((userActivity) => {
          return (
            <div key={userActivity._id} className="mb-4 lg:w-6/12 sm:w-4/5 mx-auto">
              <div className="card bg-primary text-primary-content grid grid-cols-2">
                <div className="card-body">
                  <h2 className="card-title">{userActivity.title}</h2>

                  <p>{userActivity.description}</p>
                  <p>
                    <span className="font-medium">Start time:</span>{" "}
                    {userActivity.startTime}
                  </p>
                  <p>
                    <span className="font-medium">Duration: </span>
                    {userActivity.endTime}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {userActivity.location}, 20357, Hamburg
                  </p>

                  <div className="flex justify-between items-end">
                    <div className="badge badge-secondary">
                      <a href="#">Cancel</a>
                    </div>
                  </div>
                </div>
                <div className="avatar flex-col items-end card-body">
                  <div className="w-24 mask mask-hexagon mr-4 hidden md:inline-block">
                    <img src="https://static.wixstatic.com/media/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg/v1/fill/w_378,h_520,fp_0.45_0.35,q_80,usm_0.66_1.00_0.01,enc_auto/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg" />
                  </div>
                  <p>
                    <span className="font-medium ">Instructor: </span>
                    {userActivity.instructor}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

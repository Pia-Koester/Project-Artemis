import axios from "axios";
import { useEffect, useState } from "react";
import { handleCancelation } from "../../api/cancelationAcitvity";
import { useNavigate } from "react-router-dom";

export default function UserActivities() {
  const navigate = useNavigate()

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
      <div className="card-body items-center text-center">
        <h2 className="card-title">Your booked classes</h2>
      </div>
      {!userActivity ? (
        <p>Loading...</p>
      ) : (
        userActivity.map((userActivity) => {
          const getStartDate = userActivity.startTime;
          const formatStartDate = getStartDate.split("T");
          const formatStartTime = formatStartDate[1].split(".");

          const getEndDate = userActivity.endTime;
          const formatEndDate = getEndDate.split("T");
          const FormatEndTime = formatEndDate[1].split(".");

          return (
            <div
              key={userActivity._id}
              className="mb-4 lg:w-6/12 w-11/12 mx-auto"
            >
              <div className="card bg-primary text-primary-content grid lg:grid-cols-2">
                <div className="card-body">
                  <h2 className="card-title">{userActivity.title}</h2>

                  <p>{userActivity.description}</p>
                  <p>
                    <span className="font-medium">Start time:</span>{" "}
                    {formatStartDate[0] +
                      " at " +
                      formatStartTime[0].slice(0, 5)}
                  </p>
                  <p>
                    <span className="font-medium">End time: </span>
                    {formatEndDate[0] + " at " + FormatEndTime[0].slice(0, 5)}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {userActivity.location}, 20357, Hamburg
                  </p>

                  <div className="flex justify-between items-end">
                    <div className="badge badge-secondary">
                      <button onClick={() => {handleCancelation(userActivity._id); window.location.reload()}}>Cancel</button>
                    </div>
                  </div>
                </div>
                <div className="avatar flex-col items-end card-body hidden sm:flex">
                  <div className="w-24 mask mask-hexagon mr-4">
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

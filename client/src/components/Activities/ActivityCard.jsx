import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import CapacityBadge from "./CapacityBadge";
import { useState, useContext } from "react";
import clsx from "clsx";
import { AuthContext } from "../context/AuthProvider";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";

export default function ActivityCard({ activity, role = "student", isBooked }) {
  //TODO: make transition to card Details
  const navigate = useNavigate();
  //calculating the start time based on the provided date
  const startTime = new Date(activity.startTime);
  const formattedStartTime = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", //TO DO: backend must save dates with UTC+1
  });
  const startMilliseconds = startTime.getTime();

  //calculate duration based on start and end date in milliseconds
  const endTime = new Date(activity.endTime);
  const endMilliseconds = endTime.getTime();
  const duration = (endMilliseconds - startMilliseconds) / (1000 * 60);

  //change color of card based on if the time and day have already passed
  const today = new Date();

  const [past, setPast] = useState(startTime < today);

  //open Slots for capacity badge
  const [openSlots, setOpenSlots] = useState(
    activity.capacity - activity.registeredUsers.length
  );

  //getting user info to check if class is booked or not
  const { user } = useContext(AuthContext);

  return (
    <>
      <motion.div
        whileHover={past ? {} : { scale: 1.1 }}
        className={clsx(
          "card mb-2  w-full  text-primary-content flex flex-col shadow-lg bg-gradient-to-l from-primary to-[#77cfe5] ",
          past && "opacity-40"
          // isBooked && "bg-gradient-to-r from-success to-[#3fea8c]",
          // !past && !isBooked && "bg-gradient-to-r from-primary to-[#7ddaf2] "
        )}
      >
        {/* QUESTION: Why is the text running outside the box on medium sizes?  */}
        <Link
          onClick={(e) => {
            e.preventDefault();
            if (!past) navigate(`/details/${activity._id}`);
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              {" "}
              <div className="flex mt-3 justify-center gap-5">
                <p>
                  {formattedStartTime} <span>&middot;</span> {duration} Min.{" "}
                </p>
                {role === "admin" && !past && (
                  <button>
                    <FaPencil className="text-neutral text-xl" />
                  </button>
                )}
              </div>
              <div className="border-t border-cyan-300 mt-2"></div>
            </div>
            <div className="col-span-2 row-start-2">
              {" "}
              <div className="flex justify-center">
                <h2 className="card-title text-wrap font-titleFont">
                  {activity.title}
                </h2>
              </div>
            </div>
            <div className="row-span-2 col-start-2 row-start-3">
              {" "}
              <div className="avatar self-center mt-4 ml-5">
                <div className="w-20 mask mask-hexagon ">
                  <img src={activity.instructor?.image?.url} />
                </div>
              </div>
            </div>
            <div className="row-span-2 col-start-1 row-start-3">
              <div className="flex flex-col gap-1 ml-3 mt-4">
                <div>
                  <p className="font-medium">Instructor:</p>
                  <p>{activity?.instructor?.firstName}</p>
                </div>
                <div>
                  <p className="font-medium">Attendants:</p>
                  <p>{activity?.registeredUsers?.length}</p>
                </div>
              </div>
            </div>
            <div className="row-start-5 ml-3 mb-2 mt-1">
              <img src={activity.type?.icon} className="w-10 " />
            </div>
            <div className="row-start-5 mt-1">
              <div className="flex justify-end ">
                <CapacityBadge openSlots={openSlots} isBooked={isBooked} />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}

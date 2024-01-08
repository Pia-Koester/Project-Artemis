import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CapacityBadge from "./CapacityBadge";

export default function ActivityCard({ activity }) {
  //TODO: make transition to card Details

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

  //TO DO: change color of card based on if the time and day have already passed

  //instructor images based on name
  const photos = {
    Isabella:
      "https://static.wixstatic.com/media/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg/v1/fill/w_378,h_520,fp_0.45_0.35,q_80,usm_0.66_1.00_0.01,enc_auto/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg",
    Cosima:
      "https://static.wixstatic.com/media/87046c_2a44f60d1a8a47faad745a9a3b2e4fa1~mv2.jpg/v1/fill/w_656,h_920,fp_0.48_0.34,q_85,usm_0.66_1.00_0.01,enc_auto/87046c_2a44f60d1a8a47faad745a9a3b2e4fa1~mv2.jpg",
    Rolf: "https://static.wixstatic.com/media/87046c_8b75e3d5339f4d46b34471ccee515c3f~mv2.jpg/v1/fill/w_656,h_1040,fp_0.47_0.37,q_85,usm_0.66_1.00_0.01,enc_auto/87046c_8b75e3d5339f4d46b34471ccee515c3f~mv2.jpg",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="card  w-full bg-primary text-primary-content flex flex-col"
    >
      {/* QUESTION: Why is the text running outside the box on medium sizes?  */}
      <Link to={`/details/${activity._id}`}>
        <div className="card-body overflow-hidden">
          <p>
            {formattedStartTime} <span>&middot;</span> {duration} Min.{" "}
          </p>

          <h2 className="card-title text-wrap ">{activity.title}</h2>
          <p>{activity.description}</p>
          <div className="flex justify-between items-end">
            <CapacityBadge activity={activity} />
            <div className="avatar">
              <div className="w-24 mask mask-hexagon">
                <img src={photos[activity.instructor]} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

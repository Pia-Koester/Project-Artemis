export default function ActivityCard({ activity }) {
  //TODO: make transition to card Details

  //calculating the start time based on the provided date
  const startTime = new Date(activity.startTime);
  const formattedStartTime = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const startMilliseconds = startTime.getTime();

  //calculate duration based on start and end date in milliseconds
  const endTime = new Date(activity.endTime);
  const formattedEndTime = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endMilliseconds = endTime.getTime();
  const duration = (endMilliseconds - startMilliseconds) / (1000 * 60);

  //finding out weekday
  const options = { weekday: "long" };
  const weekday = new Intl.DateTimeFormat("en-En", options).format(startTime);

  return (
    <div className="card w-max-96 bg-primary text-primary-content">
      <div className="card-body">
        <p>{weekday}</p>
        <p>
          {formattedStartTime} <span>&middot;</span> {duration} Min.{" "}
        </p>

        <h2 className="card-title">{activity.title}</h2>
        <p>{activity.description}</p>
        <div className="flex justify-between items-end">
          <div className="badge badge-secondary">{activity.capacity}</div>
          <div className="avatar">
            <div className="w-24 mask mask-hexagon">
              <img src="https://static.wixstatic.com/media/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg/v1/fill/w_378,h_520,fp_0.45_0.35,q_80,usm_0.66_1.00_0.01,enc_auto/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

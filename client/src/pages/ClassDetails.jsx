import { FaRegCalendar, FaClock, FaPersonDress } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { handleCancelation } from "../api/cancelationAcitvity";

export default function ClassDetails() {
  const { id } = useParams();
  const activity = useLoaderData();
  const navigate = useNavigate();

  // TO DO: create function which triggers put request to backend
  // body must contain: activity id and user id  - user id we get from the jwt token so sending with credentials
  const handleBooking = () => {
    axios
      .put(
        `http://localhost:8080/activities/${id}`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Data from api", response);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login")
      });
  };

  //transforming dates and times
  const startTime = new Date(activity.startTime);
  const formattedStartTime = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", //TO DO: backend must save dates with UTC+1
  });
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedStartDate = startTime.toLocaleDateString("de-DE", options);
  const startMilliseconds = startTime.getTime();

  //calculate duration based on start and end date in milliseconds
  const endTime = new Date(activity.endTime);
  const formattedEndTime = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", //TO DO: backend must save dates with UTC+1
  });
  const endMilliseconds = endTime.getTime();
  const duration = (endMilliseconds - startMilliseconds) / (1000 * 60);

  console.log(activity);
  //instructor images based on name
  const photos = {
    Isabella:
      "https://static.wixstatic.com/media/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg/v1/fill/w_378,h_520,fp_0.45_0.35,q_80,usm_0.66_1.00_0.01,enc_auto/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg",
    Cosima:
      "https://static.wixstatic.com/media/87046c_2a44f60d1a8a47faad745a9a3b2e4fa1~mv2.jpg/v1/fill/w_656,h_920,fp_0.48_0.34,q_85,usm_0.66_1.00_0.01,enc_auto/87046c_2a44f60d1a8a47faad745a9a3b2e4fa1~mv2.jpg",
    Rolf: "https://static.wixstatic.com/media/87046c_8b75e3d5339f4d46b34471ccee515c3f~mv2.jpg/v1/fill/w_656,h_1040,fp_0.47_0.37,q_85,usm_0.66_1.00_0.01,enc_auto/87046c_8b75e3d5339f4d46b34471ccee515c3f~mv2.jpg",
  };

  return (
    <div className="flex md:flex-row flex-col">
      <div className="Kurs-Informationen card bg-base-100 shadow-xl flex flex-col p-4">
        {/* To Do: block für Kursinformationen erstellen */}
        <h1>{activity.title}</h1>
        <div className="carousel carousel-center rounded-box">
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
              alt="Pizza"
            />
          </div>
        </div>
        <p>{activity.description}</p>
      </div>
      <aside className="card w-96 bg-base-100 shadow-xl flex flex-col p-4">
        <div>
          <div className="flex gap-2">
            <FaRegCalendar className="text-2xl" />
            <p className="font-bold">Date</p>
          </div>
          <p>{formattedStartDate}</p>
        </div>
        <div>
          <div className="flex gap-2">
            <FaClock className="text-2xl" />
            <p className="font-bold">Time</p>
          </div>
          <p>
            {formattedStartTime} - {formattedEndTime} ({duration} Min.)
          </p>
        </div>

        <div>
          <div className="flex gap-2">
            <FaPersonDress className="text-2xl" />
            <p className="font-bold">Capacity </p>
          </div>
          <p>capacity with color indicating fullness</p>
        </div>
        <div className="avatar self-center mt-3">
          <div className="grid grid-rows-2 mt-5">
            <p className="font-bold">Instructor:</p>
            <p>{activity.instructor}</p>
          </div>
          <div className="w-24 mask mask-hexagon">
            <img src={photos[activity.instructor]} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <button
            className="btn btn-primary mr-3 self-center mt-2"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Book Now
          </button>
          <button
            className="btn btn-neutral mr-3 self-center mt-2"
            onClick={() => navigate(`/`)}
          >
            Go Back
          </button>
        </div>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="card-body items-center text-center">
              <h3 className="font-bold text-lg">Booking Overview</h3>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <div className="flex gap-2">
                  <FaRegCalendar className="text-2xl" />
                  <p className="font-bold">Date</p>
                </div>
                <p>{formattedStartDate}</p>
              </div>

              <div>
                <div className="flex gap-2">
                  <FaClock className="text-2xl" />
                  <p className="font-bold">Time</p>
                </div>
                <p>
                  {formattedStartTime} - {formattedEndTime} ({duration} Min.)
                </p>
              </div>

              <div className="mt-5">
                <div className="flex gap-2">
                  <FaPersonDress className="text-2xl" />
                  <p className="font-bold">Capacity </p>
                </div>
                <p>capacity with color indicating fullness</p>
              </div>

              <div className="avatar mt-1">
                <span className="font-bold mt-10">Instructor</span>
                <p className="mt-10">: {activity.instructor}</p>
                <div className="w-24 mask mask-hexagon">
                  <img src={photos[activity.instructor]} />
                </div>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-primary mr-3 self-center"
                  onClick={handleBooking}
                >
                  Confirm
                </button>
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* <button
          className="btn btn-primary w-4/5 self-center mt-5"
          onClick={() => handleCancelation(id)}
        >
          Cancel
        </button> */}
      </aside>
    </div>
  );
}

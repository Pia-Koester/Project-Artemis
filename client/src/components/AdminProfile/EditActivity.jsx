import { useForm } from "react-hook-form";
import { useNavigate, useParams, useRevalidator } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Toast from "../messages/Toast";

export default function EditActivity({ activity, hideBackButton }) {
  const { id } = useParams();

  const navigate = useNavigate();

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/instructors")
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formatedDate = activity.startTime.split("T")[0];
  const startTime = new Date(activity.startTime);
  const formattedStartTime = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", //TO DO: backend must save dates with UTC+1
  });

  const endTime = new Date(activity.endTime);
  const formattedEndTime = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const onSubmit = (data) => {
    console.log(data);
    const { date, start, end, type } = data;
    const startTime = `${date}T${start}:00.000Z`;
    const endTime = `${date}T${end}:00.000Z`;

    data.startTime = startTime;
    data.endTime = endTime;

    // const index = activityTypes.findIndex(
    //   (activityType) => activityType.type === type
    // );
    // data.type = activityTypes[index]._id;

    axiosClient
      .put(`/activities/admin/${activity._id}`, data)
      .then((response) => {
        Toast("Edit Successfull");
        setTimeout(() => {
          navigate("/");
        }, 3000);
        //TO DO: toast with success message - then navigate to the start page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!hideBackButton && (
        <button
          onClick={() => navigate("/userProfile/details")}
          className="w-full btn btn-neutral px-4 py-2  hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
        >
          <ArrowLeftIcon />
        </button>
      )}

      {/* <div className="flex flex-col items-center justify-center col-start-3 row-start-1 row-span-2 self-start h-full"> */}
      <div className="card bg-white shadow-xl flex flex-col p-4   self-start row-start-1 row-span-3  col-start-3 h-full">
        <h2 className="flex justify-center text-2xl leading-6 font-medium text-gray-900 font-titleH3 mb-1">
          Update Activity
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-5">
            <div className="mb-4 col-span-2">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Title
              </label>
              <input
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                {...register("title", {
                  required: "Title is required",
                })}
                placeholder="Title"
                defaultValue={activity.title}
              />
              {errors.title?.type === "required" && (
                <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="mb-4 col-span-2">
              <label
                htmlFor="Description"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                className="textarea w-full px-4 py-2 textarea-border rounded-lg text-gray-700 focus:ring-blue-500 h-36"
                {...register("description", {
                  required: "Description is required",
                })}
                defaultValue={activity.description}
                placeholder="Description"
              ></textarea>
              {errors.description?.type === "required" && (
                <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="instructor"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Instructor
              </label>
              <select
                className="select select-secondary w-full max-w-xs"
                {...register("instructor", {
                  required: "Instructor is required",
                })}
              >
                <option disabled selected value={activity.instructor._id}>
                  {activity.instructor.firstName}
                </option>
                {instructors.map((instructor) => {
                  return (
                    <option key={instructor.firstName} value={instructor._id}>
                      {instructor.firstName}
                    </option>
                  );
                })}
              </select>

              {errors.instructor?.type === "required" && (
                <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.instructor.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="capacity"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Maximum Capacity
              </label>
              <input
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                {...register("capacity", {
                  required: "Capacity is required",
                })}
                defaultValue={activity.capacity}
                placeholder="Capacity"
              />
              {errors.capacity?.type === "required" && (
                <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.capacity.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Date
              </label>
              <input
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                {...register("date", {
                  required: "Date is required",
                })}
                type="date"
                defaultValue={formatedDate}
              />
              {errors.date?.type === "required" && (
                <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.date.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="start"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Start Time
              </label>
              <input
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                {...register("start", {
                  required: "Time is required",
                })}
                type="time"
                defaultValue={formattedStartTime}
              />
              {errors.startTime?.type === "required" && (
                <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.startTime.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="end"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                End Time
              </label>
              <input
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                {...register("end", {
                  required: "Time is required",
                })}
                type="time"
                defaultValue={formattedEndTime}
              />
              {errors.startTime?.type === "required" && (
                <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.startTime.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className=" btn btn-primary  w-full   px-4 py-2  hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 mb-2"
          >
            Update
          </button>
        </form>
      </div>
      {/* </div> */}
    </>
  );
}

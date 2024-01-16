import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { FaArrowLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function CreateActivity() {
  const { data: activityTypes } = useLoaderData();
  console.log(activityTypes);
  const navigate = useNavigate();
  console.log(activityTypes);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //getting the instructors to map over them
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/instructors")
      .then((response) => {
        console.log(response.data);
        setInstructors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(instructors);

  const onSubmit = (data) => {
    console.log(data);
    const { date, start, end, type } = data;
    const startTime = `${date}T${start}:00.000Z`;
    const endTime = `${date}T${end}:00.000Z`;

    data.startTime = startTime;
    data.endTime = endTime;

    const index = activityTypes.findIndex(
      (activityType) => activityType.type === type
    );
    data.type = activityTypes[index]._id;
    console.log(index);
    console.log(data);

    axiosClient
      .post("/activities", data)
      .then((response) => {
        notify();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const notify = () =>
    toast.success(
      "--Creation Successful-- Redirecting to the admin dashboard",
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

  //TO DO: show example of activity details while creating the activity? - Preview mode

  return (
    <div className="flex justify-center items-start">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <button
        onClick={() => navigate(-1)}
        className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
      >
        <FaArrowLeft />
      </button>
      <div className="flex flex-col items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
          <div className="flex justify-center mb-6"></div>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create a new Activity
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
                  <option disabled selected>
                    Instructor
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
                />
                {errors.startTime?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.startTime.message}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="endTime"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Activity Type
                </label>
                <select
                  className="select select-bordered"
                  {...register("type", {
                    required: "Type is required",
                  })}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  {activityTypes.map((item) => {
                    return <option>{item.type}</option>;
                  })}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary text-white px-4 py-2  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

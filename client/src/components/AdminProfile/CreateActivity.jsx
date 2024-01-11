import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export default function CreateActivity() {
  const activityTypes = useLoaderData();
  console.log(activityTypes);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

    axios
      .post("http://localhost:8080/activities", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-100 w-96 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-center mb-6"></div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Create a new Activity
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-x-5">
                <div className="mb-4">
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

                <div className="mb-4">
                  <label
                    htmlFor="Description"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    className="textarea w-full px-4 py-2 textarea-border rounded-lg text-gray-700 focus:ring-blue-500"
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
                  <input
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    {...register("instructor", {
                      required: "Instructor is required",
                    })}
                    placeholder="Instructor"
                  />
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
                className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2"
              >
                Update
              </button>
              <button
                onClick={() => navigate("/userProfile/details")}
                className="w-full bg-neutral text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Go back
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

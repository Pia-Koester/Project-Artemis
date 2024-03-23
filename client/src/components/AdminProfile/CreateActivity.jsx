import { Controller, useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//TO DO: install react-datepicker to have a better picker with date and time

export default function CreateActivity() {
  const { data: activityTypes } = useLoaderData();
  const [formloading, setFormlaoding] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  //getting the instructors to map over them
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

  const onSubmit = (data) => {
    // setFormlaoding(true);

    // const { date, start, end, type } = data;
    // const startTime = `${date}T${start}:00.000Z`;
    // const endTime = `${date}T${end}:00.000Z`;

    // data.startTime = startTime;
    // data.endTime = endTime;+
    console.log(data);

    // const index = activityTypes.findIndex(
    //   (activityType) => activityType.type === type
    // );
    // data.type = activityTypes[index]._id;

    // axiosClient
    //   .post("/activities", data)
    //   .then((response) => {
    //     setFormlaoding(false);
    //     Toast("Creation Successful");
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 3000);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     notifyFailed();
    //   });
  };

  const notifyFailed = () =>
    toast.error("--Creation Failed--", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  //TO DO: show example of activity details while creating the activity? - Preview mode

  return (
    <div className="flex justify-center items-start mb-4">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
      >
        <ArrowLeftIcon />
      </button>
      <div className="flex flex-col items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
          <h2 className="flex justify-center text-2xl leading-6 font-medium text-gray-900 font-titleH3 mb-3">
            Lege einen neuen Kurs an
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-x-5">
              <div className="mb-4 col-span-2">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Name / Überschrift
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
                  Beschreibung
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
                  Trainer:in
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("instructor", {
                    required: "Instructor is required",
                  })}
                >
                  <option disabled selected>
                    Trainer:in wählen
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
                  max. Teilnehmer:innen
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
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
                  htmlFor="startTime"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Startdatum und Zeit
                </label>
                <Controller
                  control={control}
                  name="startTime"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      showTimeSelect
                      dateFormat="dd-MM-yyyy HH:mm"
                      timeFormat="HH:mm"
                      className="input input-bordered w-full max-w-xs"
                    />
                  )}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endTime"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Enddatum und Zeit
                </label>
                <Controller
                  control={control}
                  name="endTime"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      showTimeSelect
                      dateFormat="dd-MM-yyyy HH:mm"
                      timeFormat="HH:mm"
                      className="input input-bordered w-full max-w-xs"
                    />
                  )}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Kursart
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("type", {
                    required: "Type is required",
                  })}
                >
                  <option disabled selected>
                    wähle aus
                  </option>
                  {activityTypes.map((item) => {
                    return <option>{item.type}</option>;
                  })}
                </select>
              </div>
            </div>

            {formloading ? (
              <button className=" w-full btn btn-primary text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            ) : (
              <button
                type="submit"
                className="w-full btn btn-primary text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2"
              >
                Speichern
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

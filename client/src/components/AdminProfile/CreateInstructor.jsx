import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosClient from "../../api/axiosClient";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Toast from "../messages/Toast";

export default function CreateInstructor() {
  const navigate = useNavigate();
  const [formloading, setFormlaoding] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [multipleImages, setMultipleImages] = useState([]);
  const changeMultipleFiles = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setMultipleImages((prevImages) => prevImages.concat(imageArray));
    }
  };

  const render = (data) => {
    return data.map((image) => {
      return <img className="image" src={image} alt="" key={image} />;
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    setFormlaoding(true);
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("image", data.image[0]);

    axiosClient
      .post("/instructors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setFormlaoding(false);
        setMultipleImages([]);
        Toast("Creation Successfull");
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        notifyFail();
      });
  };

  const notifyFail = () =>
    toast.error("Error during Submission", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div className="flex justify-center">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
      >
        <ArrowLeftIcon />
      </button>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-100 w-96 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="flex justify-center text-2xl leading-6 font-medium text-gray-900 font-titleH3 mb-3">
              Create New Instructor
            </h2>

            <form className="uploadform" onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  First Name
                </label>
                <input
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: "You must provide a name",
                  })}
                />
                {errors.firstName?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Last Name
                </label>
                <input
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: "You must provide a name",
                  })}
                />
                {errors.lastName?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Upload image
                </label>
                <input
                  className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                  placeholder="Product Image"
                  {...register("image", { required: true })}
                  type="file"
                  name="image"
                  onChange={changeMultipleFiles}
                />
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
                  Submit
                </button>
              )}
            </form>
            {render(multipleImages)}
          </div>
        </div>
      </div>
    </div>
  );
}

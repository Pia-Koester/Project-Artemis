import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import axiosClient from "../../api/axiosClient";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthProvider";
import { FaArrowLeft } from "react-icons/fa6";

export default function UploadAvatar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);
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
    setFormlaoding(true);
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);

    axiosClient
      .put(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setFormlaoding(false);
        setMultipleImages([]);
        notify();
        setTimeout(() => {
          navigate("/userProfile/details");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        notifyFail();
      });
  };

  //TO DO: set image in user - send back user profile entirely

  const notify = () =>
    toast.success("--Upload Successfully-- ", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyFail = () =>
    toast.error("--Error during Upload-- ", {
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
    <div className="flex flex-col items-center justify-center">
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
      <div className="flex justify-center">
        <button
          className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>
        <div className="bg-gray-100 w-96 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-center mb-6"></div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Upload your Avatar Image{" "}
            </h2>

            <form className="uploadform" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="avatar"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Upload image
                </label>
                <input
                  className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                  placeholder="Product Image"
                  {...register("avatar", { required: true })}
                  type="file"
                  name="avatar"
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

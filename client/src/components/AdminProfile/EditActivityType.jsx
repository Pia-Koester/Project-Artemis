import { useForm } from "react-hook-form";
import axiosClient from "../../api/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Toast from "../messages/Toast";

export default function EditActivityType({ activitytype }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //for capitalization
  const typetitle =
    activitytype?.type?.charAt(0).toUpperCase() + activitytype?.type?.slice(1);

  const onSubmit = (data) => {
    axiosClient
      .patch(`activityTypes/${activitytype._id}/update`, data)
      .then((response) => {
        Toast("Edit Successfull");
        setTimeout(() => {
          navigate(-1);
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-100 w-96 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-center mb-6"></div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Edit Activity Type
            </h2>

            <form className="uploadform" onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Type Name
                </label>
                <input
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Activity Type"
                  {...register("type", {
                    required: "You must provide a name",
                  })}
                  defaultValue={typetitle}
                />
                {errors.type?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.type.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary text-white px-4 py-2  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

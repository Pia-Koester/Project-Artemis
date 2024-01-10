import { useForm } from "react-hook-form";
import axios from "axios";

export default function CreateActivityType() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("images", data.images);

    console.log(data.images);

    axios
      .post("http://localhost:8080/activityTypes", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-gray-100 w-96 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex justify-center mb-6"></div>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create a new Activity Type
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
              />
              {errors.type?.type === "required" && (
                <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.type.message}
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
                {...register("images", { required: true })}
                type="file"
                multiple
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

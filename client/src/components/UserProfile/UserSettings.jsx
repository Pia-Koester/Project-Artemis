import { useForm } from "react-hook-form";
import axios from "axios";

export default function UserSettings() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Data from form", data);
    axios
      .put("http://localhost:8080/users/profile", data, { withCredentials: true })
      .then((response) => {
        console.log("Data from api", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" signup form-control w-full max-w-xs  flex flex-col items-center justify-center"
      >
        <label>
          <div className="label self-start">
            <span className="label-text">What is your Name?</span>
          </div>
          <input
            placeholder="First Name"
            className="input input-bordered w-full max-w-xs input-primary "
            {...register("firstName", { required: true })}
          />
          <div className="label self-start">
            <span className="label-text">What is your Last-Name?</span>
          </div>
          <input
            placeholder="Last Name"
            className="input input-bordered w-full max-w-xs input-primary "
            {...register("lastName", { required: true })}
          />
          <div className="label self-start">
            <span className="label-text">What is your Phone Number?</span>
          </div>
          <input
            placeholder="Phonenumber"
            className="input input-bordered w-full max-w-xs input-primary "
            {...register("phone", { required: true })}
          />
          <div className="label self-start">
            <span className="label-text">What is your address?</span>
          </div>
          <input
            placeholder="Address"
            className="input input-bordered w-full max-w-xs input-primary "
            {...register("address", { required: true })}
          />
          <div className="label self-start">
            <span className="label-text">When were you born?</span>
          </div>
          <input
            placeholder="Date of Birth"
            className="input input-bordered w-full max-w-xs input-primary "
            type="date"
            {...register("dateOfBirth", { required: true })}
          />

          {errors.exampleRequired && <span>This field is required</span>}

        </label>
        <button className="btn btn-primary mx-auto mt-2">Update</button>

      </form>
    </div>
  );
}

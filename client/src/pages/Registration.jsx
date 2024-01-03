import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Registration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Data from form", data);
    axios
      .post("http://localhost:8080/signup", data)
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
          <div className="label self-start">
            <span className="label-text">What is your E-Mail?</span>
          </div>
          <input
            placeholder="E-Mail"
            className="input input-bordered w-full max-w-xs input-primary "
            {...register("email", { required: true })}
          />
          <div className="label self-start">
            <span className="label-text">Set a password</span>
          </div>
          <input
            placeholder="Password"
            className="input input-bordered w-full max-w-xs input-primary "
            {...register("password", { required: true, minLength: 8 })}
          />
          {/* TO DO: Password strength indicator */}
          <div className="label cursor-pointer">
            <span className="label-text">AGB Aproval</span>
            <input
              type="checkbox"
              className="toggle toggle-secondary"
              {...register("termsOfUse", { required: true })}
            />
          </div>
          <div className="label cursor-pointer">
            <span className="label-text">Dataprotection read</span>
            <input
              type="checkbox"
              className="toggle toggle-secondary"
              {...register("dataProtectionInfo", { required: true })}
            />
          </div>

          {errors.exampleRequired && <span>This field is required</span>}

          <button className="btn btn-primary">Submit</button>
        </label>
      </form>
      <p className="p-2">
        Already registered?{" "}
        <Link to="/login" className="text-accent">
          Login
        </Link>
      </p>
    </div>
  );
}

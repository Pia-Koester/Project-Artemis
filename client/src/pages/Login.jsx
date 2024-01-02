import { FaWandMagicSparkles } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8080/login", data, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="form-control w-full max-w-xs  flex flex-col items-center justify-center">
          <div className="label self-start">
            <span className="label-text">What is your E-Mail?</span>
          </div>
          <input
            type="text"
            placeholder="Type E-Mail here"
            className="input input-bordered w-full max-w-xs input-primary "
            {...register("email", { required: true })}
          />
          <div className="label self-start">
            <span className="label-text">What is your password?</span>
          </div>
          <input
            type="password"
            placeholder="Type Password here"
            className="input input-bordered w-full max-w-xs input-primary "
            {...register("password", { required: true })}
          />
          <button className="btn btn-primary mt-5">Submit</button>
        </label>
        {/* TO DO: in case we create the option to login via mail
      <div className="divider">OR</div>
      <button className="btn btn-secondary mt-5">
        <FaWandMagicSparkles />
        get magic link
      </button> */}
      </form>
      <p className="p-2">
        You don't have an account yet?{" "}
        <Link to="/signup" className="text-accent">
          Sign up
        </Link>
      </p>
    </div>
  );
}

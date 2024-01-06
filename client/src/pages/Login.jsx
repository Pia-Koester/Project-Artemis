import { FaWandMagicSparkles, FaRegEye } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

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
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        badCredentials();
      });
  };

  const badCredentials = () => {
    document.getElementById("my_modal_1").showModal();
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
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type E-Mail here"
              className="input input-bordered w-full max-w-xs input-primary "
              {...register("email", { required: true })}
            />{" "}
            {/* <FaRegEye /> */}
          </div>
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

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div role="alert">
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Error
            </div>
            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>Invalid username and/or password</p><br />
              <p>Please try again</p>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

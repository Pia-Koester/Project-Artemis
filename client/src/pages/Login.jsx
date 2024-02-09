import { EyeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  const handleShowPassword = () => {
    setShowPassword(true);
  };
  const handleHidePassword = () => {
    setShowPassword(false);
  };
  return (
    <AnimatePresence>
      <div>
        <div className="flex justify-center items-center">
          <div className="p-4 w-1/3 self-start">
            <motion.img
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
              }}
              exit={{ x: -300, opacity: 0 }}
              src="https://res.cloudinary.com/ddj2xpjki/image/upload/v1704633572/Zeus/isabella.small_gu1hs7.webp"
              className="hidden sm:inline-block object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-4/12 p-4 h-100 ">
            {" "}
            <h1 className="text-4xl mb-6 font-titleFont font-bold">Login</h1>
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="form-control w-full max-w-xs  flex flex-col items-center justify-center">
                <div className="label self-start">
                  <span className="label-text">What is your E-Mail?</span>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    placeholder="Type E-Mail here"
                    className="input mr-7 input-bordered max-w-xs input-primary "
                    {...register("email", { required: "E-mail is required" })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="label w-full self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="label self-start">
                  <span className="label-text">What is your password?</span>
                </div>
                <div className="flex items-center relative mr-7">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Type Password here"
                    className="input input-bordered w-full max-w-xs input-primary "
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <div
                    onMouseDown={handleShowPassword}
                    onMouseUp={handleHidePassword}
                    className="absolute right-3"
                  >
                    <EyeIcon className="ml-2 w-5 h-5 hover:cursor-pointer transition-transform transform hover:scale-150" />
                  </div>
                </div>
                {errors.password?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.password.message}
                  </span>
                )}
                <button className="btn btn-primary mt-5">Submit</button>
              </label>
              {/* TO DO: in case we create the option to login via mail
      <div className="divider">OR</div>
      <button className="btn btn-secondary mt-5">
        <FaWandMagicSparkles />
        get magic link
      </button> */}
            </form>{" "}
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <div role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>Invalid username and/or password!</p>
                    <br />
                    <p>Please try again</p>
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>{" "}
              </div>{" "}
            </dialog>{" "}
          </div>
        </div>
        <p className="p-2 text-center">
          You don't have an account yet?{" "}
          <Link to="/signup" className="text-accent">
            Sign up
          </Link>
        </p>
      </div>
    </AnimatePresence>
  );
}

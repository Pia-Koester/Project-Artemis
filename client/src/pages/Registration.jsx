import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

export default function Registration() {
  const [step, setStep] = useState(1);
  const [loginInfo, setLoginInfo] = useState();
  const [personalInfo, setPersonalInfo] = useState();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //TO DO: create 3 forms with each a submit function and the own validation

  const registrationSubmit = (data) => {
    console.log(data, step);
    setLoginInfo(data);
    setStep((prev) => {
      return prev + 1;
    });
  };

  const personalSubmit = (data) => {
    console.log(data, step);
    setPersonalInfo(data);
    setStep((prev) => {
      return prev + 1;
    });
  };

  const formSubmit = (data) => {
    console.log(loginInfo, personalInfo);
    console.log("Data from form", data);
    axiosClient
      .post("signup", data)
      .then((response) => {
        // console.log("Data from api", response.data);
        notify();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notify = () =>
    toast.success(
      "--Registration Successful-- Redirecting to the login screen",
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

  const handleBacksteps = () => {
    setStep((prev) => {
      return prev - 1;
    });
  };

  const nextClasses = {
    3: "hidden",
    4: "hidden",
  };

  const backClasses = {
    1: "hidden",
  };

  const submitClasses = { 1: "hidden", 2: "hidden" };

  return (
    <AnimatePresence>
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

      <div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center justify-center w-4/12 p-4 h-100 ">
            <h1 className="text-4xl font-bold mb-4 text-center">Sign Up</h1>
            <ul className="steps steps-vertical lg:steps-horizontal my-5">
              <li
                className={clsx(
                  "step px-10",
                  (step === 1 || step === 2 || step === 3) && "step-primary"
                )}
              >
                Login
              </li>
              <li
                className={clsx(
                  "step",
                  (step === 2 || step === 3) && "step-primary"
                )}
              >
                Contact
              </li>
              <li className={clsx("step", step === 3 && "step-primary")}>
                Final
              </li>
            </ul>
            {step === 1 ? (
              <form
                onSubmit={handleSubmit(registrationSubmit)}
                className=" signup form-control w-full max-w-xs  flex flex-col items-center justify-center"
              >
                <div className="login-info ">
                  <div className="label self-start">
                    <span className="label-text">What is your E-Mail?</span>
                  </div>
                  <input
                    placeholder="E-Mail"
                    className="input input-bordered w-full max-w-xs input-primary "
                    {...register("email", {
                      required: "E-mail is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
                        message: "You need a valid email address",
                      },
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="label w-full self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.email.message}
                    </p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className="label w-full self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.email.message}
                    </p>
                  )}

                  <div className="label self-start">
                    <span className="label-text">Set a password</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs input-primary "
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.password.message}
                    </span>
                  )}
                  {/* TO DO: Password strength indicator */}
                </div>
                <button
                  // TO DO: disable button if there are any errors
                  className={clsx(
                    "btn btn-primary self-center mt-2",
                    nextClasses[step]
                  )}
                >
                  Next
                </button>
              </form>
            ) : step === 2 ? (
              <form
                onSubmit={handleSubmit(personalSubmit)}
                className=" signup form-control w-full max-w-xs  flex flex-col items-center justify-center"
              >
                <label>
                  {/* ATTENTION: this label is here so that the data from the first input is not being used from the first form or send to the third. Unclear why we need it */}
                  <div className="personal-details">
                    <div className="label self-start">
                      <span className="label-text">What is your Name?</span>
                    </div>
                    <input
                      placeholder="First Name"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("firstName", {
                        required: "Enter your First Name",
                      })}
                    />
                    {errors.firstName?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.firstName.message}
                      </span>
                    )}
                    <div className="label self-start">
                      <span className="label-text">
                        What is your Last-Name?
                      </span>
                    </div>
                    <input
                      placeholder="Last Name"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("lastName", {
                        required: "Enter your last Name",
                      })}
                    />{" "}
                    {errors.lastName?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.lastName.message}
                      </span>
                    )}
                    <div className="label self-start">
                      <span className="label-text">
                        What is your Phone Number?
                      </span>
                    </div>
                    <input
                      placeholder="Phonenumber"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("phoneNumber", {
                        required: "You must enter your phone Number",
                      })}
                    />{" "}
                    {errors.phoneNumber?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                    <div className="label self-start">
                      <span className="label-text">What is your address?</span>
                    </div>
                    <input
                      placeholder="Address"
                      className="input input-bordered w-full max-w-xs input-primary "
                      {...register("address", {
                        required: "Please enter your address",
                      })}
                    />{" "}
                    {errors.address?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.address.message}
                      </span>
                    )}
                  </div>{" "}
                  <div className="flex justify-around mt-2">
                    <button
                      className={clsx("btn btn-neutral", backClasses[step])}
                      onClick={handleBacksteps}
                    >
                      Back
                    </button>
                    <button
                      className={clsx(
                        "btn btn-primary self-center",
                        nextClasses[step]
                      )}
                    >
                      Next
                    </button>
                  </div>
                </label>
              </form>
            ) : (
              <form onSubmit={handleSubmit(formSubmit)}>
                {" "}
                <div className="label self-start">
                  <span className="label-text">When were you born?</span>
                </div>
                <input
                  placeholder="Date of Birth"
                  className="input input-bordered w-full max-w-xs input-primary "
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Enter your date of birth",
                  })}
                />
                {errors.dateOfBirth?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.dateOfBirth.message}
                  </span>
                )}
                <div className="label cursor-pointer">
                  <span className="label-text">AGB Aproval</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-secondary"
                    {...register("termsOfUse", {
                      required: "You must agree to the AGB",
                    })}
                  />
                </div>
                {errors.termsOfUse?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.termsOfUse.message}
                  </span>
                )}
                <div className="label cursor-pointer">
                  <span className="label-text">Dataprotection read</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-secondary"
                    {...register("dataProtectionInfo", {
                      required: "You must agree to the DSGVO",
                    })}
                  />
                </div>
                {errors.dataProtectionInfo?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.dataProtectionInfo.message}
                  </span>
                )}
                <div className="flex justify-around mt-2">
                  <button
                    className={clsx("btn btn-neutral", backClasses[step])}
                    onClick={handleBacksteps}
                  >
                    Back
                  </button>

                  <button
                    className={clsx(
                      "btn btn-primary self-center",
                      submitClasses[step]
                    )}
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="p-4 w-1/3 self-start">
            <motion.img
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
              }}
              exit={{ x: 300, opacity: 0 }}
              src="https://res.cloudinary.com/ddj2xpjki/image/upload/v1704633572/Zeus/isabella.small_gu1hs7.webp"
              className="hidden sm:inline-block object-cover"
            />
          </div>
        </div>

        <p className="p-2 text-center">
          Already registered?{" "}
          <Link to="/login" className="text-accent ">
            Login
          </Link>
        </p>
      </div>
    </AnimatePresence>
  );
}

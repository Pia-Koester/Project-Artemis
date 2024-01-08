import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useState } from "react";
import clsx from "clsx";

export default function Registration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Data from form", data);
    axiosClient
      .post("signup", data)
      .then((response) => {
        console.log("Data from api", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //TO DO: create 3 forms with each a submit function and the own validation
  const [loginInfo, setLoginInfo] = useState();
  const [personalInfo, setPersonalInfo] = useState();

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
        console.log("Data from api", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //TO DO: split registration into first only asking for mail and password and then onboarding on different screen
  const [step, setStep] = useState(1);
  const handleFormSteps = () => {
    setStep((prev) => {
      return Math.min(prev + 1, 3);
    });
  };

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
    <div>
      <h1 className="text-5xl font-bold mb-4 text-center">Sign Up</h1>
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center w-4/12 p-4  ">
          <ul className="steps steps-vertical lg:steps-horizontal">
            <li
              className={clsx(
                "step",
                (step === 1 || step === 2 || step === 3) && "step-primary"
              )}
            >
              Login Information
            </li>
            <li
              className={clsx(
                "step",
                (step === 2 || step === 3) && "step-primary"
              )}
            >
              Personal Details
            </li>
            <li className={clsx("step", step === 3 && "step-primary")}>
              Emergency Contact
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
                  "btn btn-primary self-center",
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
                  <span className="label-text">What is your Last-Name?</span>
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
                  <span className="label-text">What is your Phone Number?</span>
                </div>
                <input
                  placeholder="Phonenumber"
                  className="input input-bordered w-full max-w-xs input-primary "
                  {...register("phone", {
                    required: "You must enter your phone Number",
                  })}
                />{" "}
                {errors.phone?.type === "required" && (
                  <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {errors.phone.message}
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
            </form>
          ) : (
            <form onSubmit={handleSubmit(formSubmit)}>
              {" "}
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
        <img
          src="https://res.cloudinary.com/ddj2xpjki/image/upload/v1704633572/Zeus/isabella.small_gu1hs7.webp"
          className="p-4 w-4/12 hidden sm:inline-block"
        />
      </div>
      <p className="p-2 text-center">
        Already registered?{" "}
        <Link to="/login" className="text-accent ">
          Login
        </Link>
      </p>
    </div>
  );
}

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

  //TO DO: split registration into first only asking for mail and password and then onboarding on different screen
  const [step, setStep] = useState(1);
  const handleFormSteps = () => {
    setStep((prev) => {
      return prev + 1;
    });
  };

  const nextClasses = {
    3: "hidden",
    4: "hidden",
  };

  const submitClasses = { 1: "hidden", 2: "hidden" };

  return (
    <div>
      <h1 className="text-5xl font-bold mb-4 text-center">Sign Up</h1>
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center w-4/12 p-4  ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" signup form-control w-full max-w-xs  flex flex-col items-center justify-center"
          >
            <ul className="steps steps-vertical lg:steps-horizontal">
              <li className="step step-primary">Login Information</li>
              <li className="step step-primary">Personal Details</li>
              <li className="step">Emergency Contact</li>
            </ul>
            <label>
              {step === 1 ? (
                <div className="login-info ">
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
                </div>
              ) : step === 2 ? (
                <div className="personal-details">
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
                    <span className="label-text">
                      What is your Phone Number?
                    </span>
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
                </div>
              ) : (
                "empty"
              )}

              {errors.exampleRequired && <span>This field is required</span>}
              <button
                className={clsx(
                  "btn btn-primary self-center",
                  nextClasses[step]
                )}
                onClick={handleFormSteps}
              >
                Next
              </button>
              <button
                className={clsx(
                  "btn btn-primary self-center",
                  submitClasses[step]
                )}
              >
                Submit
              </button>
            </label>
          </form>
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

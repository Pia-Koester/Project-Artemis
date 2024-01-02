import { FaWandMagicSparkles } from "react-icons/fa6";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <label className="form-control w-full max-w-xs  flex flex-col items-center justify-center">
        <div className="label self-start">
          <span className="label-text">What is your E-Mail?</span>
        </div>
        <input
          type="text"
          placeholder="Type E-Mail here"
          className="input input-bordered w-full max-w-xs input-primary "
        />
        <div className="label self-start">
          <span className="label-text">What is your password?</span>
        </div>
        <input
          type="password"
          placeholder="Type Password here"
          className="input input-bordered w-full max-w-xs input-primary "
        />
        <button className="btn btn-primary mt-5">Submit</button>
      </label>

      {/* 
      TO DO: in case we create the option to login via mail
      <div className="divider">OR</div>
      <button className="btn btn-secondary mt-5">
        <FaWandMagicSparkles />
        get magic link
      </button> */}
    </div>
  );
}

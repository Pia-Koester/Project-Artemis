import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserUpdateInformation() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser("http://localhost:8080/users/profile");
  }, []);

  const getUser = async (url) => {
    try {
      const response = await axios.get(url, { withCredentials: true });
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Data from form", data);
    axios
      .put("http://localhost:8080/users/profile", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Data from api", response.data);
        navigate("/userProfile/details")
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formattedDate = user?.dateOfBirth.split('T')[0];

  return (
    <>
    {!user ? <p>Loading...</p> :
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
              defaultValue={user.firstName}
              className="input input-bordered w-full max-w-xs input-primary "
              {...register("firstName", { required: true })}
            />
            <div className="label self-start">

              <span className="label-text">What is your Last-Name?</span>
            </div>
            <input
              placeholder="Last Name"
            defaultValue={user.lastName}
              className="input input-bordered w-full max-w-xs input-primary "
              {...register("lastName", { required: true })}
            />
            <div className="label self-start">
              <span className="label-text">What is your Phone Number?</span>
            </div>
            <input
              placeholder="Phonenumber"
            defaultValue={user.phone}

              className="input input-bordered w-full max-w-xs input-primary "
              {...register("phone", { required: true })}
            />
            <div className="label self-start">
              <span className="label-text">What is your address?</span>
            </div>
            <input
              placeholder="Address"
            defaultValue={user.address}

              className="input input-bordered w-full max-w-xs input-primary "
              {...register("address", { required: true })}
            />
            <div className="label self-start">
              <span className="label-text">When were you born?</span>
            </div>
            <input
              placeholder="Date of Birth"
            defaultValue={formattedDate}
              className="input input-bordered w-full max-w-xs input-primary "
              type="date"
              {...register("dateOfBirth", { required: true })}
            />

            {errors.exampleRequired && <span>This field is required</span>}
          </label>
          <div>
            <button className="btn btn-primary mx-auto mt-2 mr-2">
              Confirm
            </button>
            <Link to={"/userProfile/details"} className="btn btn-neutral mx-auto mt-2">Go back</Link>
          </div>
        </form>
      </div>
    }
    </>
  );
}

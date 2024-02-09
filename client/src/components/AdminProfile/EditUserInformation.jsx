import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import userIcon from "../../assets/logos/avatar.jpg";
import axiosClient from "../../api/axiosClient";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function EditUserInformation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState();

  useEffect(() => {
    axiosClient
      .get(`/users/${id}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosClient
      .put(`/users/${id}/update`, data)
      .then((response) => {
        console.log(response.data);
        navigate(`/userProfile/usersOverview/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatedDate = user?.dateOfBirth.split("T")[0];

  return (
    <div className="flex justify-center mb-4">
      <button
        className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
        onClick={() => navigate(`/userProfile/usersOverview`)}
      >
        <ArrowLeftIcon />
      </button>
      {!user ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-100 w-96 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
              <div className="flex justify-center mb-6">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src={userIcon} />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4">
                {user.firstName + " " + user.lastName}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Enter details to update the user profile
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-x-5">
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      First name:
                    </label>
                    <input
                      className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      defaultValue={user.firstName}
                      placeholder="First Name"
                    />
                    {errors.firstName?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="lastName"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Last name:
                    </label>
                    <input
                      className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      defaultValue={user.lastName}
                      placeholder="Last Name"
                    />
                    {errors.lastName?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Phone number:
                    </label>
                    <input
                      className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                      })}
                      defaultValue={user.phoneNumber}
                      placeholder="Phone number"
                    />
                    {errors.phoneNumber?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Address:
                    </label>
                    <input
                      className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      defaultValue={user.address}
                      placeholder="Address"
                    />
                    {errors.address?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="fullName"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Date of birth
                    </label>
                    <input
                      type="date"
                      className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                      {...register("dateOfBirth", {
                        required: "First name is required",
                      })}
                      defaultValue={formatedDate}
                      placeholder="Date of birth"
                    />
                    {errors.dateOfBirth?.type === "required" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.dateOfBirth.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="role"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("role", {
                        minLength: {
                          value: 2,
                          message: "Select a valid role",
                        },
                      })}
                    >
                      <option value="A">Chose a role</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                    {errors.role?.type === "minLength" && (
                      <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.role.message}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn btn-primary text-white px-4 py-2  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

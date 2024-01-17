import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosClient from "../../api/axiosClient";
import { FaArrowLeft } from "react-icons/fa6";

export default function EditMembershipInformation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleMembershipPlan, setSingleMembershipPlan] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`plan/${id}`)
      .then((response) => {
        setSingleMembershipPlan(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
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
      .put(`/plan/update/${id}`, data)
      .then((response) => {
        console.log(response.data);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {!singleMembershipPlan ? (
        <span className="loading loading-dots loading-lg text-center"></span>
      ) : (
        <div className="flex justify-center mb-24">
          <button
            className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-100 w-96 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">
                  {singleMembershipPlan.title}
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Update the following information of the memebrship plan
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                      >
                        Membership title:
                      </label>
                      <input
                        defaultValue={singleMembershipPlan.title}
                        className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        {...register("title", {
                          required: "Title is required",
                        })}
                        placeholder="Title"
                      />
                      {errors.title?.type === "required" && (
                        <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                          {errors.title.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="price"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                      >
                        Price {`(in €)`}:
                      </label>
                      <input
                        defaultValue={singleMembershipPlan.price}
                        className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        {...register("price", {
                          required: "Price is required",
                        })}
                        placeholder="Price"
                      />
                      {errors.price?.type === "required" && (
                        <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                          {errors.price.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="totalCredits"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                      >
                        Maximum credits:
                      </label>
                      <input
                        className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        defaultValue={singleMembershipPlan.totalCredits}
                        {...register("totalCredits", {
                          required: "Maximum credits are required",
                        })}
                        placeholder="Max Credits"
                      />
                      {errors.totalCredits?.type === "required" && (
                        <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                          {errors.totalCredits.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="validity"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                      >
                        Validity {`(in days)`}:
                      </label>
                      <input
                        className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        defaultValue={singleMembershipPlan.validity}
                        {...register("validity", {
                          required: "Validity is required",
                        })}
                        placeholder="Validity"
                      />
                      {errors.validity?.type === "required" && (
                        <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                          {errors.validity.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn btn-primary text-white px-4 py-2  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2"
                  >
                    Update Membership
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

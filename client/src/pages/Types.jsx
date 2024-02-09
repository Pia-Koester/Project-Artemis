import CreateActivityType from "../components/AdminProfile/CreateActivityType";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

//importing icons
import EditActivityType from "../components/AdminProfile/EditActivityType";
import TypeRows from "../components/AdminProfile/TypeRows";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Types() {
  const { data: activityTypes } = useLoaderData();
  console.log(activityTypes);
  const [editMode, setEditMode] = useState(false);
  const [selectedType, setSelectedType] = useState({});
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <button
        className="btn btn-circle btn-neutral mr-3 mt-2 self-start"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeftIcon className="w-5" />
      </button>
      <div className="grid-für-bento flex flex-col">
        <div className="flex justify-center gap-6 items-start">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-100  flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className=" flex justify-center text-2xl leading-6 font-medium text-gray-900 font-titleH3 mb-1">
                  Activity Types
                </h2>

                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}

                    <tbody>
                      {activityTypes?.map((item) => {
                        return (
                          <TypeRows
                            item={item}
                            setEditMode={setEditMode}
                            setSelectedType={setSelectedType}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {!editMode ? (
            <CreateActivityType />
          ) : (
            <EditActivityType activitytype={selectedType} />
          )}
        </div>
        {editMode && (
          <div className="carousel carousel-center rounded-box w-96 self-center m-4">
            {selectedType?.images?.map((image) => {
              return (
                <div className="carousel-item">
                  <img
                    src={image.url}
                    alt="Pizza"
                    key={image._id}
                    className="object-center	w-96"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

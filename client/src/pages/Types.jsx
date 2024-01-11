import CreateActivityType from "../components/AdminProfile/CreateActivityType";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

//importing icons
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import EditActivityType from "../components/AdminProfile/EditActivityType";

export default function Types() {
  const activityTypes = useLoaderData();
  console.log(activityTypes);
  const [editMode, setEditMode] = useState(false);
  const [selectedType, setSelectedType] = useState({});

  const handleEdit = (id) => {
    console.log(id);
    setEditMode(true);
    const selected = activityTypes.find((type) => type._id === id);
    setSelectedType(selected);
  };

  return (
    <div className="grid-für-bento flex flex-col">
      <div className="flex justify-center gap-6 items-start">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-100  flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Activity Types
              </h2>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}

                  <tbody>
                    {activityTypes?.map((item) => {
                      const isSelected = item._id === selectedType._id;
                      return (
                        <tr
                          key={item._id}
                          className={isSelected ? "bg-yellow-200" : ""}
                        >
                          <th>{item.type.toUpperCase()}</th>
                          <td>
                            <div onClick={() => handleEdit(item._id)}>
                              <FaPencil />
                            </div>
                          </td>
                          <td>
                            <FaRegTrashCan />
                          </td>
                        </tr>
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
          {selectedType?.images.map((image) => {
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
  );
}

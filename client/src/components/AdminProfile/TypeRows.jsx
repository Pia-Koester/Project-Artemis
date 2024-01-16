import { useRef, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TypeRows({ item, setEditMode, setSelectedType }) {
  const modalRef = useRef(null);
  const [highlighted, setHighlighted] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    setEditMode(true);
    setSelectedType(item);
    setHighlighted(true);
  };

  const handleDelete = async (id) => {
    setEditMode(true);

    axiosClient
      .delete(`/activityTypes/${id}`)
      .then((response) => {
        closeModal();
        notify();
        setTimeout(() => {
          navigate(-1);
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    modalRef.current.close(); // Close the modal
  };

  const notify = () =>
    toast.success("--Deleted Successfully--", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <>
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
      <tr key={item._id}>
        <th>{item.type.toUpperCase()}</th>
        <td>
          <div onClick={() => handleEdit(item._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 transition-transform transform hover:scale-150 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
        </td>
        <td>
          <button onClick={() => modalRef.current.showModal()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 transition-transform transform hover:scale-150 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </td>
      </tr>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <div
            id="alert-additional-content-2"
            class="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <div class="flex items-center">
              <svg
                class="flex-shrink-0 w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <h3 class="text-lg font-medium">
                Warning! You are about the delete the following activity type:{" "}
                <span className="font-bold">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
              </h3>
            </div>
            <div class="mt-2 mb-4 text-sm"></div>
            <div class="mt-2 mb-4 text-sm">
              After clicking the "Confirm" button this action can no longer be
              reverted!
            </div>
            <div class="mt-2 mb-4 text-sm">
              Are you sure you want to delte the activity type?
            </div>
            <div class="flex">
              <button
                onClick={() => handleDelete(item._id)}
                type="button"
                class="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Confirm
              </button>
              <form method="dialog">
                <button class="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

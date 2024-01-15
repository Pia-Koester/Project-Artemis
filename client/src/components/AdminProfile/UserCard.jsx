import userIcon from "../../assets/logos/avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosClient from "../../api/axiosClient";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  const deleteUser = async () => {
    axiosClient
      .delete(`/users/${user._id}`)
      .then((response) => {
        //To do replace function with something better
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <tbody>
        <tr>
          <th>
            <div className="avatar"></div>
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-lg btn-circle avatar"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="rounded-full"
                >
                  {user.image?.url ? (
                    <img
                      alt="User Icon - click to see menu options"
                      src={user.image?.url}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <img
                      alt="User Icon - click to see menu options"
                      src={userIcon}
                    />
                  )}
                </motion.div>
              </div>
              {/* <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={userIcon} />
                </div>
              </div> */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={`/userProfile/usersOverview/${user._id}`}>
                    View profile
                  </Link>
                </li>
              </ul>
            </div>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div>
                <div className="font-bold">
                  {user.firstName + " " + user.lastName}
                </div>
                <div className="text-sm opacity-50">{user.address}</div>
              </div>
            </div>
          </td>
          <td>
            {user.email}
            <br />
            <span className="badge badge-ghost badge-sm">{user.role}</span>
          </td>
          <td>{user.status}</td>
          <td className="flex items-center justify-center h-full w-1/2">
            {user.classesRegistered.length}
          </td>
          <th>
            <Link to={`/userProfile/usersOverview/${user._id}`}>Details</Link>
          </th>
          <td className="flex items-center justify-center h-full w-1/2">
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
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
      </tbody>

      <dialog id="my_modal_1" className="modal">
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
                Warning! You are about the delete the profile of:{" "}
                <span className="font-bold">
                  {user.firstName + " " + user.lastName}
                </span>
              </h3>
            </div>
            <div class="mt-2 mb-4 text-sm"></div>
            <div class="mt-2 mb-4 text-sm">
              After clicking the "Confirm" button this action can no longer be
              reverted!
            </div>
            <div class="mt-2 mb-4 text-sm">
              Are you sure you want to delte the user profile?
            </div>
            <div class="flex">
              <button
                onClick={deleteUser}
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

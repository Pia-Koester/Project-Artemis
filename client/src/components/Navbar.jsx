import { Link, NavLink } from "react-router-dom";
import navLogo from "../assets/logos/WortBildmarkeMAINLOGO_anthra.svg";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import userIcon from "../assets/logos/avatar.jpg";
import { motion } from "framer-motion";

export default function Navbar() {
  const { isLoading, user, logout } = useContext(AuthContext);

  return (
    <>
      {!isLoading && (
        <div className="navbar bg-base-100 px-10 py-3">
          <div className="flex-1">
            <NavLink to={"/"}>
              <img className="btn btn-ghost w-full" src={navLogo} alt="home" />
            </NavLink>
          </div>

          {!user ? (
            <>
              <div className="flex-none ">
                <div className="flex-1">
                  <NavLink to={"/signup"} className="btn btn-ghost text-xl">
                    Sign Up
                  </NavLink>
                  <NavLink to={"/login"} className="btn btn-ghost text-xl">
                    Login
                  </NavLink>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-none">
              <div className="flex-1">
                <a href="#" className="btn btn-ghost text-xl">
                  <p>{`Hello ${user.firstName}`}</p>
                </a>
              </div>
              <div className="dropdown dropdown-end">
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
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {user.role === "student" && (
                    <li>
                      <Link to={"/userProfile/activities"}>
                        My Booked Classes
                      </Link>
                    </li>
                  )}{" "}
                  {user.role === "admin" && (
                    <li>
                      <Link to={"/dashboard "}>Admin Dashboard</Link>
                    </li>
                  )}
                  {user.role === "student" && (
                    <li>
                      <Link to={"/userProfile/memberships"}>
                        My Memberships
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to={"/userProfile/details"}>Settings</Link>
                  </li>
                  <li>
                    <Link onClick={logout}>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

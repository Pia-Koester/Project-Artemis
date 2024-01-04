import { Link, NavLink } from "react-router-dom";
import navLogo from "../assets/logos/WortBildmarkeMAINLOGO_anthra.svg";
import userIcon from "../assets/logos/avatar.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {
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
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink to={"/"}>
            <img className="btn btn-ghost" src={navLogo} alt="home" />
          </NavLink>
        </div>

        <div className="flex-none">
          <div className="flex-1">
            <a href="#" className="btn btn-ghost text-xl">
              Hello {!user ? <p>Loading...</p> : <p>{user.firstName}</p>}
            </a>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={userIcon} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/userProfile/activities"}>
                  My Booked Classes
                </Link>
              </li>
              <li>
                <a>Notifications</a>
              </li>
              <li>
                <a>My Favourite Classes</a>
              </li>
              <li>
                <Link to={"/userProfile/memberships"}>
                  My Memberships
                </Link>
              </li>
              <li>
                <Link to={"/userProfile/details"}>
                  Settings
                </Link>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

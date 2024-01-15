import { Link, NavLink } from "react-router-dom";
import navLogo from "../assets/logos/WortBildmarkeMAINLOGO_anthra.svg";
import userIcon from "../assets/logos/avatar.jpg";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

export default function Navbar() {

  const {user, logout} = useContext(AuthContext);

  const handleLogout = () => {
    logout()
  }

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
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

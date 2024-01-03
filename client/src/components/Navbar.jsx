import { Link, NavLink } from "react-router-dom";
import navLogo from "../assets/logos/WortBildmarkeMAINLOGO_anthra.svg";

export default function Navbar() {
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
            <NavLink to={"/signup"} className="btn btn-ghost text-xl">
              Register
            </NavLink>
            <NavLink to={"/login"} className="btn btn-ghost text-xl">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

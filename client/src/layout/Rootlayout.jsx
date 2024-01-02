import { Outlet } from "react-router-dom";

export default function Rootlayout() {
  return (
    <>
      <h1>THIS IS THE HEADLINE FROM THE ROOT LAYOUT</h1>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

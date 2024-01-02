import { Outlet } from "react-router-dom";

export default function Rootlayout() {
  return (
    <>
      <h1>TEST TEST </h1>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

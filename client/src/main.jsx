import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//IMPORTING THINGS FOR ROUTER
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootlayout from "./layout/Rootlayout.jsx";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ClassSchedule from "./pages/ClassSchedule";

//loader Functions
import { getActivities } from "./api/activities.js";
import ClassDetails from "./pages/ClassDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        path: "/",
        element: <ClassSchedule />,
        loader: getActivities, //send the date with the request, and only specific trainers?
        index: true,
      },
      {
        path: "signup",
        element: <Registration />,
      },
      {
        path: "login",
        element: <Login />,
      },
      { path: "details", element: <ClassDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

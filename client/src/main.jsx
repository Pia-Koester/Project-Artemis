import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//IMPORTING THINGS FOR ROUTER
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootlayout from "./layout/RootLayout.jsx";
import UserLayout from "./layout/UserLayout.jsx";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import UserMemberships from "./components/UserProfile/UserMemberships.jsx";
import UserActivities from "./components/UserProfile/UserActivities.jsx";
import UserSettings from "./components/UserProfile/UserSettings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        path: "signup",
        element: <Registration />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/userProfile",
    element: <UserLayout />,
    children: [
      {
        path: "memberships",
        element: <UserMemberships />,
      },
      {
        path: "activities",
        element: <UserActivities />,
      },
      {
        path: "updateProfile",
        element: <UserSettings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

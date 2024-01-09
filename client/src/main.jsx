import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//IMPORTING THINGS FOR ROUTER
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootlayout from "./layout/RootLayout.jsx";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ClassSchedule from "./pages/ClassSchedule";

//loader Functions
import { getActivities, getActivity } from "./api/activities.js";
import ClassDetails from "./pages/ClassDetails";
import UserMemberships from "./components/UserProfile/UserMemberships.jsx";
import UserActivities from "./components/UserProfile/UserActivities.jsx";
import UserInformation from "./components/UserProfile/UserInformation.jsx";
import MembershipPlans from "./components/Memberships/MembershipPlans.jsx";
import UserUpdateInformation from "./components/UserProfile/UserUpdateInformation.jsx";
import Protected from "./pages/Protected";
import UsersOverview from "./components/AdminProfile/UsersOverview.jsx";
import SingleUserInformation from "./components/AdminProfile/SingleUserInformation.jsx";
import CreateMembership from "./components/AdminProfile/CreateMembership.jsx";
import EditUserInformation from "./components/AdminProfile/EditUserInformation.jsx";

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

      { path: "details/:id", element: <ClassDetails />, loader: getActivity },
      {
        path: "membershipPlans",
        element: <MembershipPlans />,
      },
      {
        path: "/",
        element: <Protected />,
        children: [
          {
            path: "/userProfile/memberships",
            element: <UserMemberships />,
          },
          {
            path: "/userProfile/activities",
            element: <UserActivities />,
          },
          {
            path: "/userProfile/details",
            element: <UserInformation />,
          },
          {
            path: "/userProfile/details/update",
            element: <UserUpdateInformation />,
          },
          {
            path: "/userProfile/usersOverview",
            element: <UsersOverview />,
          },
          {
            path: "/userProfile/usersOverview/:id",
            element: <SingleUserInformation />,
          },
          {
            path: "/userProfile/createMembership",
            element: <CreateMembership />,
          },
          {
            path: "/userProfile/usersOverview/:id/update",
            element: <EditUserInformation />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

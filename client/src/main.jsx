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
import CreateActivity from "./components/AdminProfile/CreateActivity";
import CreateActivityType from "./components/AdminProfile/CreateActivityType";
import MembershipsOverview from "./components/AdminProfile/MembershipsOverview.jsx";
import EditMembershipInformation from "./components/AdminProfile/EditMembershipInformation.jsx";
import Authorize from "./pages/Authorize";
import Types from "./pages/Types";
import EditActivityType from "./components/AdminProfile/EditActivityType";

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
            path: "/",
            element: <Authorize role={"admin"} />,
            children: [
              {
                path: "/userProfile/usersOverview",
                element: <UsersOverview />,
              },
              {
                path: "/userProfile/usersOverview/:id",
                element: <SingleUserInformation />,
              },
              {
                path: "/userProfile/usersOverview/:id/update",
                element: <EditUserInformation />,
              },
              {
                path: "/userProfile/createMembership",
                element: <CreateMembership />,
              },
              {
                path: "/userProfile/membershipsOverview",
                element: <MembershipsOverview />,
              },
              {
                path: "/userProfile/membershipsOverview/:id",
                element: <EditMembershipInformation />,
              },
              {
                path: "/createActivity",
                element: <CreateActivity />,
                loader: async () => {
                  return fetch(`http://localhost:8080/activityTypes`);
                },
              },
              {
                path: "/createType",
                element: <Types />,
                loader: async () => {
                  return fetch(`http://localhost:8080/activityTypes`);
                },
              },
            ],
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

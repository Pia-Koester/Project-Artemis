import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//IMPORTING THINGS FOR ROUTER
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import MembershipsOverview from "./components/AdminProfile/MembershipsOverview.jsx";
import EditMembershipInformation from "./components/AdminProfile/EditMembershipInformation.jsx";
import Authorize from "./pages/Authorize";
import Types from "./pages/Types";
import Dashboard from "./pages/Dashboard";
import Authlayout from "./layout/Authlayout";
import Rootlayout from "./layout/Rootlayout";
import EditActivityType from "./components/AdminProfile/EditActivityType.jsx";
import ErrorPage from "./pages/errors/ErrorPage";
import UploadAvatar from "./components/UserProfile/UploadAvatar";
import axiosClient from "./api/axiosClient";
import CreateInstructor from "./components/AdminProfile/CreateInstructor";
import Bookingconfirmation from "./pages/Bookingconfirmation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Authlayout />,
        children: [
          {
            path: "",
            element: <ClassSchedule />,
            loader: getActivities,
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

          {
            path: "details/:id",
            element: <ClassDetails />,
            loader: getActivity,
          },
          {
            path: "details/:id/confirmation",
            element: <Bookingconfirmation />,
            loader: getActivity,
          },
          {
            path: "membershipPlans",
            element: <MembershipPlans />,
          },
          {
            path: "",
            element: <Protected />,
            children: [
              {
                path: "userProfile/memberships",
                element: <UserMemberships />,
              },
              {
                path: "userProfile/activities",
                element: <UserActivities />,
              },
              {
                path: "userProfile/details",
                element: <UserInformation />,
              },
              {
                path: "userProfile/details/update",
                element: <UserUpdateInformation />,
              },
              {
                path: "userProfile/details/upload/:id",
                element: <UploadAvatar />,
              },
              {
                path: "",
                element: <Authorize role={"admin"} />,
                children: [
                  {
                    path: "userProfile/usersOverview",
                    element: <UsersOverview />,
                  },
                  {
                    path: "userProfile/usersOverview/:id",
                    element: <SingleUserInformation />,
                  },
                  {
                    path: "userProfile/usersOverview/:id/update",
                    element: <EditUserInformation />,
                  },
                  {
                    path: "userProfile/createMembership",
                    element: <CreateMembership />,
                  },
                  {
                    path: "userProfile/membershipsOverview",
                    element: <MembershipsOverview />,
                  },
                  {
                    path: "userProfile/membershipsOverview/:id",
                    element: <EditMembershipInformation />,
                  },
                  {
                    path: "dashboard",
                    element: <Dashboard />,
                  },
                  {
                    path: "createActivity",
                    element: <CreateActivity />,
                    loader: async () => {
                      return await axiosClient.get(`/activityTypes`);
                    },
                  },
                  {
                    path: "createType",
                    element: <Types />,
                    loader: async () => {
                      return await axiosClient.get(`/activityTypes`);
                    },
                  },
                  {
                    path: "dashboard/editActivitiy/:id",
                    element: <EditActivityType />,
                  },
                  {
                    path: "createinstructor",
                    element: <CreateInstructor />,
                  },
                ],
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

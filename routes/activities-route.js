const express = require("express");

const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  cancelActivity,
} = require("../controllers/activities-controller.js");
const { authenticate, authorize } = require("../middlewares/authentication.js");
const {
  setUserActivity,
  cancelUserActivity,
} = require("../controllers/users-controller.js");
const {
  updateUserMembership,
  cancelUserMembershipCredit,
} = require("../controllers/userMemberships-controller.js");

const activityRouter = express.Router();

activityRouter
  .route("/")
  .post(authenticate, authorize("admin"), createActivity)
  .get(getActivities);
activityRouter
  .route("/:activity_id")
  .get(getActivity)
  .put(authenticate, updateActivity, setUserActivity, updateUserMembership);
//QUESTION: how can we make sure that loged in users get the user data in the response but not logged in users can still see the page?
//TO DO: create put request updating the activities
activityRouter
  .route("/:activity_id/cancel")
  .put(
    authenticate,
    cancelActivity,
    cancelUserActivity,
    cancelUserMembershipCredit
  );

module.exports = activityRouter;

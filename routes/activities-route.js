const express = require("express");

const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  cancelActivity,
  adminUpdateActivity,
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
  .route("/admin/:activity_id")
  .get(getActivity)
  .put(authenticate, authorize("admin"), adminUpdateActivity);

activityRouter
  .route("/:activity_id")
  .get(getActivity)
  .put(authenticate, updateActivity, setUserActivity, updateUserMembership);

activityRouter
  .route("/:activity_id/cancel")
  .put(
    authenticate,
    cancelActivity,
    cancelUserActivity,
    cancelUserMembershipCredit
  );

module.exports = activityRouter;

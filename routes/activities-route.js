const express = require("express");

const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  cancelActivity,
} = require("../controllers/activities-controller.js");
const { authenticate } = require("../middlewares/authentication.js");
const { setUserActivity, cancelUserActivity } = require("../controllers/users-controller.js");
const activityRouter = express.Router();

activityRouter.route("/").post(createActivity).get(getActivities);
activityRouter
  .route("/:activity_id")
  .get(getActivity)
  .put(authenticate, updateActivity, setUserActivity);
activityRouter.route("/:activity_id/cancel").put(authenticate, cancelActivity, cancelUserActivity)

module.exports = activityRouter;

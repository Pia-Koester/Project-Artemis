const express = require("express");

const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
} = require("../controllers/activities-controller.js");
const { authenticate } = require("../middlewares/authentication.js");
const { setUserActivity } = require("../controllers/users-controller.js");
const activityRouter = express.Router();

activityRouter.route("/").post(createActivity).get(getActivities);
activityRouter
  .route("/:activity_id")
  .get(getActivity)
  .put(authenticate, updateActivity, setUserActivity);

module.exports = activityRouter;

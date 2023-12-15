const express = require("express");

const {
  createActivity,
  getActivities,
  getActivity,
} = require("../controllers/activities-controller.js");

const activityRouter = express.Router();

activityRouter.route("/").post(createActivity).get(getActivities);
activityRouter.route("/:activity_id").get(getActivity);

module.exports = activityRouter;

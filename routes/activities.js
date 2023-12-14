const express = require("express");

const { createActivity } = require("../controllers/activities");

const activityRouter = express.Router();

activityRouter.route("/").post(createActivity);

module.exports = activityRouter;

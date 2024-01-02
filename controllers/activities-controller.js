const Activity = require("../models/activities-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const { Error } = require("mongoose");

const createActivity = asyncWrapper(async (req, res, next) => {
  const {
    title,
    description,
    capacity,
    waitlist,
    instructor,
    location,
    startTime,
    endTime,
    registeredUsers,
  } = req.body;
  const activity = await Activity.create({
    title,
    description,
    capacity,
    waitlist,
    instructor,
    location,
    startTime,
    endTime,
    registeredUsers,
  });
  res.status(201).json(activity);
});

const getActivities = asyncWrapper(async (req, res, next) => {
  const activities = await Activity.find({});
  res.json(activities);
});

const getActivity = asyncWrapper(async (req, res, next) => {
  const { activity_id } = req.params;
  const activity = await Activity.findById(activity_id).populate(
    "registeredUsers"
  ); // TODO: .populate("waitlist.waitlistUsers") is this the correct way??
  if (!activity) {
    throw new ErrorResponse("Activity not found", 404);
  }
  res.json(activity);
});

//TODO: create put request to add users to the registered users array

module.exports = {
  createActivity,
  getActivities,
  getActivity,
};

const Activity = require("../models/activities-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const mongoose = require("mongoose");

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

  //defining the weekdays for different filter functions
  const start = new Date(startTime);
  const options = { weekday: "long" };
  const weekday = new Intl.DateTimeFormat("en-En", options).format(start);

  const activity = await Activity.create({
    title,
    description,
    capacity,
    waitlist,
    instructor,
    location,
    startTime: start,
    endTime,
    registeredUsers,
    weekday,
  });
  res.status(201).json(activity);
});

const getActivities = asyncWrapper(async (req, res, next) => {
  const { instructor, mon, sun, type } = req.query;
  console.log(req.query);

  let filter = {
    startTime: {
      $gte: new Date(mon).toLocaleDateString("en-US"),
      $lt: new Date(sun).toLocaleDateString("en-US"),
    },
  };

  const queryParams = { instructor }; //TO DO: put back type to be able to filter for it

  for (const key of Object.keys(queryParams)) {
    const value = queryParams[key];
    if (value !== undefined) {
      if (key === "type") {
        filter["type._id"] = value;
      } else {
        filter[key] = value;
      }
    }
  }

  console.log(filter);

  const activities = await Activity.find(filter).populate("type").sort({
    startTime: "asc",
  });
  console.log(activities);
  res.json(activities);
});

const getActivity = asyncWrapper(async (req, res, next) => {
  const { activity_id } = req.params;
  const activity = await Activity.findById(activity_id)
    .populate("registeredUsers")
    .populate("type"); // TODO: .populate("waitlist.waitlistUsers") is this the correct way??
  if (!activity) {
    throw new ErrorResponse("Activity not found", 404);
  }
  res.json(activity);
});

//TODO: if activity is full throw error and/or disable posibilty of registering new user
const updateActivity = asyncWrapper(async (req, res, next) => {
  const { activity_id } = req.params;
  const { id } = req.user;
  const oldActivity = await Activity.findById(activity_id);
  const userArray = oldActivity.registeredUsers;

  const match = userArray.includes(id);
  if (match) {
    throw new ErrorResponse("This user has already registered", 409);
  } else {
    userArray.push(id);
  }

  const updatedActivity = await Activity.findByIdAndUpdate(
    activity_id,
    {
      registeredUsers: userArray,
    },
    { new: true }
  );
  req.activity = updatedActivity;

  next();
});

const cancelActivity = asyncWrapper(async (req, res, next) => {
  const { activity_id } = req.params;
  const { id } = req.user;
  const oldActivity = await Activity.findById(activity_id);
  const userArray = oldActivity.registeredUsers;

  const match = userArray.indexOf(id);

  if (match === -1) {
    throw new ErrorResponse("User not registered!", 404);
  } else {
    userArray.splice(match, 1);
  }

  const updatedActivity = await Activity.findByIdAndUpdate(
    activity_id,
    {
      registeredUsers: userArray,
    },
    { new: true }
  );
  req.activity = updatedActivity;

  next();
});

module.exports = {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  cancelActivity,
};

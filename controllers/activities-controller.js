const Activity = require("../models/activities-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

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
  const { instructor, mon, sun } = req.query;
  console.log(mon);

  let filter = {
    startTime: {
      $gte: new Date(mon).toLocaleDateString("en-US"),
      $lt: new Date(sun).toLocaleDateString("en-US"),
    },
  };
  console.log(filter);
  if (!instructor || instructor === "All") {
    if (!mon && !sun) {
      const activities = await Activity.find({}).sort({
        startTime: "asc",
      });
      res.json(activities);
    }
    const activities = await Activity.find(filter).sort({
      startTime: "asc",
    });

    res.json(activities);
  } else {
    const activities = await Activity.find({
      $and: [filter, { instructor }],
    }).sort({
      startTime: "asc",
    });
    res.json(activities);
  }
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

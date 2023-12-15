const Activity = require("../models/activities-model.js");

const createActivity = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send("Yet again?"); //TO-DO go through all the error messages and assign the correct one
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.json(activities);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while getting activities");
  }
};

const getActivity = async (req, res) => {
  try {
    const { activity_id } = req.params;
    const activity = await Activity.findById(activity_id).populate(
      "registeredUsers"
    ); // TODO: .populate("waitlist.waitlistUsers") is this the correct way??
    if (!activity) {
      return res.status(404).send("Activity not found");
    }
    res.json(activity);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while getting activity");
  }
};

//TODO: create put request to add users to the registered users array

module.exports = {
  createActivity,
  getActivities,
  getActivity,
};

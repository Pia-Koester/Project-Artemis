const Activity = require("../models/activities.js");

const createActivity = async (req, res) => {
  try {
    const { title, description, startTime, endTime, registeredUsers } =
      req.body;
    const activity = await Activity.create({
      title,
      description,
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
    const { id } = req.params;
    const activity = await Activity.findById(id);
    res.json(activity);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while getting activity");
  }
};

module.exports = {
  createActivity,
  getActivities,
  getActivity,
};

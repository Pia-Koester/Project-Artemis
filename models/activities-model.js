const { Schema, model } = require("mongoose");

const waitlistSchema = new Schema({
  active: { type: Boolean },
  waitlistUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const activitySchema = new Schema({
  title: { type: String, required: true, unique: true }, // To Do: does not need to be unique
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  capacity: { type: Number },
  waitlist: waitlistSchema,
  instructor: { type: String },
  location: { type: String },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Activity = model("Activitie", activitySchema);

module.exports = Activity;

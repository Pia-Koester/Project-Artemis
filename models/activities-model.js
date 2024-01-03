const { Schema, model } = require("mongoose");

const waitlistSchema = new Schema({
  active: { type: Boolean },
  waitlistUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const activitySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  capacity: { type: Number },
  waitlist: waitlistSchema,
  instructor: { type: String },
  location: { type: String },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  trialMembership: { type: Boolean, default: true },
  // To Do: create new field to make activity be either paid with membership or only single booking possible / bookingOption??
});

const Activity = model("Activitie", activitySchema);

module.exports = Activity;

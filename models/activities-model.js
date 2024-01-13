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
  weekday: { type: String, lowercase: true },
  capacity: { type: Number },
  waitlist: waitlistSchema,
  instructor: { type: String },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
      default: [53.58044198674046, 9.97947668337071],
    },
    address: { type: String, default: "Klosterallee 67" },
  },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  trialMembership: { type: Boolean, default: true },
  type: { type: Schema.Types.ObjectId, ref: "Activitytype" },
  // To Do: create new field to make activity be either paid with membership or only single booking possible / bookingOption??
});

activitySchema.pre("save", async function (next) {
  // this pre middlewar applies directly before saving
  if (this.isModified("weekday")) this.weekday = this.weekday.toLowerCase();
  next();
});

const Activity = model("Activitie", activitySchema);

module.exports = Activity;

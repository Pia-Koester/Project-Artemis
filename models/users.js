const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true }, // TODO - ask Isabella
  password: { type: String, required: true },
  dateOfRegistration: { type: Date, default: Date.now() },
  lastParticipationDate: { type: Date },
  lastLoginDate: { type: Date },
  profileImage: { type: String },
  address: { type: String },
  role: {
    type: String,
    enum: ["student", "admin", "instructor"], 
    default: "student",
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  activeMembership: { type: Schema.Types.ObjectId, ref: "Membership" },
  classesRegistered: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
});

const User = model("User", userSchema);

module.exports = User;
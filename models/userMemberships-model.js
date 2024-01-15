const { Schema, model } = require("mongoose");

const userMembershipSchema = new Schema({
  plan: { type: Schema.Types.ObjectId, ref: "MembershipPlan", required: true },
  purchaseDate: { type: Date, default: Date.now() },
  expiryDate: { type: Date },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // TO DO Implement it after the payment has been decided.
  usedCredits: { type: Number, default: 0 },   //TO DO start at total credits and cound down to zero when booked a class
  actualCredits: { type: Number, default: 0 },   //TO DO update with cron-job 

});

const UserMembership = model("UserMembership", userMembershipSchema);

module.exports = UserMembership;

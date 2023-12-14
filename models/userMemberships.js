const { Schema, model } = require("mongoose");

const userMembershipSchema = new Schema({
  plan: { type: Schema.Types.ObjectId, ref: "MembershipPlan", required: true },
  purchaseDate: { type: Date, default: Date.now() },
  expiryDate: { type: Date },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // TODO Implement it after the payment has been decided.
  usedCredits: { type: Number, default: 0 },
});

const UserMembership = model("UserMembership", userMembershipSchema);

module.exports = UserMembership;

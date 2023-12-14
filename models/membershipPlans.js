const { Schema, model } = require("mongoose");

const membershipPlanSchema = new Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true }, // Question - what to do about the float? 
  // validity, - TODO - Ask Anoj about what should be the format for the data
  totalCredits: { type: Number, required: true },
});

const MembershipPlan = model("MembershipPlan", membershipPlanSchema);

module.exports = MembershipPlan;

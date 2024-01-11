const { Schema, model } = require("mongoose");

const membershipPlanSchema = new Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  validity: { type: Number }, //- TODO - must be milliseconds to be able to add it to the purchaseDate to calculate the expiration
  totalCredits: { type: Number, required: true },

});

const MembershipPlan = model("MembershipPlan", membershipPlanSchema);

module.exports = MembershipPlan;

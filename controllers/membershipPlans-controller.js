const MembershipPlan = require("../models/membershipPlans-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

//create new membership plan (like 10er Karte, unlimited offer etc)
const createMembershipPlan = asyncWrapper(async (req, res, next) => {
  const { title, price, totalCredits } = req.body;
  const plan = await MembershipPlan.create({
    title,
    price,
    totalCredits,
  });
  res.status(201).json(plan);
});

// get all the available memberships
const getMembershipPlans = asyncWrapper(async (req, res, next) => {
  const membershipplans = await MembershipPlan.find({})
  
  res.json(membershipplans);
});

// get one single membership using the _id from mongodb
const getMembershipPlan = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const plan = await MembershipPlan.findById(id);
  if (!plan) {
    throw new ErrorResponse("No Membership Plan found", 404);
  }
  res.json(plan);
});

//Update single membership plan
const updateMembershipPlan = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const {title, price, totalCredits} = req.body
  
  const plan = await MembershipPlan.findByIdAndUpdate(id, {title, price, totalCredits});
  if (!plan) {
    throw new ErrorResponse("No Membership Plan found", 404);
  }
  res.json(plan);
});

//Delete single membership plan
const deleteMembershipPlan = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  
  const plan = await MembershipPlan.findByIdAndDelete(id);
  if (!plan) {
    throw new ErrorResponse("No Membership Plan found", 404);
  }
  res.json(plan);
});
module.exports = {
  createMembershipPlan,
  getMembershipPlans,
  getMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan
};

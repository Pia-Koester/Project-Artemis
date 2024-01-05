const UserMembership = require("../models/userMemberships-model.js");
const ErrorResponse = require("../utils/errorResponse.js")
const asyncWrapper = require("../utils/asyncWrapper.js")

const getUserMemberships = asyncWrapper(async (req, res, next) => {
  const userMemberships = await UserMembership.find({})
  .populate("user")
  .populate("plan");

if (userMemberships.length === 0) {
  throw new ErrorResponse("No results found!", 404);
} else {
  res.status(200).json(userMemberships);
}
})

const getUserMembership = asyncWrapper(async (req, res, next) => {
  const { membershipId } = req.params;

  const userMembership = await UserMembership.find({ _id: membershipId })
    .populate("user")
    .populate("plan");

  if (userMembership.length === 0) {
    throw new ErrorResponse("No results found!", 404);
  } else {
    res.status(200).json(userMembership);
  }
})

const createUserMembership = asyncWrapper(async (req, res, next) => {
    const { plan, user, expiryDate } = req.body;
    const userMembership = await UserMembership.create({
      plan,
      user,
      expiryDate,
    });

    req.userMembership = userMembership

    next()
    // res.status(201).json(userMembership);
})

module.exports = {
  getUserMemberships,
  getUserMembership,
  createUserMembership,
};

const UserMembership = require("../models/userMemberships-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

const getUserMemberships = asyncWrapper(async (req, res, next) => {
  const userMemberships = await UserMembership.find({})
    .populate("user")
    .populate("plan");

  if (userMemberships.length === 0) {
    throw new ErrorResponse("No results found!", 404);
  } else {
    res.status(200).json(userMemberships);
  }
});

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
});

const createUserMembership = asyncWrapper(async (req, res, next) => {
  const { plan, user, expiryDate } = req.body;
  const userMembership = await UserMembership.create({
    plan,
    user,
    expiryDate,
  });

  req.userMembership = userMembership;

  next();
  // res.status(201).json(userMembership);
});

const updateUserMembership = asyncWrapper(async (req, res, next) => {
  const { id, activeMembership } = req.user;
  const { activity } = req;

  const userMembership = await UserMembership.findByIdAndUpdate(
    activeMembership,

    { $inc: { usedCredits: 1 }  },
    { new: true, populate: "plan"}
  );

  if (userMembership.usedCredits === userMembership.plan.totalCredits) {
    userMembership.status = 'inactive';

    await userMembership.save();
  }

  if(userMembership.usedCredits > userMembership.plan.totalCredits) {
    userMembership.usedCredits = userMembership.plan.totalCredits
    await userMembership.save();

    throw new ErrorResponse("No credits remaining!", 409)
  }

  res.send({activity, user: {...req.user, activeMembership: userMembership}});

});

const cancelUserMembershipCredit = asyncWrapper(async (req, res, next) => {
  const { id, activeMembership } = req.user;
  const { activity } = req;

  const userMembership = await UserMembership.findByIdAndUpdate(
    activeMembership,
    { $inc: { usedCredits: -1 } },
    { new: true, populate: "plan" }
  );


  if (userMembership.usedCredits < userMembership.plan.totalCredits) {
    userMembership.status = 'active';
    await userMembership.save();
  }


  res.send({
    user: { ...req.user._doc, activeMembership: userMembership },
    activity,
  });
});

module.exports = {
  getUserMemberships,
  getUserMembership,
  createUserMembership,
  updateUserMembership,
  cancelUserMembershipCredit,
};

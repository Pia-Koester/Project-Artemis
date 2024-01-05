const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

//create new user
const createUser = asyncWrapper(async (req, res, next) => {
  const {
    email,
    phone,
    password,
    firstName,
    lastName,
    dateOfBirth,
    activeMembership,
    classesRegistered,
    termsOfUse,
    dataProtectionInfo,
    address,
  } = req.body;
  console.log("POSTMAN TEST", email);

  const found = await User.findOne({ email });
  if (found) {
    throw new ErrorResponse("User already exists!", 409);
  }

  const user = await User.create({
    email,
    phone,
    password,
    firstName,
    lastName,
    dateOfBirth,
    activeMembership,
    classesRegistered,
    termsOfUse,
    dataProtectionInfo,
    address,
  });
  console.log("hashed password", user.password);
  res.status(201).json(user);
});

//Gets all the users
//TODO don't return the passwords
const getUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

//Update user profile
const updateProfile = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { firstName, lastName, phone, address, dateOfBirth } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, phone, address, dateOfBirth },
    { new: true }
  );
  res.json(user);
});

//Set user active membership after successful purchase
const setUserMembership = asyncWrapper(async (req, res, next) => {
  const { _id, user } = req.userMembership;

  const membershipHolder = await User.findByIdAndUpdate(
    user,
    { activeMembership: _id },
    { new: true }
  );
  res.json(membershipHolder);
});

//Set user active membership after successful purchase
const setUserActivity = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { activity } = req;
  console.log(id, activity);
  const activity_id = activity._id;
  const oldUser = await User.findById(id);
  const activityArray = oldUser.classesRegistered;

  //TO DO: error handeling if activity is already in the array
  activityArray.push(activity_id);
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { classesRegistered: activityArray },
    { new: true }
  );
  console.log({ updatedUser });
  res.json("success");
});

//User login
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ErrorResponse("User does not exist!", 404);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new ErrorResponse("Incorrect Password!", 401);
  }

  const payload = { id: user._id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "480m",
  });

  res
    .cookie("access_token", token, { httpOnly: true, maxAge: 28800000 })
    .json(payload);
});

//User logout
const logout = asyncWrapper(async (req, res, next) => {
  res
    .cookie("access_token", "", { httpOnly: true, maxAge: 0 })
    .json({ success: true });
});

//Get users profile after authentication
const getProfile = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id)
    .populate("classesRegistered")
    .populate({
      path: "activeMembership",
      populate: { path: "plan", model: "MembershipPlan" },
    });
  res.json(user);
});

module.exports = {
  createUser,
  getUsers,
  login,
  logout,
  getProfile,
  updateProfile,
  setUserMembership,
  setUserActivity,
};

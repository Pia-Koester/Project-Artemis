const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

//create new user
const createUser = asyncWrapper(async (req, res, next) => {
  const {
    email,
    phoneNumber,
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

  const found = await User.findOne({ email });
  if (found) {
    throw new ErrorResponse("User already exists!", 409);
  }

  const user = await User.create({
    email,
    phoneNumber,
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

  res.status(201).json(user);
});

//Gets all the users
//TODO don't return the passwords
const getUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({}).populate("classesRegistered")
  .populate({
    path: "activeMembership",
    populate: { path: "plan", model: "MembershipPlan" },
  });;
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
    { new: true, populate: {
      path: "activeMembership",
      populate: { path: "plan", model: "MembershipPlan" }
    }}
  );
    console.log(membershipHolder)

  res.json(membershipHolder.activeMembership);
});

const setUserActivity = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { activity } = req;
  const { _id: activity_id } = activity; // Destructure directly

  // Retrieve old user data
  const oldUser = await User.findById(id);

  if (!oldUser) {
    throw new ErrorResponse("User not found", 404);
  }

  const { classesRegistered } = oldUser;

  // Check if activity_id is already registered
  const isRegistered = classesRegistered.includes(activity_id);

  if (isRegistered) {
    throw new ErrorResponse("User already registered", 409);
  }

  // Update the user's data
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $push: { classesRegistered: activity_id } },
    { new: true, populate: "classesRegistered" }
  )

  req.user = updatedUser;

  next();
});

const cancelUserActivity = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { activity } = req;
  const activity_id = activity._id;
  const oldUser = await User.findById(id);
  const activityArray = oldUser.classesRegistered;

  const match = activityArray.indexOf(activity_id);

  if (match === -1) {
    throw new ErrorResponse("User not registered!", 404);
  } else {
    activityArray.splice(match, 1);
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { classesRegistered: activityArray },
    { new: true, populate: "classesRegistered" }
  );
  req.user = updatedUser;
  next();
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
    .json({...payload, activeMembership: user.activeMembership, firstName: user.firstName});
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

const getUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id)
    .populate("classesRegistered")
    .populate({
      path: "activeMembership",
      populate: { path: "plan", model: "MembershipPlan" },
    });
  res.json(user);
});

//Update single user from the admin page
const updateUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, phone, address, dateOfBirth, role } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, phone, address, dateOfBirth, role },
    { new: true }
  );
  res.json(user);
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if(!user) {
    throw new ErrorResponse("User not found", 404)
  } else {
    res.json({ message: 'User deleted successfully' });
  }
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
  cancelUserActivity,
  getUser,
  updateUser,
  deleteUser
};

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

//Gets One single user
const getUser = asyncWrapper(async (req, res, next) => {
  const { userid } = req.params;
  const user = await User.findById(userid).populate("classesRegistered");
  if (!user) {
    throw new ErrorResponse("Not found", 404);
  } else {
    res.json(user);
  }
});

//Gets all the users
//TODO don't return the passwords
const getUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = {
  createUser,
  getUser,
  getUsers,
};

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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

//User login
const login = asyncWrapper(async (req, res, next) => {
  const {email, password} = req.body

  const user = await User.findOne({email}).select("+password")

  if(!user) {
    throw new ErrorResponse("User does not exist!", 404)
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    throw new ErrorResponse("Incorrect Password!", 401)
  }

  const payload = {id: user._id, email: user.email}
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "480m"})

  res.cookie("access_token", token, {httpOnly: true, maxAge: 28800000}).json(payload)
})

//User logout
const logout = asyncWrapper(async (req, res, next) => {
  res.cookie("access_token", "", {httpOnly: true, maxAge: 0}).json({success: true})
})

//Display users profile after authentication
const getProfile = asyncWrapper(async (req, res, next) => {
  const {id} = req.user

  const user = await User.findById(id)
  res.json(user)
})

module.exports = {
  createUser,
  getUser,
  getUsers,
  login,
  logout,
  getProfile
};

const express = require("express");

const {
  createUser,
  // getUser,
  getUsers,
  login,
  logout,
  getProfile,
  updateProfile,
} = require("../controllers/users-controller.js");

const { 
  authenticate 
} = require("../middlewares/authentication.js");

const userRouter = express.Router();

userRouter.route("/signup").post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/users/profile").get(authenticate, getProfile).put(authenticate, updateProfile);
userRouter.route("/users").get(getUsers);

module.exports = userRouter;

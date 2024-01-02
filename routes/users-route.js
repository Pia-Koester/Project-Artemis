const express = require("express");

const {
  createUser,
  getUser,
  getUsers,
  login,
  logout,
  getProfile,
} = require("../controllers/users-controller.js");

const { 
  authenticate 
} = require("../middlewares/authentication.js");

const userRouter = express.Router();

userRouter.route("/signup").post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/profile").get(authenticate, getProfile);
userRouter.route("/users").get(getUsers);
userRouter.route("/users/:userid").get(getUser);

module.exports = userRouter;

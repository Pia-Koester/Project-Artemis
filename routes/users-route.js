const express = require("express");

const {
  createUser,
  getUser,
  getUsers,
} = require("../controllers/users-controller.js");

const userRouter = express.Router();

userRouter.route("/signup").post(createUser);
userRouter.route("/users").get(getUsers);
userRouter.route("/users/:userid").get(getUser);

module.exports = userRouter;

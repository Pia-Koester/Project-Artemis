const express = require("express");

const {
  createUser,
  getUsers,
  login,
  logout,
  getProfile,
  updateProfile,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users-controller.js");

const { 
  authenticate 
} = require("../middlewares/authentication.js");

const userRouter = express.Router();

userRouter.route("/signup").post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/users/profile").get(authenticate, getProfile).put(authenticate, updateProfile);
userRouter.route("/users").get(authenticate, getUsers);
userRouter.route("/users/:id").get(authenticate, getUser).delete(authenticate, deleteUser);
userRouter.route("/users/:id/update").post(authenticate, updateUser);

module.exports = userRouter;

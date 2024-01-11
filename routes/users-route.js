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

const { authenticate, authorize } = require("../middlewares/authentication.js");

const userRouter = express.Router();

userRouter.route("/signup").post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter
  .route("/users/profile")
  .get(authenticate, getProfile)
  .put(authenticate, updateProfile);
userRouter.route("/users").get(authenticate, authorize("admin"), getUsers);
userRouter
  .route("/users/:id")
  .get(authenticate, getUser)
  .delete(authenticate, authorize("admin"), deleteUser);
userRouter
  .route("/users/:id/update")
  .put(authenticate, authorize("admin"), updateUser);

module.exports = userRouter;

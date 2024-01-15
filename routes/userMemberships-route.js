const express = require("express");

const {
  createUserMembership,
  getUserMemberships,
  getUserMembership,
} = require("../controllers/userMemberships-controller.js");
const { setUserMembership } = require("../controllers/users-controller.js");
const { authenticate } = require("../middlewares/authentication.js");

const userMembershipRouter = express.Router();

userMembershipRouter
  .route("/")
  .post(authenticate, createUserMembership, setUserMembership)
  .get(getUserMemberships);
userMembershipRouter.route("/:membershipId").get(getUserMembership);

module.exports = userMembershipRouter;

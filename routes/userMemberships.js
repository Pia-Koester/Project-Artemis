const express = require("express");

const { createUserMembership } = require("../controllers/userMemberships.js");

const userMembershipRouter = express.Router();

userMembershipRouter.route("/").post(createUserMembership);

module.exports = userMembershipRouter;

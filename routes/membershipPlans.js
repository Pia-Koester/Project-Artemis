const express = require("express");

const { createMembershipPlan } = require("../controllers/membershipPlans.js");

const membershipPlanRouter = express.Router();

membershipPlanRouter.route("/").post(createMembershipPlan);

module.exports = membershipPlanRouter;

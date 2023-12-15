const express = require("express");

const {
  createMembershipPlan,
  getMembershipPlans,
  getMembershipPlan,
} = require("../controllers/membershipPlans-controller.js");

const membershipPlanRouter = express.Router();
membershipPlanRouter.get("/", getMembershipPlans); //gets all available memberships
membershipPlanRouter.post("/create", createMembershipPlan); //create new membership
membershipPlanRouter.get("/:id", getMembershipPlan); // gets one individual membership based on the _id

module.exports = membershipPlanRouter;

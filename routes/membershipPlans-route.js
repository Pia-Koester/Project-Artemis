const express = require("express");

const {
  createMembershipPlan,
  getMembershipPlans,
  getMembershipPlan,
  updateMembershipPlan,
} = require("../controllers/membershipPlans-controller.js");
const { authenticate } = require("../middlewares/authentication.js");

const membershipPlanRouter = express.Router();
membershipPlanRouter.get("/",authenticate, getMembershipPlans); //gets all available memberships
membershipPlanRouter.post("/create",authenticate, createMembershipPlan); //create new membership
membershipPlanRouter.get("/:id",authenticate, getMembershipPlan); // gets one individual membership based on the _id
membershipPlanRouter.put("/update/:id",authenticate, updateMembershipPlan); // updates one individual membership based on the _id

module.exports = membershipPlanRouter;

const express = require("express");

const {
  createMembershipPlan,
  getMembershipPlans,
  getMembershipPlan,
  updateMembershipPlan,
} = require("../controllers/membershipPlans-controller.js");
const { authenticate, authorize } = require("../middlewares/authentication.js");

const membershipPlanRouter = express.Router();
membershipPlanRouter.get("/", authenticate, getMembershipPlans); //gets all available memberships
membershipPlanRouter.post(
  "/create",
  authenticate,
  authorize("admin"),
  createMembershipPlan
); //create new membership
membershipPlanRouter.get("/:id", authenticate, getMembershipPlan); // gets one individual membership based on the _id
membershipPlanRouter.put(
  "/update/:id",
  authenticate,
  authorize("admin"),
  updateMembershipPlan
); // updates one individual membership based on the _id

module.exports = membershipPlanRouter;

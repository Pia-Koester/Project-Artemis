const express = require("express");

const {
  createMembershipPlan,
  getMembershipPlans,
  getMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
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
membershipPlanRouter
  .get("/:id", authenticate, getMembershipPlan)
   // .get gets one individual membership based on the _id
membershipPlanRouter.put(
  "/update/:id",
  authenticate,
  authorize("admin"),
  updateMembershipPlan
); // updates one individual membership based on the _id
membershipPlanRouter.delete("/delete/:id", authenticate, authorize("admin"), deleteMembershipPlan);
module.exports = membershipPlanRouter;

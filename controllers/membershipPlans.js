const MembershipPlan = require("../models/membershipPlans.js");

const createMembershipPlan = async (req, res) => {
  try {
    const { title, price, totalCredits } = req.body;
    const plan = await MembershipPlan.create({
      title,
      price,
      totalCredits,
    });
    res.status(201).json(plan);
  } catch (error) {
    console.log(error);
    res.status(500).send("For Fuck's sake..Dont Panic!!!");
  }
};

module.exports = {
  createMembershipPlan,
};

const MembershipPlan = require("../models/membershipPlans.js");

//create new membership plan (like 10er Karte, unlimited offer etc)
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

// get all the available memberships
const getMembershipPlans = async (req, res) => {
  try {
    const membershipplans = await MembershipPlan.find({});
    res.json(membershipplans);
  } catch (error) {
    console.log(error);
    res.status(500).send("Panic! At the disco??");
  }
};

// get one single membership using the _id from mongodb
const getMembershipPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await MembershipPlan.findById(id);
    res.json(plan);
  } catch (error) {
    console.log(error);
    res.status(500).send("Problem fetching this plan");
  }
};

module.exports = {
  createMembershipPlan,
  getMembershipPlans,
  getMembershipPlan,
};

const UserMembership = require("../models/userMemberships.js");

const createUserMembership = async (req, res) => {
  try {
    const { plan, user, expiryDate } = req.body;
    const userMembership = await UserMembership.create({
      plan,
      user,
      expiryDate,
    });
    res.status(201).json(userMembership);
  } catch (error) {
    console.log(error);
    res.status(500).send("Now panic!");
  }
};

module.exports = { createUserMembership };

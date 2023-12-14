const UserMembership = require("../models/userMemberships.js");

const getUserMemberships = async (req, res) => {
  try {
      const userMemberships = await UserMembership.find().populate("user").populate("plan")

      if(userMemberships.length === 0) {
        return res.status(404).send("No results found!")
      } else {
        res.status(200).json(userMemberships)
      }

  } catch (error) {
    console.log(error)
    res.status(500).send("Now panic!");
  }
}

const getUserMembership = async (req, res) => {
  try {
      const {membershipId} = req.params

      const userMembership = await UserMembership.find({_id: membershipId}).populate("user").populate("plan")

      if(userMembership.length === 0) {
        return res.status(404).send("No results found!")
      } else {
        res.status(200).json(userMembership)
      }

  } catch (error) {
    console.log(error)
    res.status(500).send("Now panic!");
  }
}

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

module.exports = { 
  getUserMemberships,
  getUserMembership,
  createUserMembership
 };

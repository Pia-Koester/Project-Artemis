const User = require("../models/users.js");

//create new user
const createUser = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const user = await User.create({ email, phone, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("why are you here?");
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).send("Not found");
    } else {
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("you fucked up big time");
  }
};
module.exports = {
  createUser,
  getUser,
};

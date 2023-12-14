const express = require("express");

const {createUser, getUser} = require("../controllers/users.js")

const userRouter = express.Router();

userRouter.route("/signup").post(createUser)
userRouter.route("/getuser/:userid").get(getUser)


module.exports = userRouter;
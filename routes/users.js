const express = require("express");

const {createUser, getUser, getUsers} = require("../controllers/users.js")

const userRouter = express.Router();

userRouter.route("/signup").post(createUser)
userRouter.route("/getuser/:userid").get(getUser)
userRouter.route("/users").get(getUsers)


module.exports = userRouter;
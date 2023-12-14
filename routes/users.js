const express = require("express");

const {createUser} = require("../controllers/users.js")

const userRouter = express.Router();

userRouter.route("/signup").post(createUser)



module.exports = userRouter;
const express = require("express");

const { createType } = require("../controllers/activityTypes-controller.js");
const { authenticate } = require("../middlewares/authentication.js");

const typeRouter = express.Router();

typeRouter.route("/").post(createType);

module.exports = typeRouter;

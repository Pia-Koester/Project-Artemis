const express = require("express");

const {
  createType,
  getTypes,
} = require("../controllers/activityTypes-controller.js");
const { authenticate } = require("../middlewares/authentication.js");
const upload = require("../middlewares/uploadImage.js");

const typeRouter = express.Router();

typeRouter.route("/").post(upload.array("images"), createType).get(getTypes);

module.exports = typeRouter;

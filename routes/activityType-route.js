const express = require("express");

const {
  createType,
  getTypes,
} = require("../controllers/activityTypes-controller.js");
const { authenticate, authorize } = require("../middlewares/authentication.js");
// const upload = require("../middlewares/uploadmultipleImages.js");

const uploadMultiple = require("../middlewares/uploadmultipleImages.js");

const typeRouter = express.Router();

typeRouter
  .post("/", authenticate, authorize("admin"), uploadMultiple, createType)
  .get(getTypes);

module.exports = typeRouter;

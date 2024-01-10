const express = require("express");

const {
  createType,
  getTypes,
} = require("../controllers/activityTypes-controller.js");
const { authenticate } = require("../middlewares/authentication.js");
// const upload = require("../middlewares/uploadmultipleImages.js");
const multer = require("multer");
const upload = multer({ dest: "../uploads/" });

const typeRouter = express.Router();

typeRouter.post("/", upload.array("images"), createType);

module.exports = typeRouter;

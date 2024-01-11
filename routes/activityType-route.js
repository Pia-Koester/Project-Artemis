const express = require("express");

const {
  createType,
  getTypes,
  updateTypes,
} = require("../controllers/activityTypes-controller.js");
const { authenticate, authorize } = require("../middlewares/authentication.js");
// const upload = require("../middlewares/uploadmultipleImages.js");

const uploadMultiple = require("../middlewares/uploadmultipleImages.js");

const typeRouter = express.Router();

typeRouter
  .route("/")
  .post(authenticate, authorize("admin"), uploadMultiple, createType)
  .get(getTypes);

typeRouter
  .route("/:id/update")
  .patch(authenticate, authorize("admin"), updateTypes);

module.exports = typeRouter;

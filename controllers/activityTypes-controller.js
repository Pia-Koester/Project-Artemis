const ActivityType = require("../models/activityTypes-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

const createType = asyncWrapper(async (req, res, next) => {
  const { type, images } = req.body;
  const firstImage = images[0]; // Access the first image in the array
  const { url, publicId, alt } = firstImage; // Destructure the properties from the first image
  console.log(url);
  const activitytype = await ActivityType.create({ type, images });
  res.status(201).json(activitytype);
});

module.exports = { createType };

const ActivityType = require("../models/activityTypes-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const cloudinary = require("cloudinary").v2;

const createType = asyncWrapper(async (req, res, next) => {
  const { type } = req.body;
  const fileurl = req.file.path;
  const publicId = req.file.filename;
  const image = { url: fileurl, publicId, alt: "a group cycling on the road" };

  const activitytype = await ActivityType.create({ type, images: [image] });
  res.status(201).json(activitytype);
});

const getTypes = asyncWrapper(async (req, res, next) => {
  const activitytype = await ActivityType.find({});
  res.json(activitytype);
});

module.exports = { createType, getTypes };

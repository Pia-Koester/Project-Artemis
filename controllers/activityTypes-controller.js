const ActivityType = require("../models/activityTypes-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const cloudinary = require("cloudinary").v2;

const createType = asyncWrapper(async (req, res, next) => {
  const { type } = req.body;

  const { uploadedImages } = req;
  const imagesData = uploadedImages.map((image) => ({
    url: image.url,
    publicId: image.public_id,
  }));
  const newActivityType = await ActivityType.create({
    type: type.toLowerCase(),
    images: imagesData,
  });

  res.status(201).json(newActivityType);
});

const getTypes = asyncWrapper(async (req, res, next) => {
  const activitytype = await ActivityType.find({});
  res.json(activitytype);
});

const updateTypes = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { type } = req.body;
  const updatedType = await ActivityType.findByIdAndUpdate(
    id,
    { type },
    { new: true }
  );
  res.json(updatedType);
});

const deleteType = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const type = await ActivityType.findByIdAndDelete(
    id,
  );
  res.json(type);
});

module.exports = { createType, getTypes, updateTypes, deleteType };

const { Item } = require("../models");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../utils/asyncHandler");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary").v2;

exports.getItems = asyncHandler(async (req, res, next) => {
  const resultsPerPage = 5;
  const itemCount = await Item.countDocuments();
  const apiFeatures = new ApiFeatures(Item.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const allItem = await apiFeatures.query.sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    allItem,
    itemCount,
  });
});

exports.createItem = asyncHandler(async (req, res, next) => {
  const cloud = await cloudinary.uploader.upload(req.body.image, {
    folder: "items",
    overwrite: true,
    invalidate: true,
    width: 400,
    crop: "scale",
  });
  req.body.user = req.user.id;

  const item = await Item.create({
    ...req.body,
    image: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    item,
  });
});

exports.getSingleItem = asyncHandler(async (req, res, next) => {
  const singleItem = await Item.findById(req.params.id);
  if (!singleItem) {
    return next(new ErrorHandler("Item not found.", 404));
  }

  res.status(200).json({
    success: true,
    singleItem,
  });
});

exports.updateItem = asyncHandler(async (req, res, next) => {
  
  const cloud = await cloudinary.uploader.upload(req.body.image, {
    folder: "items",
    overwrite: true,
    invalidate: true,
    width: 400,
    crop: "scale",
  });

  let item = await Item.findById(req.params.id);

  if (!item) {
    return next(new ErrorHandler("Item not found.", 404));
  }

  product = await Item.findByIdAndUpdate(req.params.id, {
    ...req.body,
    image: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    item,
  });
});

exports.deleteItem = asyncHandler(async (req, res, next) => {
  let item = await Item.findById(req.params.id);

  if (!item) {
    return next(new ErrorHandler("Item not found.", 404));
  }

  await item.remove();

  res.status(200).json({
    success: true,
    message: "Item deleted successfully.",
  });
});

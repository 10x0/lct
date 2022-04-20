const dotenv = require("dotenv");
dotenv.config();
const asyncHandler = require("../utils/asyncHandler");
const { User, Order } = require("../models");
const ApiFeatures = require("../utils/apiFeatures");
const jwt = require("jsonwebtoken");

exports.getOrders = asyncHandler(async (req, res, next) => {
  const resultsPerPage = 5;
  const ordersCount = await Order.countDocuments();
  const apiFeatures = new ApiFeatures(Order.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const allOrders = await apiFeatures.query.sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    allOrders,
    ordersCount,
  });
});

exports.createOrder = asyncHandler(async (req, res, next) => {
  let { checkout, total } = req.body;

  await Order.create({
    customer: req.user.email,
    items: checkout,
    total,
  });

  res.status(200).json({
    success: true,
    message: "Order created succesfully.",
  });

});

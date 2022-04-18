const dotenv = require("dotenv");
dotenv.config();
const asyncHandler = require("../utils/asyncHandler");
const { User, Order } = require("../models");
const ApiFeatures = require("../utils/apiFeatures");
const axios = require('axios');

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
  let { checkout, token, total } = req.body;

  let data = {
    token,
    "amount": total
  };

  let config = {
    headers: { 'Authorization': 'Key ' + process.env.KHALTI_SECRET_KEY }
  };

  // KHALTI
  axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });

  const user = await User.findOne({ email: token.email }).select("+password");
  if (!user) return next(new ErrorHandler("User not found.", 401));

  await Order.create({
    user,
    items: checkout,
    total,
  });

  res.status(200).json({
    success: true,
    message: "Order created succesfully.",
  });
});

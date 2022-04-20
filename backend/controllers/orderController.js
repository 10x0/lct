const dotenv = require("dotenv");
dotenv.config();
const asyncHandler = require("../utils/asyncHandler");
const { Order } = require("../models");
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
  
  let { checkout, total, token } = req.body;

  let data = {
     token,
      "amount": 1000
  };

  let config = {
      headers: {'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`}
  };

  let response = await axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
  
  await Order.create({
    customer: response.data.user.name,
    items: checkout,
    total,
  });


  res.status(200).json({
    success: true,
    message: "Order created succesfully.",
  });

});

exports.deliverOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found.", 404));
  }

  await Order.findByIdAndUpdate(req.params.id, {
    delivered: !order.delivered,
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Order updated succesfully.",
  });

});

const dotenv = require("dotenv");
dotenv.config();
const asyncHandler = require("../utils/asyncHandler");
const { Booking } = require("../models");
const ApiFeatures = require("../utils/apiFeatures");

exports.getBookings = asyncHandler(async (req, res, next) => {
    const resultsPerPage = 5;
    const bookingsCount = await Booking.countDocuments();
    const apiFeatures = new ApiFeatures(Booking.find(), req.query)
        .search()
        .filter()
        .pagination(resultsPerPage);
    const allBookings = await apiFeatures.query.sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        allBookings,
        bookingsCount,
    });
});

exports.createBooking = asyncHandler(async (req, res, next) => {
    let { seats, date,time, duration, contact } = req.body;

    await Booking.create({
        seats,
        date,
        time,
        duration,
        contact
    });

    res.status(200).json({
        success: true,
        message: "Table booked succesfully.",
    });
});

exports.deleteBooking = asyncHandler(async (req, res, next) => {
    let booking = await Booking.findById(req.params.id);
  
    if (!booking) {
      return next(new ErrorHandler("Booking not found.", 404));
    }
  
    await booking.remove();
  
    res.status(200).json({
      success: true,
      message: "Booking removed successfully.",
    });
  });

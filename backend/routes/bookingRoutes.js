const express = require("express");
const { getBookings, createBooking } = require("../controllers/bookingController");
const { authenticated, authorized } = require("../middlewares/authMiddleware");

const router = express.Router();

router
    .route("/getAllBookings")
    .get(authenticated, authorized("admin"), getBookings);
router.route("/createBooking").post(createBooking);

module.exports = router;

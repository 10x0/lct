const express = require("express");
const { getBookings, createBooking, deleteBooking } = require("../controllers/bookingController");
const { authenticated, authorized } = require("../middlewares/authMiddleware");

const router = express.Router();

router
    .route("/getAllBookings")
    .get(authenticated, authorized("admin"), getBookings);
router.route("/createBooking").post(createBooking);
router.route("/deleteBooking/:id").delete(authenticated, authorized("admin"), deleteBooking);

module.exports = router;

const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const { authenticated, authorized } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/getAllOrders")
  .get(authenticated, authorized("admin"), getOrders);
router.route("/createOrder").post(authenticated, createOrder);

module.exports = router;

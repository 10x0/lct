const express = require("express");
const { createOrder, getOrders, deliverOrder } = require("../controllers/orderController");
const { authenticated, authorized } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/getAllOrders")
  .get(authenticated, authorized("admin"), getOrders);
router.route("/deliverOrder/:id").put(authenticated, authorized("admin"), deliverOrder);
router.route("/createOrder").post(createOrder);

module.exports = router;

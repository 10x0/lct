const express = require("express");
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getSingleItem,
} = require("../controllers/itemController");
const { authenticated, authorized } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/allItems").get(getItems);
router.route("/item/:id").get(getSingleItem);

router
  .route("/admin/item/new")
  .post(authenticated, authorized("admin"), createItem);
router
  .route("/admin/item/:id")
  .put(authenticated, authorized("admin"), updateItem)
  .delete(authenticated, authorized("admin"), deleteItem);

module.exports = router;

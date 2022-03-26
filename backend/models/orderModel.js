const mongoose = require("mongoose");
const itemModel = require("./itemModel");
const userModel = require("./userModel");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: userModel.schema,
      required: true,
    },
    items: {
      type: [itemModel.schema],
    },
    total: {
      type: Number,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);

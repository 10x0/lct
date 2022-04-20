const mongoose = require("mongoose");
const itemModel = require("./itemModel");

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: String,
      unique: false,
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

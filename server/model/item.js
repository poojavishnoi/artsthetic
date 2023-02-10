const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const itemSchema = new mongoose.Schema({
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  item_picture: { type: String },
  addedBy: { type: ObjectId, ref: "User" },
  size: { type: String },
  type: { type: String, required: true },
  art: { type: ObjectId, ref: "Post" },
  ordered: { type: Boolean, default: false },
});

mongoose.model("Item", itemSchema);

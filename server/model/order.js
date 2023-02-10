const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [{ type: String, required: true }],
  art: { type: String, required: true },
  artist: { type: ObjectId, ref: "User" },
});

mongoose.model("Order", orderSchema);

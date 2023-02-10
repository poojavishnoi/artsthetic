const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: Number },
  general: { type: String },
  pincode: { type: Number },
  city: { type: String },
  profilepic: {
    type: String,
    default:
      "https://res.cloudinary.com/somcloud/image/upload/v1633720517/profile_j6slhg.png",
  },
  order: { type: Number, default: 0 },
});

mongoose.model("User", userSchema);

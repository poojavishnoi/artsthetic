const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");
const e = require("express");

//Update profile pic
router.put("/artist/profile", requireLogin, (req, res) => {
  const { firstname, lastname, email, profilepic } = req.body;
  if (email === "" || firstname === "" || lastname === "") {
    return res
      .status(422)
      .json({ error: "Please enter all the required fields" });
  }

  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        profilepic: req.body.profilepic,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "update unsuccesful" });
      }
      res.json(result);
      console.log("pic");
    }
  );
});

router.put("/updateuserdetails", requireLogin, (req, res) => {
  const {
    firstname,
    lastname,
    email,
    profilepic,
    general,
    city,
    pincode,
    phone,
    order,
  } = req.body;
  if (email === "" || firstname === "" || lastname === "") {
    return res
      .status(422)
      .json({ error: "Please enter all the required fields" });
  }

  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        general: req.body.general,
        pincode: req.body.pincode,
        city: req.body.city,
        profilepic: req.body.profilepic,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        order: req.body.order,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "update unsuccesful" });
      }
      res.json(result);
      console.log("pic");
    }
  );
});
module.exports = router;

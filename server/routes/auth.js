const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

//User Register
router.post("/signup", (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  if (!email || !password || !firstname) {
    return res
      .status(422)
      .json({ error: "Please enter all the required fields." });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "An user already exists with that email-id." });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          firstname,
          lastname,
          role,
        });

        user
          .save()
          .then((user) => {
            // transporter.sendMail({
            //     to:user.email,
            //     from:"no-reply@insta.com",
            //     subject:"signup success",
            //     html:"<h1>welcome to instagram</h1>"
            // })
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//User Login
router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please enter all the required fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email/password." });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //return res.json({ message: "Successfully Logged In" });

          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const {
            _id,
            firstname,
            lastname,
            email,
            role,
            order,
            profilepic,
            phone,
            general,
            pincode,
            city,
          } = savedUser;
          res.json({
            token,
            user: {
              _id,
              firstname,
              lastname,
              email,
              role,
              order,
              profilepic,
              phone,
              general,
              pincode,
              city,
            },
          });
        } else {
          return res.status(422).json({ error: "Incorrect email/password." });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;

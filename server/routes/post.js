const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

//Use this as the home page for the user once logged in
router.get("/home", (req, res) => {
  Post.find()
    .populate("artist", "_id firstname lastname")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//For artist to upload art
router.post("/artist/upload", requireLogin, (req, res) => {
  const { art, tags, title } = req.body;
  if (!art || !tags || !title) {
    return res
      .status(422)
      .json({ error: "Please enter all the required fields" });
  }
  req.user.password = undefined;
  const post = new Post({ art, artist: req.user, tags, title });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//For art by particular artist(viewable by artist only)
router.get("/artist", requireLogin, (req, res) => {
  Post.find({ artist: req.user._id })
    .populate("artist", "_id name")
    .then((myart) => {
      res.json({ myart });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

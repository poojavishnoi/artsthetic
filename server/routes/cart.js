const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Item = mongoose.model("Item");

//add or increase quantity of items
router.post("/createitem", requireLogin, (req, res) => {
  const { type, size, price, quantity, addedBy, art, item_picture } = req.body;
  Item.findOne({ addedBy: req.user._id, size: size, type: type, art: art })
    .then((saveditem) => {
      if (saveditem) {
        Item.findOneAndUpdate(
          { addedBy: req.user._id, type: type, size: size, art: art },
          { $inc: { quantity: 1 } },
          { new: true },
          (err, result) => {
            if (err) {
              return res.status(422).json({ error: "update unsuccesful" });
            }
            console.log("quantity");
            res.json(result);
          }
        );
      } else {
        const item = new Item({
          type,
          size,
          price,
          art,
          item_picture,
          addedBy: req.user._id,
        });
        item.save().then((result) => {
          res.json({ item: result });
          console.log(result);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//show items in cart
router.get("/myitem", requireLogin, (req, res) => {
  Item.find({ addedBy: req.user._id, quantity: { $gte: 1 } })

    .populate("addedBy")
    .then((myitem) => {
      res.json({ myitem });
      console.log("get");
    })
    .catch((err) => {
      console.log(err);
    });
});

//increment
router.put("/increment", requireLogin, (req, res) => {
  Item.findByIdAndUpdate(
    req.body.cartId,
    { $inc: { quantity: +1 } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      console.log("+");
      res.json(result);
    }
  });
});

//decrement
router.put("/decrement", (req, res) => {
  const { type, size, price, quantity, addedBy, art } = req.body;
  Item.findByIdAndUpdate(
    req.body.cartId,
    { $inc: { quantity: -1 } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      console.log("-");
      res.json(result);
    }
  });
});

module.exports = router;

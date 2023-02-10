import "./Cart.css";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartitem, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const artworkdata = JSON.parse(localStorage.getItem("artworkdata"));

  useEffect(() => {
    setLoading(true);
    fetch("/myitem", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setItems(result.myitem);
        console.log(cartitem.price);
        console.log(cartitem.quantity);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Data is loading...</p>;
  }

  const increment = (id) => {
    fetch("/increment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        cartId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newItem = cartitem.map((iem) => {
          if (iem._id == result._id) {
            return result;
          } else {
            return iem;
          }
        });
        setItems(newItem);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const decrement = (id) => {
    fetch("/decrement", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        cartId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newItem = cartitem.map((iem) => {
          if (iem._id == result._id) {
            return result;
          } else {
            return iem;
          }
        });
        setItems(newItem);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalPrice = cartitem.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  return (
    <div className="bc">
      <div className="cart-items">
        <h2 className="cart-items-header">Cart Items</h2>
        {cartitem.length === 0 && (
          <div className="cart-items-empty"> No items are added.</div>
        )}
        <div>
          {cartitem.map((item) => (
            <div key={item._id} className="cart-items-list">
              <img
                className="cart-items-image"
                src={item.item_picture}
                alt={item.type}
              />

              <div className="cart-items-name">
                {item.type} {item.size}
              </div>
              <div className="cart-items-function">
                <button
                  className="cart-items-add"
                  onClick={() => increment(item._id)}
                >
                  +
                </button>
                <button
                  className="cart-items-remove"
                  onClick={() => decrement(item._id)}
                >
                  -
                </button>
              </div>
              <div className="cart-items-price">
                {item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-items-total-price-name2">
          Total price:
          <div className="cart-items-total-price2">₹{totalPrice}</div>
          <div className="buy-now">
            {userdata.role == "user" && (
              <Link to="/payment">
                <button className="buy-now-button">Buy now!</button>
              </Link>
            )}
            {userdata.role == "artist" && (
              <Link to="/artist/payment">
                <button className="buy-now-button">Buy now!</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

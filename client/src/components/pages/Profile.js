import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";
import M from "materialize-css";

export default function Profile() {
  const [image, setImage] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [url, setUrl] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [cartitem, setItems] = useState([]);

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

  const totalPrice = cartitem.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  useEffect(() => {
    if (url) {
      fetch("/artist/profile", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          profilepic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            M.toast({
              html: "Changes will reflect next time you sign in.",
              classes: "#2e7d32 green darken-3",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (!firstname === "" || !lastname === "" || !email === "") {
        updateFields();
      }
    }
  }, [url]);

  const Uploadpfp = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "sompfp");
    data.append("cloud_name", "somcloud");
    fetch("https://api.cloudinary.com/v1_1/somcloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
      })
      .catch((err) => {
        console.log(data.url);
      });
  };

  const updateFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      //     M.toast({
      //   html: "Invalid Email format.",
      //   classes: "#c62828 red darken-3",
      // });
      return;
    }
    fetch("/artist/profile", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({
            html: "Successfully Updated!",
            classes: "#2e7d32 green darken-3",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = () => {
    if (image) {
      Uploadpfp();
    } else {
      updateFields();
    }
    toggleDisable(
      "Profile-name-first",
      "Profile-name-last",
      "Profile-Email-dis"
    );
  };

  function toggleEnable(el1, el2, el3) {
    var textb = document.getElementById(el1);
    var textbo = document.getElementById(el2);
    var textbox = document.getElementById(el3);

    if (textb.disabled || textbo.disabled || textbox.disabled) {
      document.getElementById(el1).disabled = false;
      document.getElementById(el2).disabled = false;
      document.getElementById(el3).disabled = false;
    }
  }

  function toggleDisable(el1, el2, el3) {
    var textb = document.getElementById(el1);
    var textbo = document.getElementById(el2);
    var textbox = document.getElementById(el3);

    if (!textb.disabled || !textbo.disabled || !textbox.disabled) {
      document.getElementById(el1).disabled = true;
      document.getElementById(el2).disabled = true;
      document.getElementById(el3).disabled = true;
    }
  }

  return (
    <div className="bck">
      <div className="Profile">
        <h2 className="Profile-header">Your Profile</h2>

        <div>
          <div className="Profile-list">
            <div className="Profile-pic">
              <img src={userdata.profilepic} alt="profile"></img>
            </div>

            <div className="Profile-details">
              <div className="Profile-name">
                <h2 className="detail-title">Your Name:</h2>
                <input
                  id="Profile-name-first"
                  type="text"
                  defaultValue={userdata.firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled
                />
                <input
                  id="Profile-name-last"
                  type="text"
                  defaultValue={userdata.lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled
                />
              </div>
              <div className="Profile-Email">
                <h2 className="detail-title">Your Email:</h2>
                <input
                  id="Profile-Email-dis"
                  type="email"
                  defaultValue={userdata.email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>
              <div className="Profile-U">
                <div className="CPFP">
                  <span>Change Profile Picture </span>

                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="pain"
                    type="file"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Profile-Buttons">
          <div className="Profile-Edit">
            <button
              id="Bdit"
              onClick={() =>
                toggleEnable(
                  "Profile-name-first",
                  "Profile-name-last",
                  "Profile-Email-dis"
                )
              }
            >
              Edit Profile
            </button>
          </div>
          <div className="Profile-Delete">
            <button
              id="Belete"
              // onClick={() =>toggleDisable('Profile-name-first','Profile-name-last','Profile-Email-dis')}
              onClick={() => PostData()}
            >
              Save Changes
            </button>
          </div>
        </div>
        {userdata.order === null && (
          <div className="Orders-None">
            <div className="No-Orders">No Orders Placed currently</div>
          </div>
        )}

        <div className="Orders">
          {!userdata.order == 0 && (
            <div className="Placed">
              <h4 className="Summary">Summary:</h4>
              <div className="Address1">
                <ul className="Address-text1">Address:</ul>
                <ul className="Address-dis">
                  {userdata.general} {userdata.city} {userdata.pincode}
                </ul>
              </div>
              <div className="Phone1">
                <ul className="Phone-text1">Phone:</ul>
                <ul className="Phone-dis">{userdata.phone}</ul>
              </div>
              <div className="Items">
                {cartitem.map((item) => (
                  <div key={item._id} className="cart-items-list">
                    <div className="cart-item-preview">
                      <img
                        className="cart-items-image"
                        src={item.item_picture}
                        alt={item.type}
                      />
                    </div>
                    <div className="cart-items-preview-name">
                      {item.type} {item.size}
                    </div>
                    <div className="cart-items-preview-price">
                      {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
              <div className="Status">
                <ul className="Status-text">Delivery:</ul>
                <ul className="Status-dis"></ul>
                <ul className="Arriving">Arriving in Five Business days</ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

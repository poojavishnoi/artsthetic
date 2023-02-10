import React, { state, useState, useEffect } from "react";
import "./Tshirtinfo.css";
import * as htmltoimage from "html-to-image";
import { Link, useHistory } from "react-router-dom";
import html2canvas from "html2canvas";

const Tshirtinfo = (props) => {
  const type = "Tshirt";
  const price = 599;
  const history = useHistory();
  const [size, setSize] = useState("small");
  const [imageurl, setimageurl] = useState("");
  const [carturl, setcartUrl] = useState("");
  const artworkdata = JSON.parse(localStorage.getItem("artworkdata"));

  //Make image out of div
  useEffect(() => {
    const divElement = props.ref_div.current;
    console.log(divElement);
    window.scroll(0, 0);
    html2canvas(divElement)
      .then(function (canvas) {
        console.log(canvas.toDataURL("image/jpeg", 0.9));
      })
      .catch(function (err) {
        console.error(err);
      });

    if (carturl) {
      fetch("/createitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          type,
          size,
          price,
          art: artworkdata._id,
          item_picture: carturl,
        }),
      })
        .then(() => {
          console.log("Data has been sent to the server");
        })
        .catch((err) => {
          console.log("Internal server error: ", err);
        });
      alert("Item has been added to cart");
    }
  }, [carturl]);

  //Upload made image on Cloudinary
  const postDetails = () => {
    const data = new FormData();
    data.append("file", imageurl);
    data.append("upload_preset", "artsthetic");
    data.append("cloud_name", "poojavishnoi");
    if (imageurl) {
      fetch(" https://api.cloudinary.com/v1_1/poojavishnoi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setcartUrl(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(carturl);
  };

  function handleChange(e) {
    setSize(e.target.value);
  }

  //Database
  /*const submitDetails = () => {
    postDetails();
    
  };*/

  return (
    <div className="tshirt-info-container">
      <form>
        <h3 className="art-titlestyle">{artworkdata.title} Art Tshirt</h3>
        <label for="size">Size:</label>

        <select name="Size" id="size" value={size} onChange={handleChange}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">large</option>
        </select>
        <br />
        <label>Price: 599/-</label>

        <button onClick={() => postDetails()} type="button" className="addcrt">
          Add to Cart
        </button>
      </form>
      <br />
      <label>Delivery Options:</label>
      <br />
      <small>Pay on delivery is available</small>
      <br />
      <small>Easy 7 days returns and exchanges</small>
      <br />
      <br />

      <label>Product Details:</label>
      <br />
      <small>100% Cotton</small>
      <br />
      <small>Round neck, Regular fit.</small>
    </div>
  );
};

export default Tshirtinfo;

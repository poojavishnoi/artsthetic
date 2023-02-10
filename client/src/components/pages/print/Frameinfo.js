import React, { useState, useEffect } from "react";
import "./Tshirtinfo.css";
import * as htmltoimage from "html-to-image";
import { useHistory } from "react-router-dom";

const Frameinfo = (props) => {
  const type = "Frame";
  const price = 249;
  const history = useHistory();
  const [size, setSize] = useState("small");
  const [imageurl, setimageurl] = useState("");
  const [carturl, setcartUrl] = useState("");
  const artworkdata = JSON.parse(localStorage.getItem("artworkdata"));

  //Make image out of div
  useEffect(() => {
    if (artworkdata) {
      const divElement = props.ref_div.current;
      console.log(divElement);
      htmltoimage
        .toPng(divElement)
        .then(function (dataUrl3) {
          // var img = new Image();
          // img.src = dataUrl3;
          setimageurl(dataUrl3);
          console.log(dataUrl3);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    }
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
  return (
    <div className="frame-info-container">
      <h3 className="art-titlestyle">{artworkdata.title} Art Frame</h3>
      <label for="size">Onesize</label>

      <br />
      <label>Price: 249/-</label>
      <br />
      <br />
      <label>Delivery Options:</label>
      <br />
      <small>Pay on delivery is available</small>
      <br />
      <small>Easy 7 days returns and exchanges</small>
      <br />
      <br />

      <button onClick={() => postDetails()} type="button" className="addcrt">
        Add to Cart
      </button>
    </div>
  );
};

export default Frameinfo;

import React, { useRef } from "react";
import "./tshirt.css";
import { Link } from "react-router-dom";
import Tshirtinfo from "./Tshirtinfo";

const Tshirt = (props) => {
  const node = useRef();
  const artworkdata = JSON.parse(localStorage.getItem("artworkdata"));

  return (
    <div className="tshirt-container">
      <div className="tshirt-image-container" >
        <div className="shitcontainer" ref={node}>
          <img src="https://res.cloudinary.com/poojavishnoi/image/upload/v1633884218/artsthetic/black_ytsl1v.png" />
          <div  className="artwork">
            <img src={artworkdata.art}/>
            </div>
        </div>
      </div>

      <Tshirtinfo ref_div={node} />
    </div>
  );
};

export default Tshirt;

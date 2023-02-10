import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./hoodie.css";
import Hoodieinfo from "./Hoodieinfo";

const Hoodie = () => {
  const node2 = useRef();
  const artworkdata = JSON.parse(localStorage.getItem("artworkdata"));

  return (
    <div className="hoodie-container">
      <div className="hoodie-image-container">
        <div className="hoodieimage"  ref={node2}>
          <img src="https://res.cloudinary.com/poojavishnoi/image/upload/v1633884218/artsthetic/hoodie_xpac8b.png" />
          <div className="artwork">
            <img src={artworkdata.art} />
          </div>
        </div>
      </div>
      <Hoodieinfo ref_div={node2} />
    </div>
  );
};

export default Hoodie;

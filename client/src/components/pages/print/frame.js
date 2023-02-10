import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./frame.css";
import Frameinfo from "./Frameinfo";
const Frame = () => {
  const node = useRef();
  const artworkdata = JSON.parse(localStorage.getItem("artworkdata"));

  return (
    <div id="frame-container">
      <div className="frame-image" >
        <div className="frame-image-container" ref={node}>
          <img src="https://res.cloudinary.com/poojavishnoi/image/upload/v1633884239/artsthetic/vframe_mjo85j.png" />
          <div className="artwork">
            <img src={artworkdata.art} />
          </div>
        </div>
      </div>
      <Frameinfo ref_div={node} />
    </div>
  );
};

export default Frame;

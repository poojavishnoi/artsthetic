import React, { useState } from "react";
import "./Art.css";
import Tshirt from "./print/tshirt";
import Hoodie from "./print/hoodie";
import Frame from "./print/frame";
import Hoodieinfo from "./print/Hoodieinfo";
import Frameinfo from "./print/Frameinfo";
import { useLocation } from "react-router-dom";

const Art = () => {
  const artworkdata = useLocation();
  console.log(artworkdata.state);
  localStorage.setItem("artworkdata", JSON.stringify(artworkdata.state));
  return (
    <div className="backgound-container">
      <div className="art">
        <div className="art-container">
          <div className="container">
            <Tshirt />
          </div>
        </div>

        <div className="art-container">
          <div className="container">
            <Hoodie />
          </div>
        </div>

        <div className="art-container">
          <div className="container">
            <Frame />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Art;

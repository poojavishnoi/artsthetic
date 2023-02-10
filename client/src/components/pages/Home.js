import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, useLocation } from "react-router-dom";
//import Axios from "axios";

const Home = () => {
  //Retrieve All Artwork from Database
  const userdata = JSON.parse(localStorage.getItem("user"));
  console.log(userdata);
  const [artdata, setArtData] = useState([]);
  console.log(artdata);
  useEffect(() => {
    fetch("/home", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setArtData(result.posts);
      });
  }, []);

  return (
    <>
      <div id="background-container">
        <div className="filter"></div>
        <div className="image-masonry">
          <div className="masonry">
            {artdata
              .slice(0)
              .reverse()
              .map((item) => (
                <div className="switch" key={item.id}>
                  <div className="mItem">
                    {userdata.role == "user" && (
                      <Link to={{ pathname: "/art", state: item }}>
                        <img src={item.art} alt={item.title} loading="lazy" />
                      </Link>
                    )}
                    {userdata.role == "artist" && (
                      <Link to={{ pathname: "/artist/art", state: item }}>
                        <img src={item.art} alt={item.title} loading="lazy" />
                      </Link>
                    )}
                  </div>
                  <div className=" overlay">
                    <p className="art-work">{item.title}</p>
                    <p className="art-artist">
                      {item.artist.firstname} {item.artist.lastname}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

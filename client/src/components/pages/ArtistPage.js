import React, { useEffect, useState } from "react";
import "./ArtistPage.css";
import { Link, useLocation } from "react-router-dom";

const ArtistPage = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  console.log(userdata);
  const [myart, setArt] = useState([]);
  useEffect(() => {
    fetch("/artist", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setArt(result.myart);
      });
  }, []);

  return (
    <>
      <div id="background-container">
        <div className="profile-container">
          <div className="info-container">
            <div className="profile-pic">
              <img src={userdata.profilepic} alt="profile"></img>
            </div>
            <div className="details">
              <h3 className="name-text">
                {userdata.firstname} {userdata.lastname}{" "}
              </h3>
              <h5 className="analytics-text"> {myart.length} Posts</h5>

              <div className="profile-buttons">
                <Link to="/artist/upload">
                  <button id="Add">Add Post</button>
                </Link>

                <Link to="/artist/profile">
                  <button id="Edit">Edit Profile</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="post-container">
            <div className="masonry">
              {myart
                .slice(0)
                .reverse()
                .map((item) => (
                  <div className="switch" key={item.id}>
                    <div className="mItem">
                      <Link to={{ pathname: "/art", state: item }}>
                        <img src={item.art} alt={item.title} loading="lazy" />
                      </Link>
                    </div>
                    <div className=" overlay">
                      <p className="artist-details">
                        {item.title} {item.artist.firstname}{" "}
                        {item.artist.lastname}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistPage;

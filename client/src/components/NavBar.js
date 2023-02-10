import "./NavBar.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
const NavBar = () => {
  //Retrieve All Artwork from Database
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [artdata, setArtData] = useState([]);
  //console.log(artdata);
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
  const searchTags = () => {
    var search_input = document
      .getElementById("searchbarinput")
      .value.toString()
      .toLowerCase();
    console.log(search_input);
    var search_results = artdata.filter((obj) => {
      obj.tags = obj.tags.filter((el) => el === search_input);
      return obj.tags.length > 0; // Technically just `return obj.list.length;` would work; I prefer the clarity of the comparison
    });
    console.log(search_results);
    localStorage.setItem("searchresults", JSON.stringify(search_results));
    localStorage.setItem("searchinput", JSON.stringify(search_input));
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/home" className="brand-logo center">
          ArtsthetiC
        </Link>
        <div className="profile-dropdown">
          <Link to="#!" className="brand-logo">
            <img
              src={userdata.profilepic}
              className="material-icons-left"
              alt="profile"
              border="0"
            />
            <div className="content">
              <Link to="/profile">My Profile</Link>

              <Link to="/">Signout</Link>
            </div>
          </Link>
        </div>
        <ul className="right">
          <li>
            <Link to="/searchresults">
              <img
                src="https://i.ibb.co/hsSn3wg/search.png"
                className="material-icons search-icon"
                alt="search"
                border="0"
                onClick={() => searchTags()}
              />
            </Link>
            <li className="search-container">
              <input
                id="searchbarinput"
                required="true"
                type="text"
                placeholder="Search"
              />
            </li>
          </li>

          <li>
            <Link to="/cart">
              <img
                src="https://i.ibb.co/G3tPrry/cart.png"
                className="material-icons"
                alt="cart"
                border="0"
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, useLocation } from "react-router-dom";
//import Axios from "axios";

const Search = () => {
  const search_results = JSON.parse(localStorage.getItem("searchresults"));
  const search_input = JSON.parse(localStorage.getItem("searchinput"));
  return (
    <>
      <div id="background-container">
        <div className="filter"></div>
        <div className="image-masonry">
          <h1 className="search-noti"> Search Results for "{search_input}"</h1>
          <div className="masonry">
            {search_results
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

export default Search;

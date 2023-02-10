import React, { useState, useEffect } from "react";
import "./ArtistUpload.css";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const ArtistUpload = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (url) {
      fetch("/artist/upload", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          tags,
          art: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            M.toast({
              html: "Successfully Uploaded.",
              classes: "#2e7d32 green darken-3",
            });
            history.push("/artist/page");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } // eslint-disable-next-line
  }, [url]);
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "artsthetic");
    data.append("cloud_name", "abhinavsroy");
    fetch("https://api.cloudinary.com/v1_1/abhinavsroy/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(title);
    console.log(tags);
  };

  return (
    <>
      <div className="background">
        <div
          className="card input-filled"
          style={{
            margin: "50px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 className="heading-upload">
            "Art is never finished, only abandoned"
          </h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(","))}
            placeholder="Enter tags like : tag1,tag2.."
          />
          <div className="file-field input-field">
            <div className="btn">
              <span id="upload-btn">Upload Image</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button id="Submit" onClick={() => postDetails()}>
            Submit Post
          </button>
        </div>
      </div>
    </>
  );
};

export default ArtistUpload;

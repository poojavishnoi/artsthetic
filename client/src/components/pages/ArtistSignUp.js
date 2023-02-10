import "./SignUp.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const ArtistSignUp = () => {
  const history = useHistory();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const role = "artist";
  const showPassword = () => {
    var x = document.getElementById("passwordField");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("show-pass").src =
        "https://i.ibb.co/7XqbBwz/hidepass.png";
    } else {
      x.type = "password";
      document.getElementById("show-pass").src =
        "https://i.ibb.co/TrjBB8S/showpass.png";
    }
  };
  const PostData = () => {
    if (
      // eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: "Invalid Email format.",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        password,
        email,
        role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({ html: data.message, classes: "#2e7d32 green darken-3" });
          history.push("/artist/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="background-container">
        <h1 className="art-heading">ArtsthetiC</h1>
        <div className="wrapper-signup">
          <div className="title-text">
            <div className="title login">Artist SignUp</div>
          </div>
          <div className="form-inner">
            <form action="#" className="login">
              <div className="input-field">
                <div
                  className="field"
                  style={{ width: "45%", float: "left", marginRight: "20px" }}
                >
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="field" style={{ width: "45%", float: "left" }}>
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>

                <div className="field" style={{ width: "100%", float: "left" }}>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="field" style={{ width: "100%", float: "left" }}>
                  <input
                    type="password"
                    value={password}
                    id="passwordField"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    id="toggle-password"
                    onClick={() => showPassword()}
                  >
                    <img
                      id="show-pass"
                      src="https://i.ibb.co/TrjBB8S/showpass.png"
                      alt=""
                    />
                  </button>
                </div>
              </div>

              <div className="field btn" onClick={() => PostData()}>
                SignUp<div className="btn-layer"></div>
                <input type="button" />
              </div>
              <div className="signup-link">
                Already have an account?
                <Link to="/artist/signin">SignIn now</Link>
              </div>
              <hr className="hr-styling"></hr>
              <div className="signup-link">
                <Link to="/">Signin as a Patron.</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistSignUp;

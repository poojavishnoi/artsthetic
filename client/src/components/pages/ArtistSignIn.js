import "./SignIn.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const ArtistSignIn = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
    fetch("/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          if (data.user.role === "artist") {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            //dispatch({ type: "USER", payload: data.user });
            M.toast({
              html: "Successfully SignedIn.",
              classes: "#2e7d32 green darken-3",
            });
            history.push({
              pathname: "/artist/home",
              state: data.user,
            });
          } else {
            history.push({
              pathname: "/",
            });
            M.toast({
              html: "Please signin as the correct account type",
              classes: "#c62828 red darken-3",
            });
          }
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
        <div className="wrapper">
          <div className="title-text">
            <div className="title login">Artist SignIn</div>
          </div>
          <div className="form-inner">
            <form action="#" className="login">
              <div className="input-field">
                <div className="field">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="field">
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
              {/*<div className="pass-link">
                <Link to="#">Forgot password?</Link>
  </div>*/}
              <div className="field btn" onClick={() => PostData()}>
                SignIn<div className="btn-layer"></div>
                <input type="button" />
              </div>
              <div className="signup-link">
                Don't have an account?
                <Link to="/artist/signup">SignUp now</Link>
              </div>
              <hr className="hr-styling"></hr>
              <div className="signup-link">
                <Link to="/">SignIn as a Patron.</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistSignIn;

import React, { useState } from "react";
import "./Registration.css";
import { Link } from "react-router-dom";

const Registration = () => {
  setTimeout(signIn, 3000);

  function signIn() {
    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    //const signupLink = document.querySelector("form .signup-link a");

    signupBtn.onclick = () => {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    };
    loginBtn.onclick = () => {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    };
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="bg-container">
        <h1 className="art-heading">ArtsthetiC</h1>
        <div className="wrapper">
          <div className="title-text">
            <div className="title login">User SignIn</div>
            <div className="title signup">User SignUp</div>
          </div>
          <div className="form-container">
            <div className="slide-controls">
              <input type="radio" name="slide" id="login" checked />
              <input type="radio" name="slide" id="signup" />
              <label for="login" className="slide login">
                Login
              </label>
              <label for="signup" className="slide signup">
                Signup
              </label>
              <div className="slider-tab"></div>
            </div>
            <div className="form-inner">
              <form action="#" className="login">
                <div className="input-field">
                  <div className="field">
                    <input type="text" placeholder="Email Address" required />
                  </div>
                  <div className="field">
                    <input type="password" placeholder="Password" required />
                  </div>
                </div>
                <div className="pass-link">
                  <Link to="#">Forgot password?</Link>
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login" />
                </div>
                <div className="signup-link">
                  Register as an artist?
                  <Link to="/artist/registration">Signup now</Link>
                </div>
              </form>
              <form action="#" className="signup">
                <div className="input-field">
                  <div className="field">
                    <input
                      type="text"
                      value={email}
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="field">
                    <input type="text" placeholder="Name" required />
                  </div>
                  <div className="field">
                    <input type="password" placeholder="Password" required />
                  </div>
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;

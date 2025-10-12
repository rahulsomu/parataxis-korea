import React, { useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { adminLoginApiUrl } from "../../constants";

const Admin = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    let emailError = "";
    let passwordError = "";

    // validation;
    if (!loginData.email) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      emailError = "Email is invalid";
    }

    if (!loginData.password) {
      passwordError = "Password is required";
    } else if (loginData.password.length < 6) {
      passwordError = "Password must be at least 6 characters long";
    }

    //if there are errors
    if (emailError || passwordError) {
      setLoginData({ ...loginData, emailError, passwordError });
      return false;
    }
    // submit form
    if (loginError) setLoginError("");
    if (loginData.emailError || loginData.passwordError) {
      setLoginData({ ...loginData, emailError: "", passwordError: "" });
    }
    axios
      .post(adminLoginApiUrl, {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response) => {
        if (response.status === 200) {
          if (
            response.data &&
            response.data.success == true &&
            response.data.token
          ) {
            sessionStorage.setItem("token", response.data.token);
            navigate("/dashboard");
            setLoginData({
              email: "",
              password: "",
              emailError: "",
              passwordError: "",
            });
          } else {
            setLoginError("Login failed. Please try again.");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          setLoginData({
            ...loginData,
            passwordError: "Invalid email or password",
          });
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  return (
    <section className="press-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Admin Login</h2>
          <form onSubmit={handleForm}>
            <label htmlFor="email">Email Address</label>
            <input
              value={loginData.email}
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />
            {loginData.emailError ? (
              <span className="error-msg">{loginData.emailError}</span>
            ) : null}
            <label htmlFor="password">Password</label>
            <input
              value={loginData.password}
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
            {loginData.passwordError ? (
              <span className="error-msg">{loginData.passwordError}</span>
            ) : null}
            <input
              type="submit"
              value="Login"
              className="submit-btn"
              onClick={handleForm}
            />
          </form>

          <span className="error-msg login">
            {loginError ? loginError : null}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Admin;

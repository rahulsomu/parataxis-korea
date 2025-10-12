import React, { useState } from "react";
import "./emailPopup.css";
import axios from "axios";
import { saveEmail } from "../../constants";

const EmailPopup = ({ setShowEmailPopup }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    if (error) setError("");
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
    } else {
      try {
        axios.post(saveEmail, { email: email }).then((response) => {
          if (response.status === 200) {
            setSuccess(true);
            sessionStorage.setItem("subscribed", "true");
          }
        });
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="email-popup">
      {success ? (
        <div>
          <h2 className="success">Thank you for subscribing!</h2>
          <p>You will now receive all press releases.</p>
          <button
            onClick={() => setShowEmailPopup(false)}
            className="submit-btn"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <h2>Enter email to receive all press releases.</h2>
          <input
            value={email}
            type="email"
            placeholder="Your email"
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
          {error && <p className="error-msg">{error}</p>}
        </>
      )}
    </div>
  );
};

export default EmailPopup;

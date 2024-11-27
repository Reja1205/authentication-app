import React, { useState } from "react";
import "../styles/signin.css";
import axios from "axios";

import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://staging-be-ecom.techserve4u.com/api/user/signin",
        { email, password }
      );
      console.log(response?.data);
    } catch (error) {
      alert("Error Log In ");
      console.log("error", error);
    }
  };
  return (
    <div className="container">
      <div className="signin-form-box">
        <h1>Sign In</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="single-item">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="single-item">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>
          </div>
          <button className="login-button" type="submit">
            Log In
          </button>
        </form>
        <Link to="/sign-up">Create Account</Link>
      </div>
    </div>
  );
}

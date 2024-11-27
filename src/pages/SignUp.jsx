import React, { useState } from "react";
import "../styles/signup.css";
import "../styles/isotp.css";
import { Link } from "react-router-dom";
import axios from "axios";
export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [otp, setOtp] = useState("");

  console.log({ fullName, email, password });

  // const handleNameChange = (e) => {
  //   console.log(e.target.value);
  // };
  // const handleEmailChange = (e) => {
  //   console.log(e.target.value);
  // };
  // const handlePasswordChange = (e) => {
  //   console.log(e.target.value);
  // };
  const handleSubmit = async (e) => {
    console.log(e);

    e.preventDefault();

    try {
      const data = {
        name: fullName,
        email,
        password,
      };
      const response = await axios.post(
        "https://staging-be-ecom.techserve4u.com/api/user/signup",
        data
      );
      if (response?.data?.isOtpSend) {
        setIsOtpSend(true);
      }
      console.log("response", response);
    } catch (error) {
      console.log("Error", error.message);
    }
    console.log("Form is submitted");
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const data = {
        otp,
        email,
      };
      const response = await axios.post(
        "https://staging-be-ecom.techserve4u.com/api/user/verifyotp",
        data
      );

      console.log("Otp", response);
    } catch (error) {
      console.log("Error", error.message);
    }
    console.log("Form is submitted");
  };

  return (
    <div className="container">
      {isOtpSend ? (
        <div className="login-form-box">
          <h2>Verify Otp</h2>
          <form className="login-form" onSubmit={handleOtp}>
            <div className="form-group">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Otp"
                required
              />
            </div>
            <button className="submit-button" type="submit">
              Sens & Verify
            </button>
          </form>
        </div>
      ) : (
        <div className="login-form-box">
          <h2>Sign Up</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="single-item">
                <input
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter Your Full Name"
                  required
                />
              </div>
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
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          <Link to="/sign-in">Already have an account?</Link>
        </div>
      )}
    </div>
  );
}

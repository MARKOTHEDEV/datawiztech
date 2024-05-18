import React, { useState, useRef } from "react";
// import {Link}
import lens from "../../assets/images/frame-35-SZf.png";
import logo from "../../assets/images/web-1920-1-1-8qX.png";
import loginCancel from "../../assets/images/group-7-PLd.png";
import individual from "../../assets/images/icons8-customer-100-4.png";
import cooperate from "../../assets/images/icons8-user-account-100-2-bg.png";
import cooperateB from "../../assets/images/cooperate.png";
import individualB from "../../assets/images/individual.png";
import "./Signup.css";
import "./Login.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  const [isRecoverAccountOpen, setIsRecoverAccountOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isViaPhoneOpen, setIsViaPhoneOpen] = useState(false);
  const [isViaEmailOpen, setIsViaEmailOpen] = useState(false);
  const [isCreatePassOpen, setIscreatePassOpen] = useState(false);
  const [isViaPhoneFormOpen, setIsViaPhoneFormOpen] = useState(false);
  const [isViaEmailFormOpen, setIsViaEmailFormOpen] = useState(false);
  //   const [individualIcon, setIndividualIcon] = useState(individual);
  const [individualContent, setIndividualContent] = useState(true);
  const [cooperateContent, setCooperateContent] = useState(false);
  const [cooperateContentA, setCooperateContentA] = useState(true);
  const [cooperateContentB, setCooperateContentB] = useState(false);
  const [signupOtp, setSignupOtp] = useState(false);
  const [signupPhone, setSignupPhone] = useState(false);
  const [signupDone, setSignupDone] = useState(false);
  const [signupForm, setSignupForm] = useState(true);
  // const [cooperateContentB, setCooperateContentB] = useState(false);
  const [cooperateNumber, setCooperateNumber] = useState(1);
  const [inputStyle, setInputStyle] = useState({});

  const signupToggle = () => {
    setSignupPhone(true);
    setSignupOtp(false);
    setSignupDone(false);
    setSignupForm(false);
  };

  const signupOtpToggle = () => {
    setSignupOtp(true);
    setSignupPhone(false);
    setSignupDone(false);
    setSignupForm(false);
  };

  const signupDoneToggle = () => {
    setSignupDone(true);
    setSignupOtp(false);
    setSignupPhone(false);
    setSignupForm(false);
  };

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const moveToNext = (currentInput, nextInputRef) => {
    if (currentInput.value.length >= 1 && nextInputRef) {
      nextInputRef.current.focus();
    }
  };

  const toggleCooperate = () => {
    setCooperateContentA(false);
    setCooperateContentB(true);
    setCooperateNumber(2);
  };

  const cancelCooperate = () => {
    setCooperateContentA(true);
    setCooperateContentB(false);
    setCooperateNumber(1);
  };

  const toggleIndividualContent = () => {
    setIndividualContent(true);
    setCooperateContent(false);
  };
  const toggleCooperateContent = () => {
    setCooperateContent(true);
    setIndividualContent(false);
  };

  const toggleLoginForm = () => {
    setIsLoginFormOpen(!isLoginFormOpen);
    setIsSignupFormOpen(false);
    setIsRecoverAccountOpen(false);
    setIsOtpOpen(false);
    setIsViaPhoneOpen(false);
    setIsViaEmailOpen(false);
    setIscreatePassOpen(false);
    setIsLoginForm(true);
    setIsViaPhoneFormOpen(false);
    setIsViaEmailFormOpen(false);
  };

  const toggleViaEmail = () => {
    setIsViaEmailOpen(!isViaEmailOpen);
    setIsViaPhoneOpen(false);
    setIsViaEmailFormOpen(false);
    setIsRecoverAccountOpen(false);
    setIsLoginForm(false);
    setIsSignupForm(false);
    setIsOtpOpen(false);
    setIscreatePassOpen(false);
    setIsViaPhoneFormOpen(false);
  };

  const toggleViaPhone = () => {
    setIsViaPhoneFormOpen(false);
    setIsViaPhoneOpen(!isViaPhoneOpen);
    setIsRecoverAccountOpen(false);
    setIsLoginForm(false);
    setIsSignupForm(false);
    setIsOtpOpen(false);
    setIsViaEmailOpen(false);
    setIscreatePassOpen(false);
    setIsViaEmailFormOpen(false);
  };

  const toggleViaPhoneForm = () => {
    setIsViaPhoneFormOpen(!isViaPhoneOpen);
    setIsViaPhoneOpen(false);
    setIsRecoverAccountOpen(false);
    setIsLoginForm(false);
    setIsSignupForm(false);
    setIsOtpOpen(false);
    setIsViaEmailOpen(false);
    setIscreatePassOpen(false);
    setIsViaEmailFormOpen(false);
  };

  const toggleViaEmailForm = () => {
    setIsViaEmailFormOpen(!isViaEmailOpen);
    setIsViaEmailOpen(false);
    setIsViaPhoneOpen(false);
    setIsRecoverAccountOpen(false);
    setIsLoginForm(false);
    setIsSignupForm(false);
    setIsOtpOpen(false);
    setIscreatePassOpen(false);
    setIsViaPhoneFormOpen(false);
  };
  const toggleOtp = () => {
    setIsOtpOpen(!isOtpOpen);
    setIsViaEmailOpen(false);
    setIsViaPhoneOpen(false);
    setIsRecoverAccountOpen(false);
    setIsLoginForm(false);
    setIsSignupForm(false);
    setIscreatePassOpen(false);
    setIsViaPhoneFormOpen(false);
    setIsViaEmailFormOpen(false);
  };

  const toggleRecoverAccount = () => {
    setIsRecoverAccountOpen(!isRecoverAccountOpen);
    setIsLoginForm(false);
    setIsSignupForm(false);
    setIsOtpOpen(false);
    setIsViaPhoneOpen(false);
    setIsViaEmailOpen(false);
    setIscreatePassOpen(false);
    setIsViaPhoneFormOpen(false);
    setIsViaEmailFormOpen(false);
    // Set other sections' states as needed
  };

  const toggleSignupForm = () => {
    setIsSignupFormOpen(!isSignupFormOpen);
    setIsLoginFormOpen(false);
    setSignupPhone(false);
    setSignupOtp(false);
    setSignupDone(false);
    setSignupForm(true);
  };

  const handleInputFocus = (e) => {
    const inputWrapper = e.target.parentElement;
    // setInputStyle({ ...inputStyle, [e.target.id]: { backgroundColor: 'white'} });
    inputWrapper.style.borderColor = "#17b24e";
    inputWrapper.querySelector(".input__label").style.color = "#17b24e";
    // inputWrapper.querySelector(".input__icon").style.color = "#17b24e";
    e.target.setAttribute(
      "data-placeholder",
      e.target.getAttribute("placeholder")
    );
    e.target.setAttribute("placeholder", "");
  };

  const handleInputBlur = (e) => {
    const inputWrapper = e.target.parentElement;
    inputWrapper.style.borderColor = "#d8d8d8";
    inputWrapper.querySelector(".input__label").style.color = "#d8d8d8";
    // inputWrapper.querySelector(".input__icon").style.color = "#d8d8d8";
    e.target.setAttribute(
      "placeholder",
      e.target.getAttribute("data-placeholder")
    );
    e.target.setAttribute("data-placeholder", "");
  };
  return (
    <div>
      <div className={`signup-container ${isSignupFormOpen ? "open" : ""}`}>
        <div className="row login-row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 signup-box">
            <div className="">
              {signupForm && (
                <div className="signup-col-2 mb-4 login-acct">
                  <div className="signup-content">
                    <div className="login-text-container pt-3">
                      <p className="signup-text">Sign Up</p>
                      <p onClick={toggleSignupForm}>
                        {" "}
                        <img
                          className="signup-cancel"
                          src={loginCancel}
                          alt="..."
                        />
                      </p>
                    </div>
                    <div class="row signup-type mb-3">
                      <div
                        class={`col-6 individual ${
                          individualContent ? "active" : ""
                        } d-flex justify-content-center`}
                        onClick={toggleIndividualContent}
                      >
                        <div class="signup-type-image">
                          <img
                            class={`signup-type-icon ${
                              individualContent ? "active" : ""
                            }`}
                            src={`${
                              individualContent ? individual : individualB
                            }`}
                            alt="..."
                          />
                        </div>
                        <div
                          class={`signup-type-text ${
                            individualContent ? "active" : ""
                          }`}
                        >
                          Individual
                        </div>
                      </div>
                      <div
                        class={`col-6 corporate ${
                          cooperateContent ? "active" : ""
                        } d-flex justify-content-end`}
                        onClick={toggleCooperateContent}
                      >
                        <div class="signup-type-image">
                          <img
                            class={`signup-type-icon ${
                              cooperateContent ? "active" : ""
                            }`}
                            src={`${cooperateContent ? cooperateB : cooperate}`}
                            alt="..."
                          />
                        </div>
                        <div
                          class={`signup-type-text ${
                            cooperateContent ? "active" : ""
                          }`}
                        >
                          Corporate
                        </div>
                      </div>
                    </div>
                    {cooperateContent && (
                      <div className="d-flex justify-content-end cooperatenumber mb-1">
                        <span className="cooperatestep">
                          Step {cooperateNumber}
                        </span>{" "}
                        <span> of 2</span>
                      </div>
                    )}
                    <div className="p-3 signup-type-content">
                      <div
                        className={`individual-content ${
                          individualContent ? "active" : ""
                        }`}
                      >
                        <div className="input__wrapper firstNameinputcontainer mt-2 mb-3">
                          <input
                            type="text"
                            autoComplete="off"
                            className="input__field email-input"
                            placeholder="First Name"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            id="individualfirstName"
                          />
                          <label
                            for="individualfirstName"
                            className="input__label email-label"
                          >
                            First Name
                          </label>
                          {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                        </div>
                        <div className="input__wrapper lastnameinputcontainer mb-3">
                          <input
                            type="text"
                            autoComplete="off"
                            className="input__field pass-input"
                            placeholder="Last Name"
                            id="individuallastName"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                          />
                          <label
                            for="individuallastName"
                            className="input__label pass-label"
                          >
                            Last Name
                          </label>
                          <i className="fa-solid fa-eye input__icon"></i>
                        </div>
                        <div className="input__wrapper usernameinputcontainer mb-3">
                          <input
                            type="text"
                            autoComplete="off"
                            className="input__field email-input"
                            placeholder="Username"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            id="individualusername"
                          />
                          <label
                            for="individualusername"
                            className="input__label email-label"
                          >
                            Username
                          </label>
                          {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                        </div>
                        <div className="input__wrapper phoneinputcontainer mb-3">
                          <input
                            type="number"
                            className="input__field pass-input"
                            placeholder="Phone Number"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            id="individualphoneNumber"
                            autoComplete="off"
                          />
                          <label
                            for="individualphoneNumber"
                            className="input__label pass-label"
                          >
                            Phone Number
                          </label>
                          <i className="fa-solid fa-eye input__icon"></i>
                        </div>
                        <div className="input__wrapper emailinputcontainer mb-3">
                          <input
                            type="email"
                            className="input__field email-input"
                            placeholder="Email address"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            id="individualemailAddress"
                            autoComplete="off"
                          />
                          <label
                            for="individualemailAddress"
                            className="input__label email-label"
                          >
                            Email address
                          </label>
                          {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                        </div>
                        <div className="input__wrapper passinputcontainer mb-3">
                          <input
                            type="password"
                            className="input__field pass-input"
                            placeholder="Your Password"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            id="individualpassword"
                            autoComplete="off"
                            autocomplete="new-password"
                          />
                          <label
                            for="individualpassword"
                            className="input__label pass-label"
                          >
                            Password
                          </label>
                          <i className="fa-solid fa-eye input__icon"></i>
                        </div>
                        <div className="individual-button d-flex justify-content-end mt-3">
                          <button
                            type="submit"
                            className="individual-cancel-btn"
                            onClick={toggleSignupForm}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="individual-signup-btn"
                            onClick={signupToggle}
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                      <div
                        className={`cooperate-content ${
                          cooperateContent ? "active" : ""
                        }`}
                      >
                        {cooperateContentA && (
                          <div className="cooperateA">
                            <div className="input__wrapper firstNameinputcontainer mb-3">
                              <input
                                type="text"
                                autoComplete="off"
                                className="input__field email-input"
                                placeholder="First Name"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                id="cooperatefirstName"
                              />
                              <label
                                for="cooperatefirstName"
                                className="input__label email-label"
                              >
                                First Name
                              </label>
                            </div>
                            <div className="input__wrapper lastnameinputcontainer mb-3">
                              <input
                                type="text"
                                autoComplete="off"
                                className="input__field pass-input"
                                placeholder="Last Name"
                                id="cooperatelastName"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                              />
                              <label
                                for="cooperatelastName"
                                className="input__label pass-label"
                              >
                                Last Name
                              </label>
                            </div>
                            <div className="input__wrapper phoneinputcontainer mb-3">
                              <input
                                type="number"
                                autoComplete="off"
                                className="input__field pass-input"
                                placeholder="Phone Number"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                id="cooperatephoneNumber"
                              />
                              <label
                                for="cooperatephoneNumber"
                                className="input__label pass-label"
                              >
                                Phone Number
                              </label>
                            </div>
                            <div className="input__wrapper emailinputcontainer mb-3">
                              <input
                                type="email"
                                className="input__field email-input"
                                placeholder="Email address"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                id="cooperateemailAddress"
                                autoComplete="off"
                              />
                              <label
                                for="cooperateemailAddress"
                                className="input__label email-label"
                              >
                                Email address
                              </label>
                            </div>
                            <div className="input__wrapper passinputcontainer mb-3">
                              <input
                                type="password"
                                className="input__field pass-input"
                                placeholder="Your Password"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                id="cooperatepassword"
                                autoComplete="off"
                              />
                              <label
                                for="cooperatepassword"
                                className="input__label pass-label"
                              >
                                Password
                              </label>
                              <i className="fa-solid fa-eye input__icon"></i>
                            </div>
                            <div className="individual-button d-flex justify-content-end mt-3">
                              <button
                                type="submit"
                                className="individual-cancel-btn"
                                onClick={toggleSignupForm}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="individual-signup-btn"
                                onClick={toggleCooperate}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}
                        {cooperateContentB && (
                          <div className="cooperateB">
                            <div className="input__wrapper lastnameinputcontainer mb-3">
                              <input
                                type="text"
                                autoComplete="off"
                                className="input__field pass-input"
                                placeholder="Organization Name"
                                id="organizationName"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                              />
                              <label
                                for="organizationName"
                                className="input__label pass-label"
                              >
                                Organization Name
                              </label>
                            </div>

                            <div className="input__wrapper emailinputcontainer mb-3">
                              <select
                                className="input__field email-input"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                id="organizationType"
                              >
                                <option>choose Organization</option>
                                <option>InstitutionA</option>
                                <option>InstitutionB</option>
                                <option>InstitutionC</option>
                                <option>InstitutionD</option>
                                <option>InstitutionE</option>
                              </select>
                              <label
                                for="organizationType"
                                className="input__label organizationType-label"
                              >
                                Organization Type
                              </label>
                            </div>
                            <div className="input__wrapper passinputcontainer mb-3">
                              <input
                                type="text"
                                className="input__field pass-input"
                                placeholder="Your Password"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                id="cooperateaddress"
                                autoComplete="off"
                              />
                              <label
                                for="cooperateaddress"
                                className="input__label pass-label"
                              >
                                Address
                              </label>
                            </div>
                            <div className="individual-button d-flex justify-content-end mt-3">
                              <button
                                type="submit"
                                className="individual-cancel-btn"
                                onClick={cancelCooperate}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="individual-signup-btn"
                              >
                                Sign Up
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {signupPhone && (
                <div className="signup-col-2 via-phone">
                  <div className="login-content">
                    <div className="verifywithnumber">
                      <p className="login-text">Via phone number</p>
                    </div>
                    <p className="text-center py-3">
                      OTP will be sent to 0703 *** **21
                    </p>
                    <div
                      className="login-btn-primary"
                      onClick={signupOtpToggle}
                    >
                      Send OTP
                    </div>
                  </div>
                </div>
              )}
              {signupOtp && (
                <div className="signup-col-2 inputotp">
                  <form action="" method="post">
                    <div className="login-content">
                      <div className="verifywithnumber">
                        <p className="login-text">Kindly input OTP</p>
                      </div>
                      <div className="row">
                        <div className="col-2">
                          <div className="input__wrapper emailinputcontainer mb-4 otp-wrapper">
                            <input
                              type="number"
                              ref={inputRefs[0]}
                              maxLength={1}
                              onChange={() =>
                                moveToNext(inputRefs[0].current, inputRefs[1])
                              }
                              className="text-center otp-field email-input"
                            />
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="input__wrapper emailinputcontainer mb-4 otp-wrapper">
                            <input
                              type="number"
                              id="nextInput"
                              ref={inputRefs[1]}
                              maxLength={1}
                              onChange={() =>
                                moveToNext(inputRefs[1].current, inputRefs[2])
                              }
                              className="text-center otp-field email-input"
                            />
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="input__wrapper emailinputcontainer mb-4 otp-wrapper">
                            <input
                              type="number"
                              id="nextInput2"
                              ref={inputRefs[2]}
                              maxLength={1}
                              onChange={() =>
                                moveToNext(inputRefs[2].current, inputRefs[3])
                              }
                              className="text-center otp-field email-input"
                            />
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="input__wrapper emailinputcontainer mb-4 otp-wrapper">
                            <input
                              type="number"
                              id="nextInput3"
                              ref={inputRefs[3]}
                              maxLength={1}
                              onChange={() =>
                                moveToNext(inputRefs[3].current, inputRefs[4])
                              }
                              className="text-center otp-field email-input"
                            />
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="input__wrapper emailinputcontainer mb-4 otp-wrapper">
                            <input
                              type="number"
                              id="nextInput4"
                              ref={inputRefs[4]}
                              maxLength={1}
                              onChange={() =>
                                moveToNext(inputRefs[4].current, inputRefs[5])
                              }
                              className="text-center otp-field email-input"
                            />
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="input__wrapper otp-wrapper emailinputcontainer mb-4">
                            <input
                              type="number"
                              id="nextInput5"
                              ref={inputRefs[5]}
                              maxLength={1}
                              onChange={() =>
                                moveToNext(inputRefs[5].current, null)
                              }
                              className="text-center otp-field email-input"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="login-btn-primary"
                        onClick={signupDoneToggle}
                      >
                        Verify OTP
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {signupDone && (
                <div className="signup-col-2 via-phone">
                  <div className="signup-content">
                    <div className="login-text-container pt-3">
                      <p className="signup-text">Done!</p>
                      <p onClick={toggleSignupForm}>
                        {" "}
                        <img
                          className="signup-cancel"
                          src={loginCancel}
                          alt="..."
                        />
                      </p>
                    </div>
                    <p className="text-center py-3 text-success">
                      Sign up completed succesfully!
                    </p>
                    {/* <div className="login-btn-primary">Send OTP</div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
      <div className={`login-container ${isLoginFormOpen ? "open" : ""}`}>
        <div className="row login-row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            {isLoginForm && (
              <div className="login-col-2 mb-4 login-acct">
                <div className="login-content">
                  <div className="login-text-container">
                    <p className="login-text">Login</p>
                    <p onClick={toggleLoginForm}>
                      {" "}
                      <img
                        className="login-cancel"
                        src={loginCancel}
                        alt="..."
                      />
                    </p>
                  </div>
                  <div className="input__wrapper emailinputcontainer mb-4">
                    <input
                      type="email"
                      className="input__field email-input"
                      placeholder="Email address"
                      id="email"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      autoComplete="off"
                    />
                    <label for="email" className="input__label email-label">
                      Email address
                    </label>
                    {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                  </div>
                  <div className="input__wrapper passinputcontainer">
                    <input
                      type="password"
                      id="password"
                      className="input__field pass-input"
                      placeholder="Your Password"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      autoComplete="off"
                    />
                    <label for="password" className="input__label pass-label">
                      Password
                    </label>
                    <i className="fa-solid fa-eye input__icon"></i>
                  </div>
                  {/* <!-- <div className="login-pass-container">
                            <div className="rectangle-19-Hjf">
                            </div>
                            <img className="frame-20-QpH" src="./assets/frame-20-EKK.png" />
                            <p className="adrianst4-YQh">ADRianst4|</p>
                            <div className="frame-27-F4D">Password</div>
                        </div> --> */}
                  <p className="forgotten-password my-3">
                    <span className="forgot-password">Forgot password? </span>
                    <span className="click-here" onClick={toggleRecoverAccount}>
                      Click here...
                    </span>
                  </p>
                  <button type="submit" className="login-btn-primary mt-4">
                    Login
                  </button>
                </div>
              </div>
            )}
            {isRecoverAccountOpen && (
              <div className="login-col-2 recover-acct">
                <div className="login-content">
                  <div className="login-text-container">
                    <p className="login-text">Recover Account</p>
                    <p onClick={toggleLoginForm}>
                      {" "}
                      <img
                        className="login-cancel"
                        src={loginCancel}
                        alt="..."
                      />
                    </p>
                  </div>

                  <div
                    className="login-btn-primary mb-5"
                    onClick={toggleViaPhoneForm}
                  >
                    Via phone number
                  </div>
                  <div
                    className="login-btn-primary"
                    onClick={toggleViaEmailForm}
                  >
                    Via email address
                  </div>
                </div>
              </div>
            )}
            {isViaPhoneFormOpen && (
              <div className="login-col-2 via-phone">
                <div className="login-content">
                  <div className="verifywithnumber">
                    <p className="login-text">Via phone number</p>
                    <p onClick={toggleLoginForm}>
                      {" "}
                      <img
                        className="login-cancel"
                        src={loginCancel}
                        alt="..."
                      />
                    </p>
                  </div>
                  <div className="input__wrapper emailinputcontainer mb-4">
                    <input
                      type="number"
                      autoComplete="off"
                      className="input__field email-input"
                      placeholder="Phone Number"
                      id="email"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <label for="email" className="input__label email-label">
                      Phone Number
                    </label>
                    {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                  </div>
                  <div className="login-btn-primary" onClick={toggleViaPhone}>
                    Send OTP
                  </div>
                </div>
              </div>
            )}
            {isViaPhoneOpen && (
              <div className="login-col-2 via-phone">
                <div className="login-content">
                  <div className="verifywithnumber">
                    <p className="login-text">Via phone number</p>
                    <p onClick={toggleLoginForm}>
                      {" "}
                      <img
                        className="login-cancel"
                        src={loginCancel}
                        alt="..."
                      />
                    </p>
                  </div>
                  <p className="text-center py-3">
                    OTP will be sent to 0703 *** **21
                  </p>
                  <div className="login-btn-primary" onClick={toggleOtp}>
                    Send OTP
                  </div>
                </div>
              </div>
            )}
            {isViaEmailFormOpen && (
              <div className="login-col-2 via-email">
                <div className="login-content">
                  <div className="verifywithnumber">
                    <p className="login-text">Via email address</p>
                    <p onClick={toggleLoginForm}>
                      {" "}
                      <img
                        className="login-cancel"
                        src={loginCancel}
                        alt="..."
                      />
                    </p>
                  </div>
                  <div className="input__wrapper emailinputcontainer mb-4">
                    <input
                      type="email"
                      className="input__field email-input"
                      placeholder="Email Address"
                      id="email"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      autoComplete="off"
                    />
                    <label for="email" className="input__label email-label">
                      Email Address
                    </label>
                    {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                  </div>
                  {/* <!-- <div className="login-btn-primary mb-3">Via phone number</div> --> */}
                  <div className="login-btn-primary" onClick={toggleViaEmail}>
                    Send OTP
                  </div>
                </div>
              </div>
            )}
            {isViaEmailOpen && (
              <div className="login-col-2 via-email">
                <div className="login-content">
                  <div className="verifywithnumber">
                    <p className="login-text">Via email address</p>
                    <p onClick={toggleLoginForm}>
                      {" "}
                      <img
                        className="login-cancel"
                        src={loginCancel}
                        alt="..."
                      />
                    </p>
                  </div>
                  <p className="text-center py-3">
                    OTP will be sent to popo*****@gmail.com
                  </p>
                  {/* <!-- <div className="login-btn-primary mb-3">Via phone number</div> --> */}
                  <div className="login-btn-primary" onClick={toggleOtp}>
                    Send OTP
                  </div>
                </div>
              </div>
            )}
            {isOtpOpen && (
              <div className="login-col-2 inputotp">
                <form action="" method="post">
                  <div className="login-content">
                    <div className="verifywithnumber">
                      <p className="login-text">Kindly input OTP</p>
                      <p onClick={toggleLoginForm}>
                        {" "}
                        <img
                          className="login-cancel"
                          src={loginCancel}
                          alt="..."
                        />
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div className="input__wrapper emailinputcontainer mb-4 otp-wrapper">
                          <input
                            type="number"
                            autoComplete="off"
                            maxlength="1"
                            onkeyup="moveToNext(this, 'nextInput')"
                            className="text-center otp-field email-input"
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="input__wrapper emailinputcontainer mb-4 otp-wrapper">
                          <input
                            type="number"
                            autoComplete="off"
                            maxlength="1"
                            id="nextInput"
                            onkeyup="moveToNext(this, 'nextInput2')"
                            className="text-center otp-field email-input"
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="input__wrapper emailinputcontainer mb-4 otp-wrapper">
                          <input
                            type="number"
                            autoComplete="off"
                            maxlength="1"
                            id="nextInput2"
                            onkeyup="moveToNext(this, 'nextInput3')"
                            className="text-center otp-field email-input"
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="input__wrapper emailinputcontainer mb-4 otp-wrapper">
                          <input
                            type="number"
                            autoComplete="off"
                            maxlength="1"
                            id="nextInput3"
                            onkeyup="moveToNext(this, 'nextInput4')"
                            className="text-center otp-field email-input"
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="input__wrapper emailinputcontainer mb-4 otp-wrapper">
                          <input
                            type="number"
                            autoComplete="off"
                            maxlength="1"
                            id="nextInput4"
                            onkeyup="moveToNext(this, 'nextInput5')"
                            className="text-center otp-field email-input"
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="input__wrapper otp-wrapper emailinputcontainer mb-4">
                          <input
                            type="number"
                            autoComplete="off"
                            maxlength="1"
                            id="nextInput5"
                            onkeyup="moveToNext(this, 'nextInput6')"
                            className="text-center otp-field email-input"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <!-- <div className="login-btn-primary mb-3">Via phone number</div> --> */}
                    <button type="submit" className="login-btn-primary">
                      Verify OTP
                    </button>
                  </div>
                </form>
              </div>
            )}
            {isCreatePassOpen && (
              <div className="login-col-2 create-new-pass">
                <div className="login-content">
                  <div className="login-text-container">
                    <p className="login-text">Create new password</p>
                    <p>
                      {" "}
                      <img
                        className="login-cancel"
                        src={loginCancel}
                        alt="..."
                      />
                    </p>
                  </div>
                  <div className="input__wrapper emailinputcontainer mb-4">
                    <input
                      type="email"
                      className="input__field email-input"
                      placeholder="New Password"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      autoComplete="off"
                    />
                    <label for="password" className="input__label email-label">
                      New Password
                    </label>
                    <i className="fa-solid fa-eye input__icon"></i>
                  </div>
                  <div className="input__wrapper passinputcontainer">
                    <input
                      type="password"
                      className="input__field pass-input"
                      placeholder="Repeat Password"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      autoComplete="off"
                    />
                    <label for="password" className="input__label pass-label">
                      Repeat Password
                    </label>
                    <i className="fa-solid fa-eye input__icon"></i>
                  </div>
                  {/* <!-- <div className="login-pass-container">
                            <div className="rectangle-19-Hjf">
                            </div>
                            <img className="frame-20-QpH" src="./assets/frame-20-EKK.png" />
                            <p className="adrianst4-YQh">ADRianst4|</p>
                            <div className="frame-27-F4D">Password</div>
                        </div> --> */}
                  <p className="forgotten-password">
                    <span className="forgot-password">Forgot password? </span>
                    <span className="click-here">Click here...</span>
                  </p>
                  <button type="submit" className="login-btn-primary mt-2">
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
      <div className="container-fluid header-container position-fixed ">
        <div className="header px-lg-3 py-3">
          <div className="navbar">
            <p className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-bars d-lg-none hamburger-icon mx-1"
                data-bs-toggle="collapse"
                href="#multiCollapseExample1"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample1"
              ></i>
              <img src={logo} className="logo" alt="" />
            </p>
            <p>
              <Link to="/" className="nav-items active d-lg-flex d-none">
                Home
              </Link>
            </p>
            <p>
              <Link to="/upload" className="nav-items d-lg-flex d-none">
                Upload
              </Link>
            </p>
            <p>
              <Link to="/patnership" className="nav-items d-lg-flex d-none">
                Patnership Management
              </Link>
            </p>
            <p>
              <Link to="/inquiry" className="nav-items d-lg-flex d-none">
                Inquiry
              </Link>
            </p>
          </div>

          {/* <div className="navbar2">
            <div className="nav-icon-container">
              <img
                className="nav-icons"
                src="assets/frame-35-gJM.png"
                alt="..."
              />
            </div>
            <div className="nav-icon-container">
              <img className="nav-icons" src="assets/frame-156.png" alt=".." />
            </div>
            <div className="cart-btn nav-icon-container">
              <img
                className="nav-icons cart-icon"
                src="assets/frame-36.png"
                alt=".."
              />
              <div className="cart-number">2</div>
            </div>
            <div className="profile-pic nav-icon-container">
              <img
                src="assets/ellipse-27-bg.png"
                data-bs-toggle="collapse"
                href="#multiCollapseExample2"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample2"
                className="img-fluid profile-pic"
                alt=".."
              />
            </div>
          </div> */}
          <div className="notloggedin">
            <img className="notloggedinSearch" alt="search" src={lens} />
            <div className="signup-btn" onClick={toggleSignupForm}>
              Sign Up
            </div>
            <div className="login-btn" onClick={toggleLoginForm}>
              Login
            </div>
          </div>
        </div>
      </div>
      <div
        role="menu"
        className="v-menu__content theme--light v-menu__content--fixed menuable__content__active collapse multi-collapse overflow-hidden"
        id="multiCollapseExample1"
        style={{
          minWidth: "42px",
          top: "69px",
          left: "12px",
          transformOrigin: "left top",
          zIndex: 8,
        }}
      >
        <div className="v-list v-sheet theme--light">
          <Link to="/home"
            aria-current="page"
            className="className-active-menu v-list-item--active v-list-item v-list-item--link theme--light weight-600 "
            tabindex="0"
            role="menuitem"
            id="list-item-159"
          >
            <div className="v-list-item__title">Home</div>
          </Link>
          <Link to="/upload"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-161"
          >
            <div className="v-list-item__title">Upload</div>
          </Link>
          <Link to="/partnership"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-163"
          >
            <div className="v-list-item__title">Partnership Management</div>
          </Link>
          <Link to="/inquiry"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-165"
          >
            <div className="v-list-item__title">Inquiry</div>
          </Link>
        </div>
      </div>
      <div
        role="menu"
        className="v-menu__content theme--light v-menu__content--fixed menuable__content__active collapse multi-collapse overflow-hidden"
        id="multiCollapseExample2"
        style={{
          minWidth: "42px",
          top: "69px",
          right: "12px",
          transformOrigin: "right top",
          zIndex: 8,
        }}
      >
        <div className="v-list v-sheet theme--light">
          <Link to="/home"
            aria-current="page"
            className="className-active-menu v-list-item--active v-list-item v-list-item--link theme--light weight-600 "
            tabindex="0"
            role="menuitem"
            id="list-item-159"
          >
            <div className="v-list-item__title text-center">View Profile</div>
          </Link>
          <Link to="/upload"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-161"
          >
            <div className="v-list-item__title text-center">
            Messages <span>2</span>
            </div>
          </Link>
          <Link to="/partnership"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-163"
          >
            <div className="v-list-item__title text-center">
            Notifications <span>2</span>
            </div>
          </Link>
          <Link to="/inquiry"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-165"
          >
            <div className="v-list-item__title text-center">Revenue History</div>
          </Link>
          <Link to="/inquiry"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-165"
          >
            <div className="v-list-item__title text-center">Expenditure</div>
          </Link>
          <Link to="/inquiry"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-165"
          >
            <div className="v-list-item__title text-center">Verify Account</div>
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
























// {isViaPhoneFormOpen && (
//   <div className="login-col-2 via-phone">
//     <div className="login-content">
//       <div className="verifywithnumber">
//         <p className="login-text">Via phone number</p>
//         <p onClick={toggleLoginForm}>
//           {" "}
//           <img className="login-cancel" src={loginCancel} alt="..." />
//         </p>
//       </div>
//       <div className="input__wrapper emailinputcontainer mb-4">
//         <input
//           type="number"
//           autoComplete="off"
//           className="input__field email-input"
//           placeholder="Phone Number"
//           id="email"
//           onFocus={handleInputFocus}
//           onBlur={handleInputBlur}
//         />
//         <label for="email" className="input__label email-label">
//           Phone Number
//         </label>
//       </div>
//       <div className="login-btn-primary" onClick={toggleViaPhone}>
//         Send OTP
//       </div>
//     </div>
//   </div>
// )}
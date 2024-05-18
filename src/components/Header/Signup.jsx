import React, { useState } from "react";
import loginCancel from "../../assets/images/group-7-PLd.png";
import individual from "../../assets/images/icons8-customer-100-4.png";
import cooperate from "../../assets/images/icons8-user-account-100-2-bg.png";
import cooperateB from "../../assets/images/cooperate.png";
import individualB from "../../assets/images/individual.png";
import "./Signup.css";
import "./Login.css";
import IndividualSignup from "./IndividualSignup";
import CorperateSignup from "./CorperateSignup";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const Signup = ({
  userEmail,
  toggleCorperateOtp,
  toggleCorperatePhone,
  isSignupFormOpen,
  individualContent,
  cooperateContent,
  cooperateContentA,
  cooperateContentB,
  signupOtp,
  signupPhone,
  signupDone,
  signupForm,
  cooperateNumber,
  signupToggle,
  signupOtpToggle,
  signupDoneToggle,
  toggleCooperate,
  cancelCooperate,
  toggleIndividualContent,
  toggleCooperateContent,
  toggleSignupForm,
  handleInputFocus,
  handleInputBlur,
  inputRefs,
  moveToNext,
  signupCorperateOtp,
  signupCorperatePhone,
}) => {
  const navigate = useNavigate();
  const { currentUser, sendOtp, verifyOtp } = UserAuth();
  const [otpLoading, setotpLoading] = useState(false);
  const [verifyotpLoading, setverifyotpLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOTP = async () => {
    try {
      const response = await sendOtp(setotpLoading);
      if (response && response.status === 200) {
        signupOtpToggle();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCorperateOTP = async () => {
    try {
      const response = await sendOtp(setotpLoading);
      if (response && response.status === 200) {
        toggleCorperateOtp();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setverifyotpLoading(true);

    if (otp.length !== 6) {
      toast.error("The otp is not complete");
      setverifyotpLoading(false);
      return;
    }

    try {
      
      const response = await verifyOtp(setverifyotpLoading, otp);
      // console.log(response)
      if (response && response.status===200) {
        signupDoneToggle();
        setTimeout(() => {
          toggleSignupForm();
          navigate("/profile/verify-account");
        }, 1500);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
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
                    <IndividualSignup
                      individualContent={individualContent}
                      handleInputFocus={handleInputFocus}
                      handleInputBlur={handleInputBlur}
                      toggleSignupForm={toggleSignupForm}
                      signupToggle={signupToggle}

                    />
                    <CorperateSignup
                      cooperateContent={cooperateContent}
                      cooperateContentA={cooperateContentA}
                      handleInputFocus={handleInputFocus}
                      handleInputBlur={handleInputBlur}
                      toggleSignupForm={toggleSignupForm}
                      toggleCooperate={toggleCooperate}
                      cooperateContentB={cooperateContentB}
                      cancelCooperate={cancelCooperate}
                      toggleCorperateOtp={toggleCorperateOtp}
                      toggleCorperatePhone={toggleCorperatePhone}
                    />
                  </div>
                </div>
              </div>
            )}
            {signupPhone && (
              <div className="signup-col-2 via-phone">
                <div className="login-content">
                  <div className="verifywithnumber">
                    <p className="login-text">Via Email Address</p>
                  </div>
                  <p className="text-center py-3">
                    OTP will be sent to {userEmail ?? ""}
                  </p>
                  <div className="login-btn-primary" onClick={handleOTP}>
                    {otpLoading ? <ActionLoader /> : "Send OTP"}
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
                    <div className="d-flex justify-content-center align-items-center ">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputType="tel"
                        inputStyle={{
                          border: "2px solid gray",
                          margin: "15px 1px",
                          width: "50px",
                          aspectRatio: "1/1",
                          borderRadius: "10px",
                        }}
                        renderSeparator={<div className="w-full"></div>}
                        renderInput={(props) => <input {...props} />}
                      />
                    </div>
                    <button
                      type="submit"
                      className="login-btn-primary"
                      onClick={handleVerifyOTP}
                    >
                      {verifyotpLoading ? <ActionLoader /> : "Verify OTP"}
                    </button>
                  </div>
                </form>
              </div>
            )}
            {signupCorperatePhone && (
              <div className="signup-col-2 via-phone">
                <div className="login-content">
                  <div className="verifywithnumber">
                    <p className="login-text">Via Email Address</p>
                  </div>
                  <p className="text-center py-3">
                    OTP will be sent to {userEmail ??""}
                  </p>
                  <div className="login-btn-primary" onClick={handleCorperateOTP}>
                    {otpLoading ? <ActionLoader /> : "Send OTP"}
                  </div>
                </div>
              </div>
            )}
            {signupCorperateOtp && (
              <div className="signup-col-2 inputotp">
                <form action="" method="post">
                  <div className="login-content">
                    <div className="verifywithnumber">
                      <p className="login-text">Kindly input OTP</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center ">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputType="tel"
                        inputStyle={{
                          border: "2px solid gray",
                          margin: "15px 1px",
                          width: "50px",
                          aspectRatio: "1/1",
                          borderRadius: "10px",
                        }}
                        renderSeparator={<div className="w-full"></div>}
                        renderInput={(props) => <input {...props} />}
                      />
                    </div>
                    <button
                      type="submit"
                      className="login-btn-primary"
                      onClick={handleVerifyOTP}
                    >
                      {verifyotpLoading ? <ActionLoader /> : "Verify OTP"}
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
  );
};

export default Signup;

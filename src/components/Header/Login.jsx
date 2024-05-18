import React, { useState } from "react";
import loginCancel from "../../assets/images/group-7-PLd.png";
import "./Signup.css";
import "./Login.css";
import { UserAuth } from "../../useContext/useContext";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionLoader from "../Loader/ActionLoader";
import axios from "axios";
import OtpInput from "react-otp-input";
import { BASE_URL } from '../../api/api';
// import { useMutation } from "react-query";
import { resetPasswordApi, sendForgotPasswordVerificationEmail } from "../../api/user.api";
import { useMutation } from "@tanstack/react-query";
// import { BASE_URL } from "../../api/api";

// import { Link } from "react-router-dom";

const Login = ({
  signupToggle,
  toggleLogin,
  toggleResetPassword,
  isLoginFormOpen,
  loginDropdown,
  isLoginForm,
  isRecoverAccountOpen,
  isCreatePassOpen,
  // isViaPhoneFormOpen,
  isViaEmailFormOpen,
  // isViaPhoneOpen,
  isViaEmailOpen,
  isOtpOpen,
  toggleLoginForm,
  toggleViaEmail,
  // toggleViaPhone,
  // toggleViaPhoneForm,
  toggleViaEmailForm,
  toggleOtp,
  toggleRecoverAccount,
  handleInputFocus,
  handleInputBlur,
}) => {
  const { saveTokenAndUserDetails,setIsAuthenticated ,setLoginDrop} = UserAuth();
  const Navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [showPasswordPassword, setShowPasswordPassword] = useState(false);
  const [showNewPassword, setNewPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [resetData, setResetData] = useState({
    newPassword: "",
    repeatPassword: "",
  });
  const  [searchParams, setSearchParams]  = useSearchParams()

  const [email, setEmail] = useState("");

  const recoveryEmail = (e) => {
    setEmail(e.target.value);
  };

  const {mutate:sendForgotPasswordMail} = useMutation({
    mutationFn:sendForgotPasswordVerificationEmail,
    onSuccess:()=>{
      setOtpLoading(false)
    toggleViaEmail();

    },
    onError:()=>{
      setOtpLoading(false)

      toast.error('Some error occured please try again.')
    }
  })
  const {mutate:sendRestPasswordMail,} = useMutation({
    mutationFn:resetPasswordApi,
    onSuccess:()=>{
      setResetLoading(false)
      toggleLogin();
      toast.success('Password Reset Successful')


    },
    onError:(error)=>{
      setResetLoading(false)
console.log({error})
if(error?.response?.data?.detail){
  toast.error(error?.response?.data?.detail)
}else{
  toast.error('Some error occured please try again.')

}
    }
  })

  const confirmEmail = () => {
    if (!email) {
      toast.error("Email can not be empty !");
      return;
    }

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address !");
      return;
    }
    setOtpLoading(true)
    sendForgotPasswordMail({email})

  };

  // const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handResetdata = (e) => {
    const { name, value } = e.target;
    setResetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setshowPassword(!showPassword);
  };
  const togglePasswordPassword = () => {
    setShowPasswordPassword(!showPasswordPassword);
  };
  const toggleNewPassword = () => {
    setNewPassword(!showNewPassword);
  };

  const loginAuth = async () => {
    setLoginLoading(true);
    const emptyField = [];
    try {
      if (!loginData.email) {
        emptyField.push("email");
      }
      if (!loginData.password) {
        emptyField.push("password");
      }

      if (emptyField.length > 0) {
        setLoginLoading(false);
        return toast.error(
          `This field ${emptyField.join(", ")} can not be empty`
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginData.email)) {
        toast.error("Invalid email address !");
        return;
      }
      const formdata = new FormData()
      formdata.append('username',loginData.email)
      formdata.append('password',loginData.password)
      const response = await axios.post(
        `${BASE_URL}/auth/signin`,
        // "https://datawiztechapi.onrender.com/api/v1/login",
        // "http://localhost:7001/api/v1/login",
        // loginData
        formdata
      );
      if (response && response.status === 200 && response.data) {
        console.log({response})
        setIsAuthenticated(true)
        const user = {
          "first_name": "Nwokolo",
          "last_name": "Matthew",
          "phone_no": "08162047348",
          "gender": "Male",
          "country": "Nigeria",
          "email": "markothedevmail@gmail.com",
          "country_code": "081",
          "username": "markothedevmail@gmail.com",
          "user_type": "individual_user",
        }
        saveTokenAndUserDetails(
          JSON.stringify(response),
          user,
          'individual_user'
        )
        setLoginLoading(false);
        setLoginDrop(false)
        toast.success('Login successful')
        toggleLoginForm(false);


        // const verified = response.data.verified;
        // if (verified === true) {
        //   toast.success("Logged in successfully");
        //   setLoginLoading(false);
        //   const data = response.data;
        //   saveTokenAndUserDetails(data?.token, data?.user, data?.role);
        //   if (!data.occupation || !data.bio) {
        //     Navigate("/profile/update");
        //   }

        //   if (!data.reference) {
        //     Navigate("/profile/verify-account");
        //   }
        //   Navigate("/profile");
        //   toggleLoginForm(true);
        //   setLoginLoading(false);
        //   return;
        // } else {
        //   // signupToggle(loginData.email);
        //   toast.error("Email not verified, check email to verify")
        //   setLoginLoading(false);
        //   return;
        // }
      } else {
        toast.error("Server Error !");
        setLoginLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error && error.response && error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Error Occured !");
      }
      setLoginLoading(false);
      return;
    }
  };

  const resetPassword = async () => {
    console.log("loading stuff")
    const emptyField = [];
    try {
      if (!resetData.newPassword) {
        emptyField.push("password");
      }
      if (!resetData.repeatPassword) {
        emptyField.push("repeat password");
      }

      if (emptyField.length > 0) {
        // setResetLoading(false);
        return toast.error(
          `This field ${emptyField.join(", ")} can not be empty`
        );
      }

      if (resetData.newPassword !== resetData.repeatPassword) {
        // setResetLoading(false);
        return toast.error("Passwords does not match !");
      }
      const email=searchParams.get('email')
      const token=searchParams.get('token')
    setResetLoading(true);

      sendRestPasswordMail({
        email,
        token,
        password:resetData.newPassword
      })
      // const response = await axios.post(
      //   `https://datawiztechapi.onrender.com/api/v1/reset-password/${otp}`,
      //   { password: resetData.newPassword }
      // );
      // if (response && response.status === 200) {
      //   toast.success("Password reset successfully");
      //   setResetLoading(false);
      //   toggleLogin();
      //   return;
      // } else if (response.status === 404) {
      //   toast.error("Email/Password mismatch");
      // } else if (response.status === 400) {
      //   toast.error("Bad request");
      // } else {
      //   toast.error("Server Error !");
      // }
    } catch (error) {
      console.error("Error during login:", error);
      if (error && error.response && error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Error Occured !");
      }
    } finally {
      // setResetLoading(false);
    }
  };

  const sendOtp = async () => {
    setSendOtpLoading(true);
    try {
      if (!email) {
        toast.error("Email address is empty !");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Invalid email address !");
        return;
      }

      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/forget-password",
        { email }
      );
      console.log(response);
      if (response && response.status === 200) {
        const data = response.data;
        toast.success(data.message);
        setSendOtpLoading(false);
        toggleOtp();

        return;
      } else if (response.status === 404) {
        toast.error("Email/Password mismatch");
      } else if (response.status === 400) {
        toast.error("Bad request");
      } else {
        toast.error("Server Error !");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Error Occured !");
      }
    } finally {
      setSendOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    setVerifyOtpLoading(true);
    try {
      if (!otp) {
        toast.error("OTP is empty !");
        return;
      }

      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/verify-otp",
        { otp }
      );
      // console.log(response);
      if (response && response.status === 200) {
        const data = response.data;
        toast.success(data.message);
        setVerifyOtpLoading(false);
        toggleResetPassword();
        return;
      } else if (response.status === 404) {
        toast.error("Email/Password mismatch");
      } else if (response.status === 400) {
        toast.error("Bad request");
      } else {
        toast.error("Server Error !");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Error Occured !");
      }
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  return (
    <div
      className={`login-container ${
        isLoginFormOpen || loginDropdown ? "open" : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
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
                      name="email"
                      onChange={handleInputChange}
                      value={loginData.email}
                      id="email"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      autoComplete="off"
                    />
                    <label for="email" className="input__label email-label">
                      Email address
                    </label>
                  </div>
                  <div className="input__wrapper passinputcontainer">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="input__field pass-input"
                      name="password"
                      onChange={handleInputChange}
                      value={loginData.password}
                      placeholder="Your Password"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      autoComplete="off"
                    />
                    <label for="password" className="input__label pass-label">
                      Password
                    </label>
                    <i
                      className={`fa-solid ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } input__icon`}
                      onClick={togglePassword}
                    ></i>
                  </div>
                  <p className="forgotten-password my-3">
                    <span className="forgot-password">Forgot password? </span>
                    <span className="click-here" onClick={toggleRecoverAccount}>
                      Click here...
                    </span>
                  </p>
                  <button
                    type="submit"
                    className="login-btn-primary mt-4"
                    disabled={loginLoading}
                    onClick={loginAuth}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {loginLoading ? <ActionLoader /> : "Login"}
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

                  {/* <div
                  className="login-btn-primary mb-5"
                  onClick={toggleViaPhoneForm}
                >
                  Via phone number
                </div> */}
                  <div
                    className="login-btn-primary"
                    onClick={toggleViaEmailForm}
                  >
                    Via email address
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
                      value={email}
                      onChange={recoveryEmail}
                    />
                    <label for="email" className="input__label email-label">
                      Email Address
                    </label>
                  </div>
                  <div
                    className={`login-btn-primary ${
                      otpLoading
                        ? "d-flex align-items-center justify-content-center"
                        : "text-center"
                    }`}
                    onClick={confirmEmail}
                    style={{ cursor: otpLoading ? "not-allowed" : "pointer" }}
                  >
                    {otpLoading ? <ActionLoader /> : "Send Email"}
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
                  <p
                    className={`text-center py-3 ${
                      sendOtpLoading
                        ? "d-flex align-items-center justify-content-center"
                        : "text-center"
                    }`}
                  >
                    Email will be sent to {email}
                  </p>
                  <div
                    className="login-btn-primary"
                    // onClick={sendOtp}
                    style={{
                      cursor: sendOtpLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    {sendOtpLoading ? <ActionLoader /> : "Email Sent"}
                  </div>
                </div>
              </div>
            )}
            {isOtpOpen && (
              <div className="login-col-2 inputotp">
                <div className="login-content">
                  <div className="verifywithnumber">
                    <p className="login-text">Kindly input OTP</p>
                    <p onClick={toggleLoginForm}>
                      <img
                        className="login-cancel"
                        src={loginCancel}
                        alt="..."
                      />
                    </p>
                  </div>
                  <div className="d-flex justify-content-center">
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
                    className={`login-btn-primary ${
                      verifyOtpLoading
                        ? "d-flex align-items-center justify-content-center"
                        : "text-center"
                    }`}
                    onClick={verifyOtp}
                    style={{
                      cursor: verifyOtpLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    {verifyOtpLoading ? <ActionLoader /> : "Verify OTP"}
                  </button>
                </div>
              </div>
            )}
            {isCreatePassOpen && (
              <div className="login-col-2 create-new-pass">
                <div className="login-content">
                  <div className="login-text-container">
                    <p className="login-text">Reset password</p>
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
                      type={showPasswordPassword ? "text" : "password"}
                      className="input__field email-input"
                      placeholder="New Password"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      name="newPassword"
                      autoComplete="off"
                      onChange={handResetdata}
                      value={resetData.newPassword}
                    />
                    <label for="password" className="input__label email-label">
                      New Password
                    </label>
                    <i
                      className={`fa-solid ${
                        showPasswordPassword ? "fa-eye" : "fa-eye-slash"
                      } input__icon`}
                      onClick={togglePasswordPassword}
                    ></i>
                  </div>
                  <div className="input__wrapper passinputcontainer">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="input__field pass-input"
                      placeholder="Repeat Password"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      autoComplete="off"
                      name="repeatPassword"
                      onChange={handResetdata}
                      value={resetData.repeatPassword}
                    />
                    <label for="password" className="input__label pass-label">
                      Repeat Password
                    </label>
                    <i
                      className={`fa-solid ${
                        showNewPassword ? "fa-eye" : "fa-eye-slash"
                      } input__icon`}
                      onClick={toggleNewPassword}
                    ></i>
                  </div>
                  <button
                    className={`login-btn-primary mt-2 ${
                      resetLoading
                        ? "d-flex align-items-center justify-content-center"
                        : "text-center"
                    }`}
                    onClick={resetPassword}
                    style={{ cursor: resetLoading ? "not-allowed" : "pointer" }}
                  >
                    {resetLoading ? <ActionLoader /> : "Reset"}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;

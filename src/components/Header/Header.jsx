import React, { useState, useRef, useEffect } from "react";
// import {Link}

// import loginCancel from "../../assets/images/group-7-PLd.png";
// import individual from "../../assets/images/icons8-customer-100-4.png";
// import cooperate from "../../assets/images/icons8-user-account-100-2-bg.png";
// import cooperateB from "../../assets/images/cooperate.png";
// import individualB from "../../assets/images/individual.png";
import "./Signup.css";
import "./Login.css";
import Signup from "./Signup";
import Login from "./Login";
import Head from "./Head";
import { UserAuth } from "../../useContext/useContext";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

const Header = ({ active }) => {
  const { loginDropdown, setLoginDrop } = UserAuth();
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
  const [signupCorperateOtp, setSignupCorperateOtp] = useState(false);
  const [signupPhone, setSignupPhone] = useState(false);
  const [signupCorperatePhone, setSignupCorperatePhone] = useState(false);
  const [signupDone, setSignupDone] = useState(false);
  const [signupForm, setSignupForm] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  // const [cooperateContentB, setCooperateContentB] = useState(false);
  const [cooperateNumber, setCooperateNumber] = useState(1);
  const [inputStyle, setInputStyle] = useState({});

  const signupToggle = (email) => {
    setUserEmail(email)
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
    setSignupCorperateOtp(false);
    setSignupCorperatePhone(false);
  };

  const toggleCorperateOtp = () => {
    setSignupForm(false);
    setSignupCorperateOtp(true);
    setSignupCorperatePhone(false);
  };
  const toggleCorperatePhone = (email) => {
    setUserEmail(email)
    setSignupForm(false);
    setSignupCorperateOtp(false);
    setSignupCorperatePhone(true);
  };
  const cancelCooperate = () => {
    setCooperateContentA(true);
    setCooperateContentB(false);
    setCooperateNumber(1);
    setSignupCorperatePhone(false);
    setSignupCorperateOtp(false);
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
    setLoginDrop(!isLoginFormOpen);
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

  const toggleResetPassword = () => {
    setIsViaEmailFormOpen(false);
    setIsViaEmailOpen(false);
    setIsViaPhoneOpen(false);
    setIsRecoverAccountOpen(false);
    setIsLoginForm(false);
    setIsSignupForm(false);
    setIsOtpOpen(false);
    setIscreatePassOpen(true);
    setIsViaPhoneFormOpen(false);
  };
  const toggleLogin = () => {
    setIsViaEmailFormOpen(false);
    setIsViaEmailOpen(false);
    setIsViaPhoneOpen(false);
    setIsRecoverAccountOpen(false);
    setIsLoginForm(true);
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
    setLoginDrop(false);
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
const  [searchParams, setSearchParams]  = useSearchParams()
  useEffect(()=>{

const isResetPassword  = searchParams.get('reset_password')
if(isResetPassword){
      console.log({
        token:searchParams.get('token')
      })
  setLoginDrop(true)
  setIsLoginForm(false)
setIscreatePassOpen(true)
}
  },[])

  useEffect(()=>{
const isLogin  = searchParams.get('login')
if(isLogin){
  setLoginDrop(true)
  setIsLoginForm(true)

}


  },[])

  useEffect(()=>{
    const isInvalidToken = searchParams.get('invalid_token')
    if(isInvalidToken){
      toast.error('Token expired try again')
      setLoginDrop(true)
      setIsLoginForm(false)
      setIsViaEmailFormOpen(true)
    }
  },[])
  return (
    <div>
      <Signup
        isSignupFormOpen={isSignupFormOpen}
        signupCorperateOtp={signupCorperateOtp}
        signupCorperatePhone={signupCorperatePhone}
        toggleCorperateOtp={toggleCorperateOtp}
        toggleCorperatePhone={toggleCorperatePhone}
        individualContent={individualContent}
        cooperateContent={cooperateContent}
        cooperateContentA={cooperateContentA}
        cooperateContentB={cooperateContentB}
        signupOtp={signupOtp}
        signupPhone={signupPhone}
        signupDone={signupDone}
        signupForm={signupForm}
        cooperateNumber={cooperateNumber}
        signupToggle={signupToggle}
        userEmail={userEmail}
        signupOtpToggle={signupOtpToggle}
        signupDoneToggle={signupDoneToggle}
        toggleCooperate={toggleCooperate}
        cancelCooperate={cancelCooperate}
        toggleIndividualContent={toggleIndividualContent}
        toggleCooperateContent={toggleCooperateContent}
        toggleSignupForm={toggleSignupForm}
        handleInputFocus={handleInputFocus}
        handleInputBlur={handleInputBlur}
        inputRefs={inputRefs}
        moveToNext={moveToNext}
        setSignupPhone={setSignupPhone}
      />
      <Login
      signupToggle={signupToggle}
        isLoginFormOpen={isLoginFormOpen}
        loginDropdown={loginDropdown}
        isLoginForm={isLoginForm}
        isRecoverAccountOpen={isRecoverAccountOpen}
        isCreatePassOpen={isCreatePassOpen}
        isViaPhoneFormOpen={isViaPhoneFormOpen}
        isViaEmailFormOpen={isViaEmailFormOpen}
        isViaPhoneOpen={isViaPhoneOpen}
        isViaEmailOpen={isViaEmailOpen}
        userEmail={userEmail}
        isOtpOpen={isOtpOpen}
        toggleLoginForm={toggleLoginForm}
        toggleViaEmail={toggleViaEmail}
        toggleViaPhone={toggleViaPhone}
        toggleViaPhoneForm={toggleViaPhoneForm}
        toggleViaEmailForm={toggleViaEmailForm}
        toggleOtp={toggleOtp}
        toggleRecoverAccount={toggleRecoverAccount}
        handleInputFocus={handleInputFocus}
        handleInputBlur={handleInputBlur}
        toggleResetPassword={toggleResetPassword}
        toggleLogin={toggleLogin}
      />
      <Head
        active={active}
        toggleLoginForm={toggleLoginForm}
        toggleSignupForm={toggleSignupForm}
      />
    </div>
  );
};

export default Header;

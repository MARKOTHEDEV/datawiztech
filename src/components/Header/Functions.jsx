import React, { useRef, useState } from "react";

export function useFormFunctions() {
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
  return {
    isLoginFormOpen,
    isLoginForm,
    isSignupForm,
    isSignupFormOpen,
    isRecoverAccountOpen,
    isCreatePassOpen,
    isViaPhoneFormOpen,
    isViaEmailFormOpen,
    individualContent,
    cooperateContent,
    cooperateContentA,
    cooperateContentB,
    signupOtp,
    signupPhone,
    signupDone,
    signupForm,
    cooperateNumber,
    inputStyle,
    isViaPhoneOpen,
    isViaEmailOpen,
    isOtpOpen,
    signupToggle,
    signupOtpToggle,
    signupDoneToggle,
    toggleCooperate,
    cancelCooperate,
    toggleIndividualContent,
    toggleCooperateContent,
    toggleLoginForm,
    toggleViaEmail,
    toggleViaPhone,
    toggleViaPhoneForm,
    toggleViaEmailForm,
    toggleOtp,
    toggleRecoverAccount,
    toggleSignupForm,
    handleInputFocus,
    handleInputBlur,
    inputRefs,
    moveToNext,
  };
}

// export default Functions;

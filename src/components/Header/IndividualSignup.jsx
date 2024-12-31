import React, { useState } from "react";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";
import toast from "react-hot-toast" 
import {useNavigate} from "react-router-dom"
import countriesAndCodes from "../../hooks/countriesAndCodes";
import { handleErrorPopUp } from "../../api/api";
import countriesAndPhoneNumberCode from "../../hooks/countriesAndPhoneNumberCode";
import PasswordStrengthChecker from "../PasswordChecker";
import { SuccessModal } from "../DataSearch/Modal";

const IndividualSignup = ({
  individualContent,
  handleInputFocus,
  handleInputBlur,
  toggleSignupForm,
  signupToggle,
}) => {
  const Navigate = useNavigate()
  const [openSuc,setOpenSuc] = useState(false)
  const [suc,setSuc] = useState({head:'',body:''})
  const [loading, setLoading] = useState(false);
  const { createIndividualAuth } = UserAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    username: "",
    email: "",
    phone_number: "",
    password: "", 
    // country: "", 
    role: "Individual",
    address:"",
    country_code:""
  });

  const [passwordSee,setPasswordSee] = useState(false);
  const [passwordSee2,setPasswordSee2] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emptyFields = Object.entries(formData).filter(([key, value]) => !value.trim());

    if (emptyFields.length > 0) {
      // Display toast error message for empty fields
      emptyFields.forEach(([key, value]) => {
        toast.error(`${key.replace('_', ' ')} cannot be empty`);
      });
  
      setLoading(false);
      return;
    }
    if(formData.password !== formData.confirm_password){
      toast.error('Password and Confirm Password does not match')
      setLoading(false);
      return
    }
    // console.log({formData, country:countriesAndPhoneNumberCode.filter((d,)=>d.short_code===formData.country_code)[0]})
    // return 
    try {
      const response = await createIndividualAuth(
      {
        first_name:formData.first_name,
        last_name:formData.last_name,
        phone_no:formData.phone_number,
        gender: formData.gender,
        username:formData.username,
        email:formData.email,
        password:formData.password,
        role: 'individual_user',
        address: formData.address,
        country_code:formData.country_code,
        country:countriesAndPhoneNumberCode.filter((d,)=>d.short_code===formData.country_code)[0].country, 
      }
      );
      // console.log(response)
      if (response.status === 201) {
        setLoading(false);
        // toast.success()
         setOpenSuc(true)
      setSuc({
        head:'Sign up',
        body:response.message
      })
        signupToggle(formData.email)
        setFormData({
          first_name: "",
          last_name: "",
          gender: "",
          username: "",
          email: "",
          phone_number: "",
          password: "",
          role: "Individual",
          address:""
        });
      }else{
        setLoading(false);
        toast.error("Error occured")
      }
    } catch (error) {
      setLoading(false);

      handleErrorPopUp(error)
    }
  };

  return (
    <>
     <SuccessModal
      open={openSuc}
      setOpen={setOpenSuc}
      body={suc.body}
      head={suc.head}
      />
        <form onSubmit={handleSignup}>
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
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                id="individualfirstName"
              />
              <label
                htmlFor="individualfirstName"
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
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                id="individuallastName"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <label
                htmlFor="individuallastName"
                className="input__label pass-label"
              >
                Last Name
              </label>
            </div>
            <div className="input__wrapper usernameinputcontainer mb-3">
              <input
                type="text"
                autoComplete="off"
                className="input__field email-input"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                id="individualusername"
              />
              <label
                htmlFor="individualusername"
                className="input__label email-label"
              >
                Username
              </label>
            </div>
            <div className="input__wrapper phoneinputcontainer mb-3">
              
               <select
                className="input__field email-input"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                name="country_code"
                value={formData.country}
                onChange={handleInputChange}
                id="individualcountry"
                autoComplete="off"
              >
                <option value="">Select Country Code</option>
                {
                  countriesAndPhoneNumberCode.map((d)=>(
                    <option value={d.short_code}>{d.code} ({d.country})</option>
                  ))
                }
              </select>
              <label
                htmlFor="individualcountry"
                className="input__label pass-label"
              >
               Country Code
              </label>
            </div>

            <div className="input__wrapper phoneinputcontainer mb-3">
              <input
                type="number"
                className="input__field pass-input"
                placeholder="Phone Number"
                name="phone_number"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={formData.phone_number}
                onChange={handleInputChange}
                id="individualphoneNumber"
                autoComplete="off"
              />
              <label
                htmlFor="individualphoneNumber"
                className="input__label pass-label"
              >
                Phone Number
              </label>
            </div>

            <div className="input__wrapper emailinputcontainer mb-3">
              <select
                className="input__field email-input"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                id="individualGender"
                autoComplete="off"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label
                htmlhtmlFor="individualGender"
                className="input__label email-label"
              >
                Gender
              </label>
            </div>

            <div className="input__wrapper emailinputcontainer mb-3">
              <input
                type="email"
                className="input__field email-input"
                placeholder="Email address"
                name="email"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={formData.email}
                onChange={handleInputChange}
                id="individualemailAddress"
                autoComplete="off"
              />
              <label
                htmlFor="individualemailAddress"
                className="input__label email-label"
              >
                Email address
              </label>
            </div>
            {/* <div className="input__wrapper passinputcontainer mb-3">
              <input
                type={passwordSee2?'text':"password"}

                className="input__field pass-input"
                placeholder="Your Password"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                id="individualpassword"
                autoComplete="off"
                autocomplete="new-password"
              />
              <label
                htmlFor="individualpassword"
                className="input__label pass-label"
              >
                Password
              </label>
              <i className={`fa-solid ${passwordSee2?'fa-eye':'fa-eye-slash'}  input__icon`}
              onClick={()=>{
                setPasswordSee2(!passwordSee2)
              }}
              ></i>
            </div> */}

            <div>
              <PasswordStrengthChecker 
              handleInputChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              formPassword={FormData.password}
              name={'password'}
              id={'individualpassword'}
              />
            </div>

            <div className="input__wrapper passinputcontainer mb-3">
              <input
                type={passwordSee?'text':"password"}
                className="input__field pass-input"
                placeholder="Confirm Password"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                id="individualconfirm_password"
                autoComplete="off"
                autocomplete="new-password"
              />
              <label
                htmlFor="individualpassword"
                className="input__label pass-label"
              >
                Confirm Password
              </label>
              
              <i className={`fa-solid ${passwordSee?'fa-eye':'fa-eye-slash'}  input__icon`}
              onClick={()=>{
                setPasswordSee(!passwordSee)
              }}
              ></i>
            </div>
            <div className="input__wrapper passinputcontainer mb-3">
              <textarea
                className="input__field pass-input"
                placeholder="Your Address"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                id="individualAddress"
                autoComplete="off"
                autocomplete="new-address"
              />
              <label
                htmlFor="individualAddress"
                className="input__label pass-label"
              >
                Address
              </label>
              {/* <i className="fa-solid fa-eye input__icon"></i> */}
            </div>
            <div className="individual-button d-flex justify-content-end mt-3">
              <button
                type="button"
                className="individual-cancel-btn"
                onClick={toggleSignupForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="individual-signup-btn"
                // onClick={signupToggle}
                disabled ={loading}
              >
                {loading ? <ActionLoader /> : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
     
    </>
  );
};

export default IndividualSignup;

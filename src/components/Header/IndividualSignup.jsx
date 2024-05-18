import React, { useState } from "react";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";
import toast from "react-hot-toast" 
import {useNavigate} from "react-router-dom"

const IndividualSignup = ({
  individualContent,
  handleInputFocus,
  handleInputBlur,
  toggleSignupForm,
  signupToggle,
}) => {
  const Navigate = useNavigate()
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
    country: "", 
    role: "Individual",
    address:""
  });

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
    try {
      const response = await createIndividualAuth(
        formData.first_name,
        formData.last_name,
        formData.gender,
        formData.username,
        formData.email,
        formData.phone_number,
        formData.password,
        formData.role, 
        formData.country, 
        formData.address, 
      );
      // console.log(response)
      if (response.status === 200) {
        setLoading(false);
        toast.success(response.message)
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
      console.log("Error registering user:", error.message);
      setLoading(false);
      if(error.response.data){
      toast.error(error.response.data.message)
      }else{
        toast.error("Error registering user")
      }
    }
  };

  return (
    <>
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
            <div className="input__wrapper phoneinputcontainer mb-3">
              <input
                type="text"
                className="input__field pass-input"
                placeholder="Country"
                name="country"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={formData.country}
                onChange={handleInputChange}
                id="individualcountry"
                autoComplete="off"
              />
              <label
                htmlFor="individualcountry"
                className="input__label pass-label"
              >
               Country
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
            <div className="input__wrapper passinputcontainer mb-3">
              <input
                type="password"
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
              <i className="fa-solid fa-eye input__icon"></i>
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
              <i className="fa-solid fa-eye input__icon"></i>
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

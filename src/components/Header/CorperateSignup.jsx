import React, { useState } from "react";
import toast from "react-hot-toast";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CorperateSignup = ({
  cooperateContent,
  cooperateContentA,
  handleInputFocus,
  handleInputBlur,
  toggleSignupForm,
  toggleCooperate,
  cooperateContentB,
  cancelCooperate,
  toggleCorperateOtp,
  toggleCorperatePhone,
}) => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { saveTokenAndUserDetails, setToken } = UserAuth();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    role: "Corperate",
    organizationName: "",
    organizationType: "",
    address: "",
    country: "",
    gender:""
  });

  const handlecorperateInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCorperateSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => !value.trim()
    );

    if (emptyFields.length > 0) {
      // Display toast error message for empty fields
      emptyFields.forEach(([key, value]) => {
        toast.error(`${key.replace("_", " ")} cannot be empty`);
      });

      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "https://datawiztech-backend.onrender.com/api/v1/auth/sign_up/corporate_user",
        {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_no: formData.phone_number,
          user_type: 'corporate_user',
          organization_name: formData.organizationName,
          organization_type: formData.organizationType,
          country_code: formData.address,
          country: formData.country,
          gender:formData.gender
        }
      );
      // console.log(response)
      if (response && response.status === 201) {
        setLoading(false);
      toast.success("Account created, please check for a verification mail");

        // setToken(response.data.token);
        // localStorage.setItem("datawiztoken", response.data.token);
        // toast.success(response.data.message);
        toggleCorperatePhone(formData.email);
        setFormData({
          first_name: "",
          last_name: "",
          gender: "",
          username: "",
          email: "",
          country: "",
          phone_number: "",
          password: "",
          role: "Corperate",
          gender:""
        });
      } else {
        setLoading(false);
        toast.error("Signup failed");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error registering user:", error.message);
      if (error && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        return;
      }

      toast.error("Error occured !");
    }
  };
  return (
    <div className={`cooperate-content ${cooperateContent ? "active" : ""}`}>
      {cooperateContentA && (
        <div className="cooperateA pt-3">
          <div className="input__wrapper firstNameinputcontainer mb-3">
            <input
              type="text"
              autoComplete="off"
              className="input__field email-input"
              placeholder="First Name"
              name="first_name"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              value={formData.first_name}
              onChange={handlecorperateInputChange}
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
              name="last_name"
              value={formData.last_name}
              onChange={handlecorperateInputChange}
            />
            <label for="cooperatelastName" className="input__label pass-label">
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
              name="phone_number"
              value={formData.phone_number}
              onChange={handlecorperateInputChange}
            />
            <label
              for="cooperatephoneNumber"
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
                onChange={handlecorperateInputChange}
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
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              id="cooperateemailAddress"
              autoComplete="off"
              name="email"
              value={formData.email}
              onChange={handlecorperateInputChange}
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
              type={showPassword ? "text" : "password"}
              className="input__field pass-input"
              placeholder="Your Password"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              id="cooperatepassword"
              autoComplete="off"
              name="password"
              value={formData.password}
              onChange={handlecorperateInputChange}
            />
            <label for="cooperatepassword" className="input__label pass-label">
              Password
            </label>
            <i
              className={`fa-solid input__icon ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              }`}
              onClick={togglePassword}
            ></i>
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
        <div className="cooperateB pt-3">
          <div className="input__wrapper lastnameinputcontainer  mb-3">
            <input
              type="text"
              autoComplete="off"
              className="input__field pass-input"
              placeholder="Country"
              id="country"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              name="country"
              value={formData.country}
              onChange={handlecorperateInputChange}
            />
            <label for="country" className="input__label pass-label">
              Country
            </label>
          </div>
          <div className="input__wrapper lastnameinputcontainer  mb-3">
            <input
              type="text"
              autoComplete="off"
              className="input__field pass-input"
              placeholder="Organization Name"
              id="organizationName"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              name="organizationName"
              value={formData.organizationName}
              onChange={handlecorperateInputChange}
            />
            <label for="organizationName" className="input__label pass-label">
              Organization Name
            </label>
          </div>

          <div className="input__wrapper emailinputcontainer mb-3">
            <select
              className="input__field email-input"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              id="organizationType"
              name="organizationType"
              value={formData.organizationType}
              onChange={handlecorperateInputChange}
            >
              <option value="">Choose Organization Type</option>
              <option value="Corporation">Corporation</option>
              <option value="Partnership">Partnership</option>
              <option value="Sole proprietorship">Sole proprietorship</option>
              <option value="Limited liability company (LLC)">
                Limited liability company (LLC)
              </option>
              <option value="Nonprofit organization">
                Nonprofit organization
              </option>
              <option value="Cooperative">Cooperative</option>
              <option value="Franchise">Franchise</option>
              <option value="Joint venture">Joint venture</option>
              <option value="Holding company">Holding company</option>
              <option value="S Corporation">S Corporation</option>
            </select>
            <label
              htmlFor="organizationType"
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
              name="address"
              value={formData.address}
              onChange={handlecorperateInputChange}
            />
            <label for="cooperateaddress" className="input__label pass-label">
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
              onClick={handleCorperateSignup}
            >
              {loading ? <ActionLoader /> : "Sign Up"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorperateSignup;

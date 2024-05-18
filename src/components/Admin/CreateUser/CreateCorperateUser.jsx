import React, { useState } from "react";
import toast from "react-hot-toast";
import { UserAuth } from "../../../useContext/useContext";
import axios from "axios";
import "./AdminSignup.css";
import ActionLoader from "../../Loader/ActionLoader";

const CreateCorperateUser = () => {
  const { token } = UserAuth();
  const [cooperateA, setCooperateA] = useState(false);
  const [individualA, setIndividualA] = useState(true);
  const [passcode, setpasscode] = useState(true);
  const [tabA, setTabA] = useState(true);
  const [tabB, setTabB] = useState(false);
  const [sBCorperateloading, setSBCorperateloading] = useState(false);

  const togglePasscode = () => {
    setpasscode(!passcode);
  };

  const showTabA = () => {
    setTabA(true);
    setTabB(false);
    setCooperateA(false);
    setIndividualA(true);
  };
  const showTabB = () => {
    setTabB(true);
    setTabA(false);
    setCooperateA(true);
    setIndividualA(false);
  };

  const [corperateDetails, setCorperateDetails] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    role: "Corperate",
    organizationName: "",
    organizationType: "",
    address: "",
    country: "",
  });
  const handlecorperateInputChange = (e) => {
    const { name, value } = e.target;
    setCorperateDetails((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCorperateSignup = async () => {
    setSBCorperateloading(true);

    const emptyFields = Object.entries(corperateDetails).filter(
      ([key, value]) => !value.trim()
    );

    if (emptyFields.length > 0) {
      emptyFields.forEach(([key, value]) => {
        toast.error(`${key.replace("_", " ")} cannot be empty`);
      });
      setSBCorperateloading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/admin/admin-register",
        {
          email: corperateDetails.email,
          password: corperateDetails.password,
          first_name: corperateDetails.first_name,
          last_name: corperateDetails.last_name,
          phone_number: corperateDetails.phone_number,
          role: corperateDetails.role,
          organizationName: corperateDetails.organizationName,
          organizationType: corperateDetails.organizationType,
          address: corperateDetails.address,
          country: corperateDetails.country,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log(response)
        toast.success(response.data.message);
        setCorperateDetails({
          first_name: "",
          last_name: "",
          phone_number: "",
          email: "",
          password: "",
          role: "Corperate",
          organizationName: "",
          organizationType: "",
          address: "",
        });

        setSBCorperateloading(false);
        return;
      } else {
        toast.error("Error occured");
      }
    } catch (error) {
      console.log("Error registering user:", error);
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else if(error.code  === "ERR_NETWORK"){
        toast.error("Network Error")
      }else {
        toast.error("Error registering user");
      }
    } finally {
      setSBCorperateloading(false);
    }
  };

  const [sBloading, setSBloading] = useState(false);


  const [individualDetails, setIndividualDetails] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    username: "",
    email: "",
    password: "",
    role: "Individual",
    address: "",
    gender: "",
    country: "",
  });

  const handleindividualInputChange = (e) => {
    const { name, value } = e.target;
    setIndividualDetails((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleIndividualSignup = async () => {
    setSBloading(true);

    const emptyFields = Object.entries(individualDetails).filter(
      ([key, value]) => !value.trim()
    );

    if (emptyFields.length > 0) {
      emptyFields.forEach(([key, value]) => {
        toast.error(`${key.replace("_", " ")} cannot be empty`);
      });
      setSBloading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/admin/admin-register",
        {
          email: individualDetails.email,
          password: individualDetails.password,
          first_name: individualDetails.first_name,
          last_name: individualDetails.last_name,
          phone_number: individualDetails.phone_number,
          role: individualDetails.role,
          username: individualDetails.username,
          gender: individualDetails.gender,
          address: individualDetails.address,
          country: individualDetails.country,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        toast.success(response.data.message);
        setIndividualDetails({
          first_name: "",
          last_name: "",
          phone_number: "",
          username: "",
          email: "",
          password: "",
          role: "Individual",
          address: "",
          gender: "",
          country: "",
        });

        setSBloading(false);
        return;
      } else {
        toast.error("Error occured");
      }
    } catch (error) {
      console.log("Error registering user:", error);
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error registering user");
      }
    } finally {
      setSBloading(false);
    }
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div className="admin-signup-type">
            <div
              className={`admin-individual ${tabA ? "active" : ""}`}
              onClick={showTabA}
            >
              Individual
            </div>
            <div
              className={`admin-corperate ${tabB ? "active" : ""}`}
              onClick={showTabB}
            >
              Corperate
            </div>
          </div>
          <div className={`cooperate-content ${individualA ? "active" : ""}`}>
            <div className="cooperateA pb-5 pt-4">
              <div className="input__wrapper firstNameinputcontainer mb-3">
                <input
                  type="text"
                  autoComplete="off"
                  className="input__field email-input"
                  placeholder="First Name"
                  name="first_name"
                  value={individualDetails.first_name}
                  onChange={handleindividualInputChange}
                  id="cooperateFirstName"
                />
                <label
                  for="cooperateFirstName"
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
                  id="cooperateLastName"
                  name="last_name"
                  value={individualDetails.last_name}
                  onChange={handleindividualInputChange}
                />
                <label
                  for="cooperateLastName"
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
                  id="cooperatePhoneNumber"
                  name="phone_number"
                  value={individualDetails.phone_number}
                  onChange={handleindividualInputChange}
                />
                <label
                  for="cooperatePhoneNumber"
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
                  id="cooperateEmailAddress"
                  autoComplete="off"
                  name="email"
                  value={individualDetails.email}
                  onChange={handleindividualInputChange}
                />
                <label
                  for="cooperateEmailAddress"
                  className="input__label email-label"
                >
                  Email address
                </label>
              </div>
              <div className="input__wrapper emailinputcontainer mb-3">
                <textarea
                  type="text"
                  className="input__field email-input"
                  placeholder="Email address"
                  id="indiviadualAddress"
                  autoComplete="off"
                  name="address"
                  value={individualDetails.address}
                  onChange={handleindividualInputChange}
                />
                <label
                  for="indiviadualAddress"
                  className="input__label email-label"
                >
                  Address
                </label>
              </div>
              <div className="input__wrapper emailinputcontainer mb-3">
                <input
                  type="text"
                  className="input__field email-input"
                  placeholder="Email address"
                  id="individualCountry"
                  autoComplete="off"
                  name="country"
                  value={individualDetails.country}
                  onChange={handleindividualInputChange}
                />
                <label
                  for="individualCountry"
                  className="input__label email-label"
                >
                  Country
                </label>
              </div>
              <div className="input__wrapper emailinputcontainer mb-3">
                <select
                  className="input__field email-input"
                  placeholder="Email address"
                  id="individualGender"
                  autoComplete="off"
                  name="gender"
                  value={individualDetails.gender}
                  onChange={handleindividualInputChange}
                >
                  <option>Choose a gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label
                  for="individualGender"
                  className="input__label email-label"
                >
                  Gender
                </label>
              </div>
              <div className="input__wrapper emailinputcontainer mb-3">
                <input
                  type="text"
                  className="input__field email-input"
                  placeholder="Username"
                  id="individualUsername"
                  autoComplete="off"
                  name="username"
                  value={individualDetails.username}
                  onChange={handleindividualInputChange}
                />
                <label
                  for="individualUsername"
                  className="input__label email-label"
                >
                  Username
                </label>
              </div>
              <div className="input__wrapper passinputcontainer mb-3">
                <input
                  type={passcode ? "password" : "text"}
                  className="input__field pass-input"
                  placeholder="Your Password"
                  id="cooperatePassword"
                  autoComplete="off"
                  name="password"
                  value={individualDetails.password}
                  onChange={handleindividualInputChange}
                />
                <label
                  for="cooperatePassword"
                  className="input__label pass-label"
                >
                  Password
                </label>
                <i
                  className={`fa-solid ${
                    passcode ? "fa-eye" : "fa-eye-slash"
                  } input__icon`}
                  onClick={togglePasscode}
                ></i>
              </div>
              <div className="individual-button d-flex justify-content-end mt-3">
                <button
                  type="submit"
                  className={`individual-signup-btn ${
                    sBloading
                      ? "d-flex justify-content-center align-items-center"
                      : ""
                  }`}
                  onClick={handleIndividualSignup}
                  style={{ cursor: sBloading ? "not-allowed" : "pointer" }}
                >
                  {sBloading ? <ActionLoader /> : "Register"}
                </button>
              </div>
            </div>
          </div>
          <div className={`cooperate-content ${cooperateA ? "active" : ""}`}>
            <div className="cooperateA py-5">
              <div className="input__wrapper firstNameinputcontainer mb-3">
                <input
                  type="text"
                  autoComplete="off"
                  className="input__field email-input"
                  placeholder="First Name"
                  name="first_name"
                  value={corperateDetails.first_name}
                  onChange={handlecorperateInputChange}
                  id="cooperateFirstName"
                />
                <label
                  for="cooperateFirstName"
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
                  id="cooperateLastName"
                  name="last_name"
                  value={corperateDetails.last_name}
                  onChange={handlecorperateInputChange}
                />
                <label
                  for="cooperateLastName"
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
                  id="cooperatePhoneNumber"
                  name="phone_number"
                  value={corperateDetails.phone_number}
                  onChange={handlecorperateInputChange}
                />
                <label
                  for="cooperatePhoneNumber"
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
                  id="cooperateEmailAddress"
                  autoComplete="off"
                  name="email"
                  value={corperateDetails.email}
                  onChange={handlecorperateInputChange}
                />
                <label
                  for="cooperateEmailAddress"
                  className="input__label email-label"
                >
                  Email address
                </label>
              </div>
              <div className="input__wrapper emailinputcontainer mb-3">
                <textarea
                  type="text"
                  className="input__field email-input"
                  placeholder="Email address"
                  id="corperateAddress"
                  autoComplete="off"
                  name="address"
                  value={corperateDetails.address}
                  onChange={handlecorperateInputChange}
                />
                <label
                  for="corperateAddress"
                  className="input__label email-label"
                >
                  Address
                </label>
              </div>
              <div className="input__wrapper emailinputcontainer mb-3">
                <input
                  type="text"
                  className="input__field email-input"
                  placeholder="Country"
                  id="cooperateCountry"
                  autoComplete="off"
                  name="country"
                  value={corperateDetails.country}
                  onChange={handlecorperateInputChange}
                />
                <label
                  for="cooperateCountry"
                  className="input__label email-label"
                >
                  Country
                </label>
              </div>
              <div className="input__wrapper passinputcontainer mb-3">
                <input
                  type="password"
                  className="input__field pass-input"
                  placeholder="Your Password"
                  id="cooperatePassword"
                  autoComplete="off"
                  name="password"
                  value={corperateDetails.password}
                  onChange={handlecorperateInputChange}
                />
                <label
                  for="cooperatePassword"
                  className="input__label pass-label"
                >
                  Password
                </label>
                <i className="fa-solid fa-eye input__icon"></i>
              </div>
              <div className="input__wrapper lastnameinputcontainer mb-3">
                <input
                  type="text"
                  autoComplete="off"
                  className="input__field pass-input"
                  placeholder="Organization Name"
                  id="organization_Name"
                  name="organizationName"
                  value={corperateDetails.organizationName}
                  onChange={handlecorperateInputChange}
                />
                <label
                  for="organization_Name"
                  className="input__label pass-label"
                >
                  Organization Name
                </label>
              </div>

              <div className="input__wrapper emailinputcontainer mb-3">
                <select
                  className="input__field email-input"
                  id="organization_type"
                  name="organizationType"
                  value={corperateDetails.organizationType}
                  onChange={handlecorperateInputChange}
                >
                  <option value="">Choose Organization Type</option>
                  <option value="Corporation">Corporation</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Sole proprietorship">
                    Sole proprietorship
                  </option>
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
                  <option value="S Corporation">Others</option>
                </select>
                <label
                  htmlFor="organization_type"
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
                  id="cooperateAddress"
                  autoComplete="off"
                  name="address"
                  value={corperateDetails.address}
                  onChange={handlecorperateInputChange}
                />
                <label
                  for="cooperateAddress"
                  className="input__label pass-label"
                >
                  Address
                </label>
              </div>
              <div className="individual-button d-flex justify-content-end mt-3">
                <button
                  type="submit"
                  className={`individual-signup-btn ${
                    sBCorperateloading
                      ? "d-flex justify-content-center align-items-center"
                      : ""
                  }`}
                  onClick={handleCorperateSignup}
                  style={{
                    cursor: sBCorperateloading ? "not-allowed" : "pointer",
                  }}
                >
                  {sBCorperateloading ? (
                    <ActionLoader />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default CreateCorperateUser;

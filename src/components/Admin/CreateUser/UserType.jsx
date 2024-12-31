import React, { useState } from "react";
import toast from "react-hot-toast";
import { UserAuth } from "../../../useContext/useContext";
import axios from "axios";
import ActionLoader from "../Loader/ActionLoader";

const CreateIndividualUser = () => {
  const { token } = UserAuth();
  const [individualContentA, setIndividualContentA] = useState(true);
  const [individualContentB, setIndividualContentB] = useState(false);
  const [sBloading, setSBloading] = useState(false);

  const showContentB = () => {
    setIndividualContentB(true);
    setIndividualContentA(false);
  };
  const removeContentB = () => {
    setIndividualContentB(false);
    setIndividualContentA(true);
  };

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
  });

  const handleindividualInputChange = (e) => {
    const { name, value } = e.target;
    setIndividualDetails((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCorperateSignup = async () => {
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
        "https://datawiztechapi.onrender.com/api/v1/register",
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
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
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
        });

        setSBloading(false);
        return;
      } else {
        toast.error("Error occured");
      }
    } catch (error) {
      console.log("Error registering user:", error.message);
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
      <div className="row my-auto">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div className={`cooperate-content active`}>
            {individualContentA && (
              <div className="cooperateA py-5">
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
                <div className="input__wrapper passinputcontainer mb-3">
                  <input
                    type="password"
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
                  <i className="fa-solid fa-eye input__icon"></i>
                </div>
                <div className="individual-button d-flex justify-content-end mt-3">
                  <button
                    type="submit"
                    className="individual-signup-btn"
                    onClick={showContentB}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {individualContentB && (
              <div className="cooperateB py-5">
                <div className="input__wrapper lastnameinputcontainer mb-3">
                  <input
                    type="text"
                    autoComplete="off"
                    className="input__field pass-input"
                    placeholder="Organization Name"
                    id="organization_Name"
                    name="organizationName"
                    value={individualDetails.organizationName}
                    onChange={handleindividualInputChange}
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
                    value={individualDetails.organizationType}
                    onChange={handleindividualInputChange}
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
                    value={individualDetails.address}
                    onChange={handleindividualInputChange}
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
                    className="individual-cancel-btn"
                    onClick={removeContentB}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`individual-signup-btn ${
                      sBloading
                        ? "d-flex justify-content-center align-items-center"
                        : ""
                    }`}
                    onClick={handleCorperateSignup}
                    style={{ cursor: sBloading ? "not-allowed" : "pointer" }}
                  >
                    {sBloading ? <ActionLoader /> : "Register Sub Corperate"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default CreateIndividualUser;

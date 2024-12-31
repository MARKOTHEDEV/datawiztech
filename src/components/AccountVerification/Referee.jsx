import React, { useState } from "react";
import axios from "axios";
import { UserAuth } from "../../useContext/useContext";
import toast from "react-hot-toast";
import ActionLoader from "../Loader/ActionLoader";
// import {useNa}

const Referee = ({
  referee,
  handleInputFocus,
  handleInputBlur,
  documentFile,
  document,
}) => {
  // const 
  const { token } = UserAuth();
  const inputFocus = (e) => {
    const inputWrapper = e.target.parentElement;
    // setInputStyle({ ...inputStyle, [e.target.id]: { backgroundColor: 'white'} });
    inputWrapper.style.borderColor = "#17b24e";
    inputWrapper.querySelector(".referee_input__label").style.color = "#17b24e";
    // inputWrapper.querySelector(".input__icon").style.color = "#17b24e";
    e.target.setAttribute(
      "data-placeholder",
      e.target.getAttribute("placeholder")
    );
    e.target.setAttribute("placeholder", "");
  };

  const inputBlur = (e) => {
    const inputWrapper = e.target.parentElement;
    inputWrapper.style.borderColor = "#d8d8d8";
    inputWrapper.querySelector(".referee_input__label").style.color = "#a7a7a7";
    // inputWrapper.querySelector(".input__icon").style.color = "#a7a7a7";
    e.target.setAttribute(
      "placeholder",
      e.target.getAttribute("data-placeholder")
    );
    e.target.setAttribute("data-placeholder", "");
  };

  const [referenceOne, setReferenceOne] = useState({
    name: "",
    phonenumber: "",
    relationship: "",
    placeofwork: "",
    email: "",
    address: "",
    title: "",
    callcode: "",
  });

  const [referenceTwo, setReferenceTwo] = useState({
    name: "",
    phonenumber: "",
    relationship: "",
    placeofwork: "",
    email: "",
    address: "",
    title: "",
    callcode: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleFormOne = (e) => {
    const { name, value } = e.target;
    setReferenceOne((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormTwo = (e) => {
    const { name, value } = e.target;
    setReferenceTwo((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    let emptyFields = [];
    const referenceOneKeys = Object.keys(referenceOne);
    const referenceTwoKeys = Object.keys(referenceTwo);
    if (!documentFile) {
      emptyFields.push("file");
    }
    if (!document.documentType) {
      emptyFields.push("document type");
    }
    if (!document.documentNumber) {
      emptyFields.push("document number");
    }
    for (const key of referenceOneKeys) {
      if (!referenceOne[key]) {
        emptyFields.push(`Referee 1 - ${key}`);
      }
    }

    for (const key of referenceTwoKeys) {
      if (!referenceTwo[key]) {
        emptyFields.push(`Referee 2 - ${key}`);
      }
    }

    if (
      !documentFile ||
      !document.documentType ||
      !document.documentNumber ||
      emptyFields.length > 0
    ) {
      let errorMessage = "Please fill in the following fields:\n";
      emptyFields.forEach((field) => (errorMessage += `- ${field}\n`));
      toast.error(errorMessage);
      return;
    }

    setUpdateLoading(true);

    const formData = new FormData();
    formData.append("referenceOne", JSON.stringify(referenceOne));
    formData.append("referenceTwo", JSON.stringify(referenceTwo));
    formData.append("documentFile", documentFile);
    formData.append("documentType", document.documentType);
    formData.append("documentNumber", document.documentNumber);
    formData.append("country", document.country);

    try {
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Form submitted successfully");
        localStorage.setItem("datawizuser", JSON.stringify(response.data.user));
        setReferenceOne({
          name: "",
          phonenumber: "",
          relationship: "",
          placeofwork: "",
          email: "",
          address: "",
          title: "",
          callcode: "",
        });
        setReferenceTwo({
          name: "",
          phonenumber: "",
          relationship: "",
          placeofwork: "",
          email: "",
          address: "",
          title: "",
          callcode: "",
        });
        window.location.reload()
      } else if (response.status === 400) {
        toast.error("Bad request !");
      } else if (response.status === 500) {
        toast.error("Error occured !");
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };
  return (
    <div
      className={`referee-section-container ${referee ? "active" : ""} pt-2`}
    >
      <div className="row">
        <div className="col-lg-5">
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="fullname"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="name"
              value={referenceOne.name}
              onChange={handleFormOne}
            />
            <label for="fullname" className="input__label email-label">
              Referee 1 full name
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="professionaltitle"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="title"
              value={referenceOne.title}
              onChange={handleFormOne}
            />
            <label for="professionaltitle" className="input__label email-label">
              Professional Title
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="relationship"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="relationship"
              value={referenceOne.relationship}
              onChange={handleFormOne}
            />
            <label for="relationship" className="input__label email-label">
              Relationship with referee
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="workplace"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="placeofwork"
              value={referenceOne.placeofwork}
              onChange={handleFormOne}
            />
            <label for="workplace" className="input__label email-label">
              Place of work
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="email"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="emailaddress"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="email"
              value={referenceOne.email}
              onChange={handleFormOne}
            />
            <label for="emailaddress" className="input__label email-label">
              Email address
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <select
              className="referee-select"
              name="callcode"
              value={referenceOne.callcode}
              onChange={handleFormOne}
            >
              <option value="+234">+234</option>
              <option value="+233">+233</option>
              <option value="+240">+240</option>
            </select>
            <input
              type="number"
              className="referee_input__field "
              placeholder="Total revenue (N)"
              id="number"
              onFocus={inputFocus}
              onBlur={inputBlur}
              autoComplete="off"
              name="phonenumber"
              value={referenceOne.phonenumber}
              onChange={handleFormOne}
            />

            <label for="number" className="referee_input__label">
              Phone number
            </label>
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="homeaddress"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="address"
              value={referenceOne.address}
              onChange={handleFormOne}
            />
            <label for="homeaddress" className="input__label email-label">
              Home address
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-5 pt-lg-0 pt-5">
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="fullnameTwo"
              name="name"
              value={referenceTwo.name}
              onChange={handleFormTwo}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
            />
            <label for="fullnameTwo" className="input__label email-label">
              Referee 2 full name
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="professiontitletwo"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="title"
              value={referenceTwo.title}
              onChange={handleFormTwo}
            />
            <label
              for="professiontitletwo"
              className="input__label email-label"
            >
              Professional Title
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="relationshipTwo"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="relationship"
              value={referenceTwo.relationship}
              onChange={handleFormTwo}
            />
            <label for="relationshipTwo" className="input__label email-label">
              Relationship with referee
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="workplaceTwo"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="placeofwork"
              value={referenceTwo.placeofwork}
              onChange={handleFormTwo}
            />
            <label for="workplaceTwo" className="input__label email-label">
              Place of work
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="email"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="emailaddressTwo"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="email"
              value={referenceTwo.email}
              onChange={handleFormTwo}
            />
            <label for="emailaddressTwo" className="input__label email-label">
              Email address
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <select
              className="referee-select"
              name="callcode"
              value={referenceTwo.callcode}
              onChange={handleFormTwo}
            >
              <option value="+234">+234</option>
              <option value="+233">+233</option>
              <option value="+240">+240</option>
            </select>
            <input
              type="number"
              className="referee_input__field "
              placeholder="Total revenue (N)"
              id="numberTwo"
              onFocus={inputFocus}
              onBlur={inputBlur}
              autoComplete="off"
              name="phonenumber"
              value={referenceTwo.phonenumber}
              onChange={handleFormTwo}
            />

            <label for="numberTwo" className="referee_input__label">
              Phone number
            </label>
          </div>
          <div className="input__wrapper emailinputcontainer mb-4 referee-inputs">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="homeaddressTwo"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              name="address"
              value={referenceTwo.address}
              onChange={handleFormTwo}
            />
            <label for="homeaddressTwo" className="input__label email-label">
              Home address
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <p
            class={`add-referees-btn ${
              updateLoading
                ? "d-flex align-items-center justify-content-center"
                : "text-center"
            }`}
            onClick={handleUpdate}
            style={{
              cursor: updateLoading ? "not-allowed" : "pointer",
            }}
          >
            {updateLoading ? <ActionLoader /> : "Add Referees"}
          </p>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default Referee;

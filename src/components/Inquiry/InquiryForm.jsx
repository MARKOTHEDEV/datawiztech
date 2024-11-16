import React, { useState } from "react";
import ActionLoader from "../Loader/ActionLoader";
import toast from "react-hot-toast";
import axios from "axios";
import { UserAuth } from "../../useContext/useContext";
import emailjs from "@emailjs/browser";

const InquiryForm = () => {
  const { token } = UserAuth();
  const [inquiryLoading, setinquiryLoading] = useState(false);
  const [inquiry, setInquiry] = useState({
    category: "",
    full_name: "",
    email: "",
    phone_number: "",
    description: "",
  });

  const handleInquiry = (e) => {
    const { name, value } = e.target;
    setInquiry((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInquiryPost = async (e) => {
    e.preventDefault();
    // const user = JSON.parse(localStorage.getItem("datawizuser"));
    const emptyFields = Object.entries(inquiry).filter(
      ([key, value]) => !value.trim()
    );

    if (emptyFields.length > 0) {
      // Display toast error message for empty fields
      emptyFields.forEach(([key, value]) => {
        toast.error(`${key.replace("_", " ")} cannot be empty`);
      });
      setinquiryLoading(false);
      return;
    }
    setinquiryLoading(true);
    emailjs
    .send(
      "service_94f8kgw", // Replace with your service ID
      "template_r4gp38h", // Replace with your template ID
      {...inquiry}
      , // Template parameters
      "NIQEhDZWs1zcZFOCy" // Replace with your public key
    )
    .then(
      (result) => {
        toast.success("Email sent successfully", );
        setinquiryLoading(false)
      },
      (error) => {
        setinquiryLoading(false)

        toast.error("Email sending failed",);
      }
    );
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <div className="shopping-cart pt-3 pb-4">inquiry</div>

          <div className="input__wrapper emailinputcontainer mb-3">
            <select
              className="input__field email-input"
              name="category"
              onChange={handleInquiry}
              value={inquiry.category}
              id="category"
              autoComplete="off"
            >
              <option value="">Choose a category</option>
              <option value="Account Issue">Account Issue</option>
              <option value="Password Inquiry">Password Inquiry</option>
              <option value="Data Inquiry">Data Inquiry</option>
            </select>
            <label htmlhtmlFor="category" className="input__label email-label">
              Inquiry Category
            </label>
          </div>
          <div className="input__wrapper emailinputcontainer mb-4">
            <input
              type="text"
              className="input__field email-input"
              placeholder="Full Name"
              name="full_name"
              id="fullname"
              onChange={handleInquiry}
              value={inquiry.full_name}
              autoComplete="off"
            />
            <label for="fullname" className="input__label email-label">
              Full Name
            </label>
          </div>
          <div className="input__wrapper emailinputcontainer mb-4">
            <input
              type="email"
              className="input__field email-input"
              placeholder="Email address"
              name="email"
              id="emailAddress"
              onChange={handleInquiry}
              value={inquiry.email}
              autoComplete="off"
            />
            <label for="emailAddress" className="input__label email-label">
              Email address
            </label>
          </div>
          <div className="input__wrapper emailinputcontainer mb-4">
            <input
              type="number"
              className="input__field email-input"
              placeholder="Phone Number"
              name="phone_number"
              onChange={handleInquiry}
              value={inquiry.phone_number}
              id="phone_number"
              autoComplete="off"
            />
            <label for="phone_number" className="input__label email-label">
              Phone Number
            </label>
          </div>
          <div className="description-input__wrapper mt-3 position-relative w-100">
            <textarea
              id="description"
              className="description-textarea__field inquiry_input description-textarea-input"
              placeholder="Description"
              name="description"
              onChange={handleInquiry}
              value={inquiry.description}
              //   onFocus={handleInputFocus}
              //   onBlur={handleInputBlur}
              autoComplete="off"
            ></textarea>
            <label for="description" className="textarea__label">
              Description
            </label>
          </div>
          <div
            className={`update-article my-5 ${
              inquiryLoading
                ? "d-flex align-items-center justify-content-center"
                : "text-center"
            }`}
            onClick={handleInquiryPost}
            style={{
              cursor: inquiryLoading ? "not-allowed" : "pointer",
            }}
          >
            {inquiryLoading ? <ActionLoader /> : "Submit"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;

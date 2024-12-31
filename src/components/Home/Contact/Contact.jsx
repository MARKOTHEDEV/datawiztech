import React, { useState } from "react";
import contactSvg from "../../../assets/images/undrawnewsletterrewrob-1-EXK.png";
import toast from "react-hot-toast";
import ActionLoader from "../../Loader/ActionLoader";

const Contact = () => {
  const [contactLoading, setContactLoading] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleContact = (e) => {
    const { name, value } = e.target;
    setContactData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleContactPost = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    const emptyFields = Object.entries(contactData).filter(
      ([key, value]) => !value.trim()
    );

    if (emptyFields.length > 0) {
      // Display toast error message for empty fields
      emptyFields.forEach(([key, value]) => {
        toast.error(`${key.replace("_", " ")} cannot be empty`);
      });

      setContactLoading(false);
      return;
    }
    try {
      const response = await fetch(
        "https://datawiztechapi.onrender.com/api/v1/post-contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: contactData.name,
            email: contactData.email,
            subject: contactData.subject,
            message: contactData.message,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setContactData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setContactLoading(false);
      toast.error(error.message);
      console.log("Error registering user:", error.message);
    } finally {
      setContactLoading(false);
    }
  };
  return (
    <div className="container-fluid">
      <div className="form-section py-5">
        <div className="row">
          <div className="col-lg-6 py-3">
            <img
              className="undrawnewsletterrewrob-1-4Fb img-fluid"
              src={contactSvg}
              alt="..."
            />
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-5 py-3">
            {/* <div className="form img-fluid"> */}
            <div className="form-container d-flex flex-column justify-content-center align-items-center ">
              <div className="form-heading text-center pb-4">Talk To Us</div>
              <div className="form-sub-heading text-center pb-4">
                Kindly fill in the form below to send a message
              </div>

              {/* <form action="" method="post"> */}
              <div className="input-container mb-3">
                <input
                  type="text"
                  name="name"
                  value={contactData.name}
                  onChange={handleContact}
                  placeholder="What’s your name?"
                  className="form-name"
                />
              </div>
              <div className="input-container mb-3">
                <input
                  type="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleContact}
                  placeholder="We’ll need your e-mail address too..."
                  className="form-name"
                />
              </div>
              <div className="input-container mb-3">
                <input
                  type="text"
                  name="subject"
                  value={contactData.subject}
                  onChange={handleContact}
                  placeholder="Why are you reaching out to us?"
                  className="form-name"
                />
              </div>
              <div className="form-textarea mb-3">
                <textarea
                  name="message"
                  value={contactData.message}
                  onChange={handleContact}
                  id=""
                  cols="30"
                  rows="10"
                  className=" form-message"
                  placeholder="Tell us more about it here..."
                ></textarea>
              </div>
              <div className="form-btn-container">
                <button
                  type="submit"
                  disabled={contactLoading}
                  onClick={handleContactPost}
                  className={`form-submit-btn ${
                    contactLoading
                      ? "d-flex align-items-center justify-content-center"
                      : "text-center"
                  }`}
                >
                  {contactLoading ? <ActionLoader /> : "Send Message"}
                </button>
              </div>
              {/* </form> */}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { UserAuth } from "../../useContext/useContext";
import Header from "../Header/Header";
import axios from "axios";
import ActionLoader from "../Loader/ActionLoader";

const Socials = () => {
  const [active, setActive] = useState("home");
  const [socialLoading, setSocialLoading] = useState(false);
  const { token, currentUser } = UserAuth();
  const [instruction, setInsttruction] = useState("Update your social links");
  const [heading, setHeading] = useState("Account Socials");
  const [socials, setSocials] = useState({
    instagram: "",
    facebook: "",
    whatsapp: "",
    twitter: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setSocials((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const updateSocials = async () => {
    const emptyField = [];
    if (!socials.instagram) {
      emptyField.push("instagram");
    }

    if (!socials.facebook) {
      emptyField.push("facebook");
    }
    if (!socials.whatsapp) {
      emptyField.push("whatsapp");
    }
    if (!socials.twitter) {
      emptyField.push("twitter");
    }

    if (emptyField.length > 0) {
      toast.error(`This field(s) ${emptyField.join(", ")} can not be empty`);
      return;
    }

    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    };

    const invalidUrls = [];
    Object.entries(socials).forEach(([key, value]) => {
      if (value && !isValidUrl(value)) {
        invalidUrls.push(key);
      }
    });

    if (invalidUrls.length > 0) {
      toast.error(
        `The following field(s) contain invalid URLs: ${invalidUrls.join(", ")}`
      );
      return;
    }

    setSocialLoading(true);
    try {
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/update-socials",
        {
          whatsapp: socials.whatsapp,
          facebook: socials.facebook,
          instagram: socials.instagram,
          twitter: socials.twitter,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("socials updated successfully");
        localStorage.setItem("datawizuser", JSON.stringify(response.data.user));
        setSocials({
          instagram: "",
          facebook: "",
          whatsapp: "",
          twitter: "",
        });
      } else if (response.status === 400) {
        toast.error("Bad request !");
      } else if (response.status === 500) {
        toast.error("Error occured !");
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setSocialLoading(false);
    }
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
    inputWrapper.querySelector(".input__label").style.color = "#a7a7a7";
    // inputWrapper.querySelector(".input__icon").style.color = "#a7a7a7";
    e.target.setAttribute(
      "placeholder",
      e.target.getAttribute("data-placeholder")
    );
    e.target.setAttribute("data-placeholder", "");
  };

  return (
    <div>
      <Header active={active} />
      <div className="container">
        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/" className="bread-items">
                  Home
                </Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/profile" className="bread-items">
                  Profile
                </Link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <Link to="#" className="bread-items active">
                  Account Socials
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="verification-header">{heading}</div>
        <p class="verification-sub-header">{instruction}</p>
        <div className={`row flex-wrap-reverse verify-account-containeractive`}>
          <div className="col-lg-6 py-3">
            <div className="input__wrapper emailinputcontainer mb-4">
              <input
                type="text"
                className="input__field email-input "
                placeholder="Socials"
                id="instagram"
                name="instagram"
                value={socials.instagram}
                onChange={handleForm}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                autoComplete="off"
              />
              <label for="instagram" className="input__label email-label">
                Instagram
              </label>
            </div>
            <div className="input__wrapper emailinputcontainer mb-4">
              <input
                type="text"
                className="input__field email-input "
                placeholder="Socials"
                id="facebook"
                name="facebook"
                value={socials.facebook}
                onChange={handleForm}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                autoComplete="off"
              />
              <label for="facebook" className="input__label email-label">
                facebook
              </label>
            </div>
            <div className="input__wrapper emailinputcontainer mb-4">
              <input
                type="text"
                className="input__field email-input "
                placeholder="Socials"
                id="twitter"
                name="twitter"
                value={socials.twitter}
                onChange={handleForm}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                autoComplete="off"
              />
              <label for="twitter" className="input__label email-label">
                twitter
              </label>
            </div>
            <div className="input__wrapper emailinputcontainer mb-4">
              <input
                type="text"
                className="input__field email-input "
                placeholder="Socials"
                id="whatsapp"
                name="whatsapp"
                value={socials.whatsapp}
                onChange={handleForm}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                autoComplete="off"
              />
              <label for="whatsapp" className="input__label email-label">
                whatsapp
              </label>
            </div>
            <div
              class={`verify-btn ${
                socialLoading
                  ? "d-flex align-items-center justify-content-center"
                  : "text-center"
              }`}
              onClick={updateSocials}
              style={{
                cursor: socialLoading ? "not-allowed" : "pointer",
              }}
            >
              {socialLoading ? <ActionLoader /> : "Update Socials"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socials;

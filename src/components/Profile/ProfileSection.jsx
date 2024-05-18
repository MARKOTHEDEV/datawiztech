import React, { useState } from "react";
import "./ProfileSection.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase/firebase";
import profilepic from "../../assets/images/profile-circle.png";
import cameraicon from "../../assets/images/image-2-VDs.png";
import location from "../../assets/images/icon-color-kEu.png";
import profile_btn_icon from "../../assets/images/frame-1-XnZ.png";
import { Link } from "react-router-dom";
import { UserAuth } from "../../useContext/useContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";
import ActionLoader from "../Loader/ActionLoader";

const ProfileSection = () => {
  const [profiledp, setProfileDp] = useState(
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78"
  );
  const [image, setImage] = useState("");
  const [dpLoading, setDbLoading] = useState(false);
  const { currentUser, role, token } = UserAuth();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds 1MB.");
      return;
    }
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileDp(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeProfilePic = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("datawizuser"));
    if (!image || !image.name) {
      toast.error("Choose an image");
      return;
    }
    setDbLoading(true);

    try {
      const pictureExtension = image.name.split(".").pop().toLowerCase();
      const picFileName = `${pictureExtension}.${uuidv4()}-profile`;
      const pictureStorageRef = ref(storage, `profilepic/${picFileName}`);
      await uploadBytes(pictureStorageRef, image);

      const pictureUrl = await getDownloadURL(pictureStorageRef);
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/update-picture",
        { image: pictureUrl },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response && response.status === 200) {
        const data = response.data;
        toast.success(data.message);
        setDbLoading(false);
        if (user && typeof user === "object") {
          user.image = pictureUrl;
          localStorage.setItem("datawizuser", JSON.stringify(user));
        }
      } else {
        toast.error(response.data.message);
        setDbLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      if (error && error.response && error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Error Occured !");
      }
      setDbLoading(false);
    } finally {
      setDbLoading(false);
    }
  };

  return (
    <div className="container profile-bg">
      <div className="row">
        <div className="col-lg-4 profile-pic-col">
          <div className="position-relative">
            <input
              type="file"
              id="picture"
              accept="image/*"
              className="d-none"
              onChange={handleImageChange}
            />
            <img
              src={currentUser.image ?? profiledp}
              alt=".."
              className="profileimage"
            />
            <label htmlFor="picture">
              <img src={cameraicon} alt=".." className="cameraicon" />
            </label>
          </div>
          <div
            className={`changeprofilepic mt-4 ${
              dpLoading
                ? "d-flex align-items-center justify-content-center"
                : "text-center"
            }`}
            style={{
              cursor: dpLoading ? "not-allowed" : "pointer",
            }}
            onClick={handleChangeProfilePic}
          >
            {dpLoading ? <ActionLoader /> : "Change profile picture"}
          </div>
        </div>
        <div className="col-lg-8">
          <div className="profile-btn-container pt-lg-0 pt-5">
            <div className="profile-btn-content d-flex justify-content-end align-items-center">
              <div
                className="profile-secondary-button"
                // data-bs-toggle="collapse"
                // href="#profile-switch-btn"
                // role="button"
                // aria-expanded="false"
                // aria-controls="#profile-switch-btn"
              >
                Switch account
              </div>
              <Link to="/profile/update" className="primary-button-with-icon d-flex justify-content-center align-items-center"
                // data-bs-toggle="collapse"
                // href="#profile-edit-btn"
                // role="button"
                // aria-expanded="false"
                // aria-controls="#profile-edit-btn"
              >
                <div className="profile-btn-text">Update profile</div>
                <p className="profile-btn-icon-container">
                  <img
                    className="profile-btn-icon"
                    src={profile_btn_icon}
                    alt=".."
                  />
                </p>
              </Link>

              <div
                className="profile-edit-btn  collapse multi-collapse overflow-hidden"
                role="menu"
                id="profile-edit-btn"
              >
                {/* <div className="v-list v-sheet theme--light"> */}
                  {/* <Link
                    to="/reset-pasword"
                    aria-current="page"
                    className="className-active-menu v-list-item--active v-list-item v-list-item--link theme--light weight-600 "
                    tabindex="0"
                    role="menuitem"
                    id="list-item-159"
                  >
                    <div className="v-list-item__title text-center">
                      Reset password
                    </div>
                  </Link> */}
                  {/* <Link
                    to="#"
                    className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
                    tabindex="0"
                    role="menuitem"
                    id="list-item-161"
                  >
                    <div className="v-list-item__title text-center">
                      Set up bank account
                    </div>
                  </Link> */}
                  {/* <Link
                    to="/profile/update"
                    className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
                    tabindex="0"
                    role="menuitem"
                    id="list-item-163"
                  >
                    <div className="v-list-item__title text-center">
                      Update profile information
                    </div>
                  </Link> */}
                {/* </div> */}
              </div>
              <div
                className="profile-switch-acct  collapse multi-collapse overflow-hidden"
                role="menu"
                id="profile-switch-btn"
              >
                <div className="profile-switch-content">
                  <p className="profile-custom active">CUST2413</p>
                  <div className="profile-corporate-container">
                    <p className="profile-corporate">Corporate</p>
                    {/* <div className="profile-corporate-line"></div> */}
                  </div>
                  <p className="profile-custom">CORP2413</p>
                  <p className="profile-custom">CORP2413</p>
                  <div className="profile-corporate-container">
                    <p className="profile-corporate">Subcorporate</p>
                    {/* <div className="line-38-jiy"></div> */}
                  </div>
                  <p className="profile-custom">CORP2413</p>
                  <p className="profile-custom">CORP2413</p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center pt-4">
            <h1 className="profile-name">
              {currentUser ? currentUser.first_name : ""}{" "}
              {currentUser ? currentUser.last_name : ""}
            </h1>
            <div className="profile-location-container">
              <p>
                <img
                  className="profile-location-icon"
                  src={location}
                  alt="..."
                />
              </p>
              <p className="profile-location-name">{currentUser.country??"Country"}</p>
            </div>
          </div>
          <div className="d-flex justify-content-between  align-items-center ">
            <div className="profile-profession">
              {!currentUser && !currentUser.occupation
                ? "Empty occupation"
                : currentUser.occupation}
            </div>
            <div
              className={`profile-verified ${
                currentUser?.verification === "verified" ? "active" : ""
              }`}
            >
              {currentUser?.verification === "verified"
                ? "verified"
                : "unverified"}
            </div>
          </div>
          <p className="profile-bio">
            {!currentUser && !currentUser.bio ? "Empty Bio" : currentUser.bio}
          </p>
          <div className="profile-content">
            <div className="profile-number">
              <p className="phone-number-title">Phone number:</p>
              <p className="phone-number-digit">
                {currentUser ? currentUser?.phone_number : ""}
              </p>
            </div>
            <div className="profile-email">
              <p className="profile-email-title">Email address:</p>
              <p className="profile-email-content">
                {currentUser ? currentUser?.email : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;

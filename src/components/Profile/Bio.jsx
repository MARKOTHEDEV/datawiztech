import React, { useState } from "react";
import ActionLoader from "../Loader/ActionLoader";
import { UserAuth } from "../../useContext/useContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Bio = () => {
  const navigate = useNavigate();
  const [bioLoading, setBioLoading] = useState(false);
  const { currentUser, token } = UserAuth();
  const [profileData, setProfileData] = useState({
    occupation: currentUser?.occupation || "",
    bio: currentUser?.bio || "",
  });

  const handleProfile = (e) => {
    const { name, value } = e.target;
    setProfileData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProfilePost = async (e) => {
    e.preventDefault();
    // const user = JSON.parse(localStorage.getItem("datawizuser"));
    const emptyFields = Object.entries(profileData).filter(
      ([key, value]) => !value.trim()
    );

    if (emptyFields.length > 0) {
      // Display toast error message for empty fields
      emptyFields.forEach(([key, value]) => {
        toast.error(`${key.replace("_", " ")} cannot be empty`);
      });
      setBioLoading(false);
      return;
    }
    setBioLoading(true);
    try {
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/profile-update",
        {
          occupation: profileData.occupation,
          bio: profileData.bio,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response.status === 200 && response.data) {
        // const data = await response.json();
        toast.success(response.data.message);
        const user = response.data.user;
        if (user && typeof user === "object") {
          user.occupation = profileData.occupation;
          user.bio = profileData.bio;
          localStorage.setItem("datawizuser", JSON.stringify(user));
        }
        setProfileData({
          occupation: "",
          bio: "",
        });

        window.location.reload();
        // navigate("/profile");
        setBioLoading(false);
        return;
      } else {
        setBioLoading(false);
        toast.error("Error occured");

        return;
      }
    } catch (error) {
      setBioLoading(false);
      console.log("Error registering user:", error.message);
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error Occured !");
      }
    } finally {
      setBioLoading(false);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <div className="shopping-cart pt-3 pb-4">Update Profile</div>
          <div className="input__wrapper emailinputcontainer mb-4">
            <input
              type="text"
              className="input__field email-input"
              placeholder="Occupation"
              name="occupation"
              value={profileData.occupation}
              onChange={handleProfile}
              id="occupation"
              autoComplete="off"
            />
            <label for="occupation" className="input__label email-label">
              Occupation
            </label>
          </div>

          <div className="description-input__wrapper mt-3 position-relative w-100">
            <textarea
              id="bio"
              className="description-textarea__field inquiry_input description-textarea-input"
              placeholder="Bio"
              name="bio"
              value={profileData.bio}
              onChange={handleProfile}
              autoComplete="off"
            ></textarea>
            <label for="bio" className="textarea__label">
              Bio
            </label>
          </div>
          <div
            className={`update-article my-5 ${
              bioLoading
                ? "d-flex align-items-center justify-content-center"
                : "text-center"
            }`}
            onClick={handleProfilePost}
            style={{
              cursor: bioLoading ? "not-allowed" : "pointer",
            }}
          >
            {bioLoading ? <ActionLoader /> : "Update Profile"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;

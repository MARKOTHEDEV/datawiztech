import React, { useEffect, useState } from "react";
import ActionLoader from "../Loader/ActionLoader";
import { UserAuth } from "../../useContext/useContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { decodeUser, handleErrorPopUp } from "../../api/api";
import { getUserProfileApi, updateUserProfileApi } from "../../api/user.api";

const Bio = () => {
  const navigate = useNavigate();
  const [bioLoading, setBioLoading] = useState(false);
  const { currentUser, token } = UserAuth();
  const [profileData, setProfileData] = useState({
    occupation: currentUser?.occupation || "",
    bio: currentUser?.bio || "",
  });

  const {mutate,} =useMutation({
    mutationFn:updateUserProfileApi,
    'onSuccess':(data)=>{
      setBioLoading(false)
      toast.success('Profile Updated Successfully')
      // client.invalidateQueries('getDataAddedToCart')
    },
    onError:(error)=>{
      setBioLoading(false)


      handleErrorPopUp(error)
    }
  })



  const {isLoading,data} = useQuery({
    queryKey:'getUserProfileApi',
    queryFn:()=>{
    const user_id = decodeUser(token).user_id

    return  getUserProfileApi({user_id})
    },
    refetchInterval:false,
    refetchOnWindowFocus:false,
    enabled: token?true:false
  })
  // getUserProfileApi
  // updateUserProfileApi
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
    // occupation: profileData.occupation,
    // bio: profileData.bio,
    const user_id = decodeUser(token).user_id;
    const form = new FormData()
    form.append('user_id',`${user_id}`)
    form.append('occupation',profileData.occupation)
    form.append('bio',profileData.bio)
    mutate(form);
    
  };

  useEffect(()=>{
      console.log({data})
      if(data){
        setProfileData({
          occupation:data.occupation,
          bio:data.bio
        })
      }
  },[data])
  if(isLoading){
   return <ActionLoader />
  }
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

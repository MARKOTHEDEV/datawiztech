import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

// the two user types that exist is
// Corperate and Individual
export const BASE_URL ='https://datawiztech-backend.onrender.com/api/v1'
const signUp = async ()=>{


}


export const handleErrorPopUp = (error)=>{
    if(error?.response?.data?.detail){
        toast.error(error?.response?.data?.detail)
      }else{
        toast.error('Some error occured please try again.')
      
      }
}
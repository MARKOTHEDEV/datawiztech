import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";

// the two user types that exist is
// Corperate and Individual


export const BASE_URL ='https://datawiztech-backend.onrender.com/api/v1'
const api = axios.create({
  'baseURL':BASE_URL,
  
})
export default api

api.interceptors.request.use(async (config)=>{
  const tokenInfo = getDatawizToken();
  const path = window.location.pathname

  if(tokenInfo){
    if(tokenInfo?.access_token){
      config['headers']={ 'Authorization':`Bearer ${tokenInfo.access_token}`,}
    }
    return config
  }
  //write something if there is no token then show some error
  return config;
})

const signUp = async ()=>{


}
export function findDuplicateEmails(emailList) {
  const emailSet = new Set();
  const duplicates = [];

  for (const email of emailList) {
      if (emailSet.has(email)) {
          duplicates.push(email);
      } else {
          emailSet.add(email);
      }
  }

  return duplicates;
}


export const handleErrorPopUp = (error)=>{
    if(error?.response?.data?.detail){
        toast.error(error?.response?.data?.detail)
      }else{
        toast.error('Some error occured please try again.')
      
      }
}

export const removeAllQueryParam = ()=>{
  //this code removes all query param
  window.history.pushState({}, document.title, window.location.pathname);
}


export  const decodeUser = (token)=>{
  // Response Type{
  //   "user_id": string,
  //   "access_key": string,
  //   "user_id": string,
  //   "first_name":string,
  //   "last_name": string,
  //   "email": string,
  //   "user_type": string,
  //   "exp": string
  // }
  // console.log({token})

   const user = jwtDecode(token)
   return user
}



const getDatawizToken =()=>{
  const data = localStorage.getItem('datawiztoken')
  if(data){
    return JSON.parse(data).data
  }
  return null
}
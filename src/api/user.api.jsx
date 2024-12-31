import axios from "axios"
import api, { BASE_URL } from "./api"


export const sendForgotPasswordVerificationEmail = async(data)=>{

    const response = await axios.post(`${BASE_URL}/auth/forgot-password`,data);

    return response.data

}

export const resetPasswordApi = async (data)=>{

    const response = await axios.put(`${BASE_URL}/auth/reset-password`,data);

    return response.data

}

export const updateUserProfileApi =async (form)=>{
    const response = await api.patch(`${BASE_URL}/users/profile`,form);
    return response.data

}

export const getUserProfileApi  = async ({user_id})=>{
    const response = await api.get(`${BASE_URL}/users/${user_id}/profile`,);
    return response.data


}
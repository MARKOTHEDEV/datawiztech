import axios from "axios"
import { BASE_URL } from "./api"


export const sendForgotPasswordVerificationEmail = async(data)=>{

    const response = await axios.post(`${BASE_URL}/auth/forgot-password`,data);

    return response.data

}

export const resetPasswordApi = async (data)=>{

    const response = await axios.put(`${BASE_URL}/auth/reset-password`,data);

    return response.data

}
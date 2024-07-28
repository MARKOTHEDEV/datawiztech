import axios from "axios"
import api, { BASE_URL } from "./api"



export const uploadDataApi = async ({form})=>{
    const response = await api.post(`/data/upload-data`,form);
    return response.data
}

export const validateAndSaveDataApi= async ({data,user_id})=>{
    const response = await api.post(`/data/validate-data?user_id=${user_id}`,data);
    return response.data
}


export const getDataApi = async ()=>{
    const response = await api.get(`/data`,);
    return response.data
}

export const addToCartDataApi = async ()=>{
    const response = await api.get(`/carts/data`,);
    return response.data
}


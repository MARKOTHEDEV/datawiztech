import axios from "axios"
import api, { BASE_URL } from "./api"



export const uploadDataApi = async ({form})=>{
    const response = await api.post(`/data/upload-data`,form);
    return response.data
}
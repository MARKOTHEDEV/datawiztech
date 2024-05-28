import axios from "axios"
import api, { BASE_URL } from "./api"



export const createArticleApi = async ({form})=>{

    const response = await api.post(`/articles/upload-article`,form);

    return response.data
}




export const getArticleApi = async ()=>{

    const response = await api.get(`/articles`,);

    return response.data
}



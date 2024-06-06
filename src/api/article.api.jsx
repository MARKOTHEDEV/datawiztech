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


export const getSearchResults =async (search)=>{
    console.log({search})
    const response = await api.get(`/search?keyword=${search}`);
    return response.data
}

export const getDataBankMarkAPi = async(data)=>{
    const response = await api.post(`/data/databank`,data);
    return response.data

}
import axios from "axios"
import api, { BASE_URL } from "./api"



export const addDataToCart = async ({data,user_id})=>{
    const response = await api.post(`/carts/data?user_id=${user_id}`,data);
    return response.data
}


export const addAriticleToCart = async ({article_id,user_id})=>{
    const response = await api.post(`/carts/article?article_id=${article_id}&user_id=${user_id}`);
    return response.data
}
export const getArticleCartApi = async({user_id})=>{

    const response = await api.get(`/carts/articles?user_id=${user_id}`);
    return response.data
}

export const deleteCartApi = async ({article_id,user_id})=>{
    const response = await api.delete(`/carts/article/?article_id=${article_id}&user_id=${user_id}`);
    return response.data
}

export const checkoutCartApi = async (data)=>{
    const response = await api.post(`/payments/checkout/`,data);
    return response.data
}
// /api/v1/carts
export const getCartCount= async ({user_id})=>{

    const response = await api.get(`/carts/items/${user_id}`,);
    return response.data
}
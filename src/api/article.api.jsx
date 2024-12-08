import axios from "axios"
import api, { BASE_URL } from "./api"
import { jwtDecode } from "jwt-decode";


export const createArticleApi = async ({form})=>{

    const response = await api.post(`/articles/upload-article`,form);

    return response.data
}




export const getArticleApi = async ()=>{

    const response = await api.get(`/articles`,);

    return response.data
}
export const getArticleForUserApi= async ()=>{
    const data = JSON.parse(localStorage.getItem('datawiztoken'))
    const userObject = jwtDecode(data.data.access_token);
    console.log({userObject})
    const response = await api.get(`/articles/authors/${userObject.user_id}`,);
    return response.data;
}

// /api/v1/articles/authors/{author_id}

export const getSearchResults =async (search)=>{
    console.log({search})
    const response = await api.get(`/search?keyword=${search}`);
    console.log({response})
    return response.data
}

export const getDataBankMarkAPi = async(data)=>{
   const {is_local,...payload} = data
    const response = await api.post(
        is_local?
        '/data/localdata':
        `/data/databank`,payload);
    return response.data

}


export const coAuthorsOfArticleApi = async ({article_id})=>{
    const resp = await api.get(`/articles/${article_id}/coauthors`);
    return resp.data
}

export const getUserArticleApi = async ({user_id})=>{
    const resp = await api.get(`/articles/authors/${user_id}`);
    return resp.data   
}


export const updateArticleCoAuhorApi = async (data)=>{
    const resp = await api.patch(`/articles/${data.article_id}/coauthors`,data.form);
    return resp.data   

}

export const getArticleThatIamCOAuthorOF = async ({user_id})=>{
    // /articles/coauthors/{coauthor_id}
    const resp = await api.get(`/articles/coauthors/${user_id}/`,);
    return resp.data   

}


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


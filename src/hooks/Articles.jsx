import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { UserAuth } from '../useContext/useContext';
import api from '../api/api';


const FetchArticles = () => {
    // const {token} = UserAuth()
    return useQuery({
        queryKey: ["articles"],
        queryFn: ()=> api.get("/articles",),
        onError: (error) => {
            console.log("Error fetching articles:", error);
        },
        
    });
}

export default FetchArticles;

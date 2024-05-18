import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { UserAuth } from '../useContext/useContext';


const FetchArticles = () => {
    const {token} = UserAuth()
    return useQuery({
        queryKey: ["articles"],
        queryFn: ()=> axios.get("https://datawiztechapi.onrender.com/api/v1/articles", {
            headers:{
                Authorization: token
            }
        }),
        onError: (error) => {
            console.log("Error fetching articles:", error);
        }
    });
}

export default FetchArticles;

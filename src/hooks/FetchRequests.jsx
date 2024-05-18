import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { UserAuth } from '../useContext/useContext';

const FetchRequests = () => {
    const {token} = UserAuth()
    return useQuery({
        queryKey: ["requests"],
        queryFn: ()=> axios.get("https://datawiztechapi.onrender.com/api/v1/requests", {
            headers:{
                Authorization: token
            }
        }),
        onError: (error) => {
            console.log("Error fetching articles:", error);
        }
    });
}

export default FetchRequests;

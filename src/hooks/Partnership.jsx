import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { UserAuth } from '../useContext/useContext';


const FetchPartnerships = () => {
    const {token} = UserAuth()
    return useQuery({
        queryKey: ["partnerships"],
        queryFn: ()=> axios.get("https://datawiztechapi.onrender.com/api/v1/partnership", {
            headers:{
                Authorization: token
            }
        }),
        onError: (error) => {
            console.log("Error fetching articles:", error);
        }
    });
}

export default FetchPartnerships;

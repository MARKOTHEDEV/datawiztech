import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { UserAuth } from '../useContext/useContext';

const FetchDetails = () => {
    const {token} = UserAuth()
    return useQuery({
        queryKey: ["userdetails"],
        queryFn: ()=> axios.get("https://datawiztechapi.onrender.com/api/v1/current-user", {
            headers:{
                Authorization: token
            }
        }),
        onError: (error) => {
            console.log("Error fetching articles:", error);
        }
    });
}

export default FetchDetails;

import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { UserAuth } from '../useContext/useContext';

const FetchAllUser = () => {
    const {token} = UserAuth()
    return useQuery({
        queryKey: ["all-users"],
        queryFn: ()=> axios.get("https://datawiztechapi.onrender.com/api/v1/all-user", {
            headers:{
                Authorization: token
            }
        }),
        onError: (error) => {
            console.log("Error fetching articles:", error);
        }
    });
}

export default FetchAllUser;

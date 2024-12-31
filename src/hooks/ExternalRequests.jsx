import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { UserAuth } from '../useContext/useContext';

const ExternalRequests = () => {
    const {token} = UserAuth()
    return useQuery({
        queryKey: ["externalrequests"],
        queryFn: ()=> axios.get("https://datawiztechapi.onrender.com/api/v1/external-requests", {
            headers:{
                Authorization: token
            }
        }),
        onError: (error) => {
            console.log("Error fetching articles:", error);
        }
    });
}

export default ExternalRequests;

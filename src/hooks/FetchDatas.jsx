import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { UserAuth } from '../useContext/useContext';

const FetchData = () => {
    const {token} = UserAuth()
    return useQuery({
        queryKey: ["datas"],
        queryFn: ()=> axios.get("https://datawiztechapi.onrender.com/api/v1/datas", {
            headers:{
                Authorization: token
            }
        }),
        onError: (error) => {
            console.log("Error fetching articles:", error);
        }
    });
}
// all-data

export default FetchData;

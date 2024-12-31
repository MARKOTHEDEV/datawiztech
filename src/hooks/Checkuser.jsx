import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../useContext/useContext';

const CheckUser = () => {
    const { token } = UserAuth();
    const navigate = useNavigate();
    return useQuery({
        queryKey: ["checkuser"],
        queryFn: () => axios.get("https://datawiztechapi.onrender.com/api/v1/check-user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        onError: (error) => {
            console.log(error.message);
            navigate("/");
        }
    });
}

export default CheckUser;

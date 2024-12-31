import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { UserAuth } from '../useContext/useContext';

const FectchCarts = () => {
    const { token } = UserAuth();
    return useQuery({
        queryKey: ["all-carts"],
        queryFn: () => axios.get("https://datawiztechapi.onrender.com/api/v1/carts", {
            headers: {
                Authorization: `${token}`
            }
        }),
        enabled: !!token,
        onError: (error) => {
            console.log(error.message);
        },

    });
}

export default FectchCarts;

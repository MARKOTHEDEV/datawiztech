import axios from 'axios'
import { useQuery } from '@tanstack/react-query';

const FetchCountryCodes = () => {
    return useQuery({
        queryKey: ["countrycodes"],
        queryFn: ()=> axios.get('https://country.io/phone.json'),
        onError: (error) => {
            console.log("Error fetching articles:", error);
        }
    });
}

export default FetchCountryCodes;

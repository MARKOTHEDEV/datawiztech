import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchSearch = (searchterm) => {
  return useQuery({
    queryKey: ["search", searchterm],
    queryFn: () =>
      axios.get(`https://datawiztechapi.onrender.com/api/v1/search/${searchterm}`),
    enabled: !!searchterm,
    onError: (error) => {
      console.log("Error fetching messages:", error);
    },
    staleTime: 0,
  });
};

export default FetchSearch;

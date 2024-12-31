import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchMostSearch = () => {
  return useQuery({
    queryKey: ["mostsearch"],
    queryFn: () =>
      axios.get(`https://datawiztechapi.onrender.com/api/v1/most-search`),
    onError: (error) => {
      console.log("Error fetching messages:", error);
    },
    staleTime: 0,
  });
};

export default FetchMostSearch;

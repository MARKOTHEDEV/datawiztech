import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchSearchTerms = () => {
  return useQuery({
    queryKey: ["searchTerms"],
    queryFn: () =>
      axios.get(`https://datawiztechapi.onrender.com/api/v1/all-search`, {
      }),
    onError: (error) => {
      console.log("Error fetching messages:", error);
    },
  });
};

export default FetchSearchTerms;

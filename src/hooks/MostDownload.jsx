import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchMostDownload = () => {
  return useQuery({
    queryKey: ["mostdownload"],
    queryFn: () =>
      axios.get(`https://datawiztechapi.onrender.com/api/v1/most-download`),
    onError: (error) => {
      console.log("Error fetching messages:", error);
    },
    staleTime: 0,
  });
};

export default FetchMostDownload;

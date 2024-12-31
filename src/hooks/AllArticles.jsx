import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const FetchAllArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () =>
      axios.get("https://datawiztechapi.onrender.com/api/v1/all-articles"),
    onError: (error) => {
      console.log("Error fetching articles:", error);
    },
    
  });
};

export default FetchAllArticles;

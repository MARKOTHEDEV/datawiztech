import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AllData = () => {
  return useQuery({
    queryKey: ["all-data"],
    queryFn: () => axios.get("https://datawiztechapi.onrender.com/api/v1/all-data"),
    onError: (error) => {
      console.log("Error fetching articles:", error);
    },
  });
};

export default AllData;

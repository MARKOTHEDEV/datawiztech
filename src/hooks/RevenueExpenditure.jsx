import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserAuth } from "../useContext/useContext";

const RevenueExpenditure = () => {
  const { token } = UserAuth();
  return useQuery({
    queryKey: ["revenue-expenditure"],
    queryFn: () =>
      axios.get("https://datawiztechapi.onrender.com/api/v1/revenue-expenditure", {
        headers: {
          Authorization: `${token}`,
        },
      }),
    enabled: !!token,
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default RevenueExpenditure;
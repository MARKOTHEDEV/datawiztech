import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserAuth } from "../useContext/useContext";

const FectchCheckouts = () => {
  const { token } = UserAuth();
  return useQuery({
    queryKey: ["checkouts"],
    queryFn: () =>
      axios.get("https://datawiztechapi.onrender.com/api/v1/admin/checkouts", {
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

export default FectchCheckouts;
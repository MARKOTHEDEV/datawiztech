import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserAuth } from "../useContext/useContext";

const UserCheckouts = () => {
  const { token } = UserAuth();
  return useQuery({
    queryKey: ["usercheckouts"],
    queryFn: () =>
      axios.get("https://datawiztechapi.onrender.com/api/v1/user-checkouts", {
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

export default UserCheckouts;

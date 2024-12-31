import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserAuth } from "../useContext/useContext";

const FetchFriends = () => {
  const { token } = UserAuth();

  if (!token) {
    toast.error("Please login to access notifications!");
    // return;
  }

  return useQuery({
    queryKey: ["allFriend"],
    queryFn: () =>
      axios.get("https://datawiztechapi.onrender.com/api/v1/friends", {
        headers: { Authorization: `${token}` },
      }),
    enabled: !!token,
    onError: (error) => {
      console.log("Error in useQuery:", error);
    },
  });
};

export default FetchFriends;

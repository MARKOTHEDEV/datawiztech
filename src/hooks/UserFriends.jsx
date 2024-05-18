import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { UserAuth } from "../useContext/useContext";

const UserFriends = () => {
  const { token } = UserAuth();

//   if (!token) {
//     toast.error("Please login to access notifications!");
//     // return;
//   }

  const { data, isLoading, error } = useQuery({
    queryKey: ["userfriends"],
    queryFn: () =>
      axios.get("https://datawiztechapi.onrender.com/api/v1/user-friends", {
        headers: { Authorization: `${token}` },
      }),
    enabled: !!token,
    onError: (error) => {
      console.log("Error in useQuery:", error);
    },
  });

  if (data) {
    localStorage.setItem("datawizuser", JSON.stringify(data.data.account));
  }

  return { data, isLoading, error };
};

export default UserFriends;

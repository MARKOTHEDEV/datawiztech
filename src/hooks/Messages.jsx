import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserAuth } from "../useContext/useContext";

const FetchMessages = (receiverId) => {
  const { token } = UserAuth();
  return useQuery({
    queryKey: ["messages", receiverId],
    queryFn: () =>
      axios.get(`https://datawiztechapi.onrender.com/api/v1/messages/${receiverId}`, {
        headers: { Authorization: token },
      }),
    onError: (error) => {
      console.log("Error fetching messages:", error);
    },
  });
};

export default FetchMessages;

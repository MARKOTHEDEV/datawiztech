import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserAuth } from "../useContext/useContext";

const FetchAllMessages = () => {
  const { token } = UserAuth();
  return useQuery({
    queryKey: ["allMessages"],
    queryFn: () =>
      axios.get(`https://datawiztechapi.onrender.com/api/v1/currentmessages}`, {
        headers: { Authorization: token },
      }),
    onError: (error) => {
      console.log("Error fetching messages:", error);
    },
  });
};

export default FetchAllMessages;

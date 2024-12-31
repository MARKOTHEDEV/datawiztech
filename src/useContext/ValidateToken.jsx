import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import { UserAuth } from "./useContext";

const useTokenValidation = () => {
  const { token, clearDetails } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get(
          "https://datawiztechapi.onrender.com/api/v1/check-user",
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.data.data.success) {
          clearDetails();
        }else{
          const data = await response.data
          console.log(data)
          return true
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        clearDetails();
      }
    };

    if (token) {
      checkTokenValidity();
    }
  }, [token, clearDetails, navigate]);

  return null;
};

export default useTokenValidation;

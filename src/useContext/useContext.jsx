import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import countriesAndCodes from "../hooks/countriesAndCodes";

const UserContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const Navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("datawiztoken") || null
  );

  const [loginDropdown, setLoginDrop] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("datawizuser")) || null
  );
  const [role, setRole] = useState(localStorage.getItem("datawizrole") || "");
  const [chat, setChat] = useState(
    JSON.parse(localStorage.getItem("datawizchat")) || null
  );

  const updateUserInLocalStorage = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
  };

  const [messages, setMessages] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [loading, setLoading] = useState(true);

  const clearDetails = () => {
    setToken(null);
    localStorage.removeItem("datawiztoken");

    localStorage.removeItem("datawizuser");
    setCurrentUser(null);
    setRole(null);
    localStorage.removeItem("datawizrole");
    localStorage.removeItem("datawizchat");
    localStorage.removeItem("datawizmessages");
  };

  // useEffect(() => {
  //   if (!token) {
  //     setIsAuthenticated(false);
  //     // Navigate('/');
  //     return;
  //   }

  //   const decodedToken = jwtDecode(token);
  //   const currentTime = Date.now() / 1000;

  //   if (decodedToken.exp === undefined || decodedToken.exp > currentTime) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //     clearDetails()
  //     // Navigate('/');
  //   }
  // }, [Navigate, token]);

  const saveTokenAndUserDetails = (token, user, role) => {
    setToken(token);
    localStorage.setItem("datawiztoken", token);

    localStorage.setItem("datawizuser", JSON.stringify(user));
    setCurrentUser(user);
    setRole(role);
    localStorage.setItem("datawizrole", role);
  };

  const loginAuth = async (email, password) => {
    try {
      const response = await fetch(
        "https://datawiztechapi.onrender.com/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      const data = await response.json();

      if (data.success && data.message === "Logged in successfully") {
        toast.success("Logged in successfully");
        saveTokenAndUserDetails(data.data.token, data.data.user);
        Navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }

      return data;
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const createIndividualAuth = async (data ) => {
    // ''
    const response = await axios.post(
      // "https://datawiztechapi.onrender.com/api/v1/register",
      "https://datawiztech-backend.onrender.com/api/v1/auth/sign_up/individual_user",
      {
        // first_name: first_name,-
        // last_name: last_name,-
        // phone_no: phone_number,-
        // gender: gender,-
        // country: country,-
        // email: email,-
        // username: username,-
        // role: 'individual_user',-
        // password: password,-
        // country_code,-
        // address,-
     ...data
        
        // country_code:countriesAndCodes.filter(d=>d.name===country)[0].code
      }
      ,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      toast.success("Account created, please check for a verification mail");
      // setLoginDrop(true)
      // const userToken = response.data.token 
      // setToken(userToken);
      // localStorage.setItem("datawiztoken", userToken);
    }
    return response;
  };

  // const createCorperateAuth = async (
  //   first_name,
  //   last_name,
  //   email,
  //   phone_number,
  //   password,
  //   role,
  //   organizationName,
  //   organizationType,
  //   address
  // ) => {
  //   const response = await axios.post(
  //     "https://datawiztechapi.onrender.com/api/v1/register",
  //     {
  //       email: email,
  //       password: password,
  //       first_name: first_name,
  //       last_name: last_name,
  //       phone_number: phone_number,
  //       role: role,
  //       organizationName: organizationName,
  //       organizationType: organizationType,
  //       address: address,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (response.status === 200) {
  //     saveTokenAndUserDetails(
  //       response.data.token,
  //       response.data.user,
  //       response.data.role
  //     );
  //   }
  //   return response;
  // };

  const sendOtp = async (setOtpLoading) => {
    const mytoken = localStorage.getItem("datawiztoken")
    setOtpLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `${mytoken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        // "https://datawiztechapi.onrender.com/api/v1/otp",
        "https://datawiztech.onrender.com/api/v1/otp",
        config
      );

      if (response.status === 200) {
        const data = await response.data;
        toast.success(data.message);
        setOtpLoading(false);
      } else {
        toast.error("OTP send failed");
        setOtpLoading(false);
      }

      return response;
    } catch (error) {
      console.log("Error fetching user details:", error.message);
      if (error.response.data) {
        toast.error(error.response.data.message);
      }
      setOtpLoading(false);
    }
  };

  const verifyOtp = async (verifyOtpLoading, otp) => {
    verifyOtpLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/verify",
        { otp },
        config
      );
      if (response.status === 200) {
        const data = await response.data;
        toast.success(data.message);
        saveTokenAndUserDetails(
          response.data.token,
          response.data.user,
          response.data.role
        );
        verifyOtpLoading(false);
      } else {
        toast.error("OTP verification failed, login to verify again");
        verifyOtpLoading(false);
        setToken(null);
        localStorage.removeItem("datawiztoken");
      }

      return response;
    } catch (error) {
      console.log("Error fetching user details:", error.message);
      if (error.response.data) {
        toast.error(error.response.data.message);
      }
      verifyOtpLoading(false);
    }
  };

  const postProduct = async (
    title,
    amount,
    deal,
    description,
    category,
    phoneNumber,
    whatsapp,
    images
  ) => {
    try {
      const response = await fetch(
        "https://dealupapi.codarhq.com/api/v1/post-product",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            amount: amount,
            deal: deal,
            description: description,
            category: category,
            phoneNumber: phoneNumber,
            whatsapp: whatsapp,
            images: images,
          }),
        }
      );
      // setCategories(await response.json());
      return response.json();
    } catch (error) {
      // console.error("Error posting product:", error.message);
    }
  };

  const [cartItem, setCartItem] = useState(() => {
    if (localStorage.getItem("CART-ITEMS"))
      return JSON.parse(localStorage.getItem("CART-ITEMS")) || [];
  });

  const addToCart = (data) => {
    if (!cartItem.some((item) => item.id === data.id)) {
      toast.success(`Successfully added to cart`);
      setCartItem((prev) => [...prev, data]);
    }
  };

  const logout = () => {
    clearDetails();
    toast.success("logged out successfully");
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      Navigate("/");
    }
  };

  return (
    <UserContext.Provider
      value={{
        createIndividualAuth,
        verifyOtp,
        currentUser,
        sendOtp,
        role,
        loginAuth,
        postProduct,
        addToCart,
        logout,
        // createCorperateAuth,
        clearDetails,
        saveTokenAndUserDetails,
        token,
        isAuthenticated,
        setIsAuthenticated,
        messages,
        cartLength,
        setCartLength,
        loginDropdown,
        setLoginDrop,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

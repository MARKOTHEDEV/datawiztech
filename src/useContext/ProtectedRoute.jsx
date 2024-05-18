// import { Navigate } from "react-router-dom";
// import React from "react";
// import { UserAuth } from "./useContext";

// const ProtectedRoute = ({ children}) => {
//   const { isAuthenticated } = UserAuth();

//   return isAuthenticated ? (
//     children
//   ) : (
//     <Navigate to="/" />
//   );
// };

// export default ProtectedRoute;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserAuth } from "./useContext";
import { jwtDecode } from "jwt-decode";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token, clearDetails, setIsAuthenticated, setLoginDrop  } = UserAuth();
  const Navigate = useNavigate();



  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      Navigate('/');
      return;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp === undefined || decodedToken.exp > currentTime) {
      setIsAuthenticated(true);
      setLoginDrop(false) 
    } else {
      setIsAuthenticated(false);
      clearDetails()
      Navigate('/');
      setLoginDrop(true) 
    }
  }, [Navigate, token, clearDetails, setIsAuthenticated, setLoginDrop]);

  if (!isAuthenticated) {
    Navigate("/");
    setLoginDrop(true)
    return null;
  }

  return children;
};

export default ProtectedRoute;

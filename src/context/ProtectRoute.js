import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectRoute;

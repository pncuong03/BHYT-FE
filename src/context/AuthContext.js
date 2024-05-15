import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("isLoggedIn"))
  );
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken, setToken, removeToken } from "../utils/localStorage";
import { loginUser as loginApi } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken(); // This now correctly looks for 'authToken'
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        removeToken(); // Clear invalid token
      }
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginApi({ email, password });
    const decodedUser = jwtDecode(data.token);
    setToken(data.token); // This now correctly saves as 'authToken'
    setUser(decodedUser);
  };

  const logout = () => {
    removeToken(); // This now correctly removes 'authToken'
    setUser(null);
  };

  const authValue = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user ? user.role === "admin" : false,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

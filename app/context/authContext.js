"use client";

import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem("accesstoken");
      if (!accessToken) {
        console.log("no access token");
        setIsAuthenticated(false);
        setUser(null);
        return;
      }
      const response = await fetch("http://localhost:3010/auth/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUser(data.user);
        return true;
      } else {
        await refreshToken();
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("http://localhost:3010/auth/refresh_token", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accesstoken", data.accessToken);
        setIsAuthenticated(true);
        setUser(data.user);
        return true;
      }
    } catch (error) {
      console.log("error refreshing token");
      // TODO: add logout if refreshing fails
    }
  };

  const value = { isAuthenticated, setIsAuthenticated, user, checkAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

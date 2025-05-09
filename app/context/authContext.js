"use client";

import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log("Looking for Access Token");

      const accessToken = localStorage.getItem("accesstoken");
      if (!accessToken) {
        console.log("No access token");

        setIsAuthenticated(false);
        setUser(null);
        return;
      }
      console.log("access token found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/protected`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      if (response.ok) {
        console.log("setting user info and auth status");

        const data = await response.json();
        setIsAuthenticated(true);
        setUser(data.user);
        router.push("/");
        return true;
      } else {
        console.log("verifying id failed");
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh_token`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accesstoken", data.accessToken);
        setIsAuthenticated(true);
        setUser(data.user);
        return true;
      } else {
        handleLogout();
        return false;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      handleLogout();
      return false;
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem("accesstoken", token);
    checkAuth();
  };

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout API call failed", error);
    } finally {
      localStorage.removeItem("accesstoken");
      setIsAuthenticated(false);
      setUser(null);
      router.push("/routes/auth");
    }
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    checkAuth,
    refreshToken,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

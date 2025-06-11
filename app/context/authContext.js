"use client";

import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem("accesstoken");
      if (!accessToken) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/protected`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.message === "User has not verified their email address 😢") {
        setAuthError(data.message);
        handleLogout();
        return;
      }
      if (response.ok) {
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
    } finally {
      setAuthLoading(false);
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
      setAuthError(error);
      console.error("Token refresh failed:", error);
      handleLogout();
      return false;
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem("accesstoken", token);
    checkAuth();
    router.push("/routes/dashboard");
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
      router.push("/");
    }
  };

  const value = {
    isAuthenticated,
    user,
    authError,
    authLoading,
    setIsAuthenticated,
    checkAuth,
    refreshToken,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

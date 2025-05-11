"use client";

import { useState, useEffect, useContext, createContext } from "react";
import { AuthContext } from "./authContext";

export const ContentContext = createContext();

export function ContentProvider({ children }) {
  const { isAuthenticated, refreshToken } = useContext(AuthContext);
  const [moduleData, setModuleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   const [learningsData, setLearningsData] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      let accessToken = localStorage.getItem("accesstoken");
      if (!accessToken) {
        await refreshToken();
        accessToken = localStorage.getItem("accesstoken");
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/modules`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let data = await response.json();
      setModuleData(data.payload);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
      setModuleData(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    moduleData,
    setModuleData,
    fetchAllData,
    loading,
    error,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

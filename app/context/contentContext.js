"use client";

import { useState, useEffect, useContext, createContext } from "react";
import { AuthContext } from "./authContext";

export const ContentContext = createContext();

export function ContentProvider({ children }) {
  const { isAuthenticated, refreshToken } = useContext(AuthContext);
  const [moduleData, setModuleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [learningData, setLearningData] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      let accessToken = localStorage.getItem("accesstoken");
      if (!accessToken || !isAuthenticated) {
        const refreshSuccessful = await refreshToken();
        if (!refreshSuccessful) {
          setError("Session expired. Please login again");
          return;
        }
        accessToken = localStorage.getItem("accesstoken");
      }
      await fetchModules(accessToken);
      await fetchLearnings(accessToken);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
      setModuleData(null);
      setLearningData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async (accessToken) => {
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
  };

  const fetchLearnings = async (accessToken) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/learnings`, {
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
    setLearningData(data.payload);
  };

  const value = {
    moduleData,
    learningData,
    setModuleData,
    setLearningData,
    fetchAllData,
    loading,
    error,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

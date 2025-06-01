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

  const getAccessToken = async () => {
    let accessToken = localStorage.getItem("accesstoken");
    if (!accessToken || !isAuthenticated) {
      const refreshSuccessful = await refreshToken();
      if (!refreshSuccessful) {
        setError("Session expired. Please login again");
        return;
      }
      accessToken = localStorage.getItem("accesstoken");
    }
    return accessToken;
  };

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

  const updateModule = async (moduleId, moduleName, description) => {
    let accessToken = localStorage.getItem("accesstoken");
    if (!accessToken || !isAuthenticated) {
      const refreshSuccessful = await refreshToken();
      if (!refreshSuccessful) {
        setError("Session expired. Please login again");
        return;
      }
      accessToken = localStorage.getItem("accesstoken");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/modules/${moduleId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ moduleName, description }),
    });
    if (!response.ok) {
      console.error(response);
      return {
        type: "error",
        message: "There was an error while updating your module entry",
      };
    }
    const jsonResponse = await response.json();
    const updatedModule = jsonResponse.payload;
    setModuleData((prevModuleData) =>
      prevModuleData.map((module) => (module.id === moduleId ? updatedModule : module))
    );
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

  const updateLearning = async (learningId, learningName, learningNotes, ragStatus) => {
    let accessToken = await getAccessToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/learnings/${learningId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ learningName, learningNotes, ragStatus }),
      }
    );
    if (!response.ok) {
      console.error(await response.json());
      return {
        type: "error",
        message: "There was an error while updating your learning entry",
      };
    }
    const jsonResponse = await response.json();
    const updatedLearning = jsonResponse.payload;
    setLearningData((prevLearningData) =>
      prevLearningData.map((learning) => (learning.id === learningId ? updatedLearning : learning))
    );
  };

  const deleteLearning = async (learningId) => {
    let accessToken = await getAccessToken();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/learnings/${learningId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("There was an error while deleting your learning entry");
      }
      setLearningData((prevLearningData) => {
        return prevLearningData.filter((learning) => learning.id !== learningId);
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const value = {
    moduleData,
    learningData,
    setModuleData,
    setLearningData,
    updateModule,
    updateLearning,
    deleteLearning,
    fetchAllData,
    loading,
    error,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

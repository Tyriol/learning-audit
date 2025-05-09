"use client";

import styles from "./page.module.css";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "./context/authContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import FormsSection from "./components/FormsSections/FormsSection";

export default function Home() {
  const { refreshToken } = useContext(AuthContext);
  const [moduleList, setModuleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch modules and set the modulelist state for use elsewhere, or the loading state or error state
  useEffect(() => {
    const fetchModules = async () => {
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
        let moduleData = await response.json();
        setModuleList(moduleData.payload);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(err);
        setModuleList(null);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  return (
    <main className={styles.main}>
      <ProtectedRoute>
        <FormsSection moduleList={moduleList} setModuleList={setModuleList} loading={loading} />
      </ProtectedRoute>
    </main>
  );
}

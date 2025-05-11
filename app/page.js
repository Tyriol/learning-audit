"use client";

import styles from "./page.module.css";
import { useContext, useEffect } from "react";

import { ContentContext } from "./context/contentContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import FormsSection from "./components/FormsSections/FormsSection";

export default function Home() {
  const { fetchAllData, moduleData, setModuleData, loading } = useContext(ContentContext);

  useEffect(() => {
    fetchAllData();
  }, []);

  const screenToDisplay = loading ? (
    <div>Loading...</div>
  ) : !moduleData || moduleData.length === 0 ? (
    <div>No modules available.</div>
  ) : (
    <FormsSection moduleList={moduleData} setModuleList={setModuleData} loading={loading} />
  );

  return (
    <main className={styles.main}>
      <ProtectedRoute>{screenToDisplay}</ProtectedRoute>
    </main>
  );
}

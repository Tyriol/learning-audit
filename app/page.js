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

  return (
    <main className={styles.main}>
      <ProtectedRoute>
        <FormsSection moduleList={moduleData} setModuleList={setModuleData} loading={loading} />
      </ProtectedRoute>
    </main>
  );
}

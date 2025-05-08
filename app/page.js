"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

import ProtectedRoute from "./routes/ProtectedRoute";
import FormsSection from "./components/FormsSections/FormsSection";
import SiteNavigationButton from "./components/SiteNavigationButton/SiteNavigationButton";

export default function Home() {
  const [moduleList, setModuleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch modules and set the modulelist state for use elsewhere, or the loading state or error state
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/modules`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let moduleData = await response.json();
        setModuleList(moduleData.payload);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.log(error);
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
        <SiteNavigationButton title="Modules" link="/modules" />
      </ProtectedRoute>
    </main>
  );
}

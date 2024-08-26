"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import FormsSection from "./components/FormsSections/FormsSection";
import ModuleList from "./components/ModuleList/ModuleList";

export default function Home() {
  const [moduleList, setModuleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch modules and set the modulelist state for use elsewhere, or the loading state or error state
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch("http://localhost:3010/api/modules");
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let moduleData = await response.json();
        setModuleList(moduleData.payload);
        setError(null);
      } catch (err) {
        setError(err.message);
        setModuleList(null);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  return (
    <main className={styles.main}>
      <FormsSection moduleList={moduleList} setModuleList={setModuleList} />
      <ModuleList moduleList={moduleList} loading={loading} />
    </main>
  );
}

"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

import FormsSection from "./components/FormsSections/FormsSection";
import SiteNavigationButton from "./components/SiteNavigationButton/SiteNavigationButton";
import ModuleList from "./components/ModuleList/ModuleList";

export default function Home() {
  const [moduleList, setModuleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch modules and set the modulelist state for use elsewhere, or the loading state or error state
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(
          "https://learning-audit.onrender.com/api/modules"
        );
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
      <FormsSection
        moduleList={moduleList}
        setModuleList={setModuleList}
        loading={loading}
      />
      <SiteNavigationButton title="Modules" link="/modules" />
      {/* <ModuleList
        moduleList={moduleList}
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}
    </main>
  );
}

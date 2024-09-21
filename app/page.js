"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import FormsSection from "./components/FormsSections/FormsSection";
import ModuleList from "./components/ModuleList/ModuleList";
import Modal from "./components/Modal/Modal";

export default function Home() {
  const [moduleList, setModuleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
        console.log(error);
        setModuleList(null);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  // handle opening and closing of modals

  return (
    <main className={styles.main}>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <FormsSection
        moduleList={moduleList}
        setModuleList={setModuleList}
        loading={loading}
      />
      <ModuleList moduleList={moduleList} loading={loading} />
      <Modal title="This works!" open={isOpen} onClose={() => setIsOpen(false)}>
        This is a modal
      </Modal>
    </main>
  );
}

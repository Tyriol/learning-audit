"use client";

import { useState, useEffect } from "react";

import ModuleList from "../components/ModuleList/ModuleList";
import SiteNavigationButton from "../components/SiteNavigationButton/SiteNavigationButton";

export default function Modules() {
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
    <>
      <ModuleList
        moduleList={moduleList}
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <SiteNavigationButton title="Home Page" link="/" />
    </>
  );
}

"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import FormsSection from "./components/FormsSections/FormsSection";
import SiteNavigationButton from "./components/SiteNavigationButton/SiteNavigationButton";
import TodoAdder from "./components/Modal/Test";

const queryClient = new QueryClient();

export default function Home() {
  const [moduleList, setModuleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch modules and set the modulelist state for use elsewhere, or the loading state or error state
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(
          process.env.NODE_ENV === "production"
            ? "https://learning-audit.onrender.com/api/modules"
            : "http://localhost:3010/api/modules"
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
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <FormsSection
          moduleList={moduleList}
          setModuleList={setModuleList}
          loading={loading}
        />
        <TestTanstack />
        <TodoAdder />
        <SiteNavigationButton title="Modules" link="/modules" />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function TestTanstack() {
  const { data, isPending, error } = useQuery({
    queryKey: ["modules"],
    queryFn: async () =>
      await fetch("http://localhost:3010/api/modules").then((res) =>
        res.json()
      ),
  });
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return <p>{data.payload[0].module_name}</p>;
}

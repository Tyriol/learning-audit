"use client";

import styles from "./ModuleList.module.css";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ContentContext } from "@/app/context/contentContext";

export default function ModuleList() {
  const router = useRouter();
  const { moduleData, loading } = useContext(ContentContext);

  if (moduleData.length === 0) return <p>Add some modules to see them here</p>;

  async function handleClick(e) {
    router.push(`/routes/modules/${e.target.id}`);
  }

  const moduleCards = moduleData.map((module) => {
    return (
      <li key={module.id} className={styles.uListItem}>
        <button
          onClick={(e) => handleClick(e)}
          className={styles.button}
          type="button"
          id={module.id}
        >
          {module.module_name}
        </button>
      </li>
    );
  });

  return (
    <section className={styles.display}>
      {loading ? (
        <p>Your Modules Are Loading....</p>
      ) : (
        <ul className={styles.uList}>{moduleCards}</ul>
      )}
    </section>
  );
}

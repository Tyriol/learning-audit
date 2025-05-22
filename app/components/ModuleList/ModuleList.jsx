"use client";

import styles from "./ModuleList.module.css";
import Modal from "../Modal/Modal";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ContentContext } from "@/app/context/contentContext";

export default function ModuleList() {
  const router = useRouter();
  const { moduleData, loading } = useContext(ContentContext);
  const [moduleLearnings, setModuleLearnings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
      <Modal
        moduleLearnings={moduleLearnings}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={module.module_name}
      >
        {moduleLearnings.map((learning) => {
          return <li key={learning.id}>{learning.learning_name}</li>;
        })}
      </Modal>
    </section>
  );
}

"use client";

import styles from "./ModuleList.module.css";
import Modal from "../Modal/Modal";
import { useState, useContext } from "react";
import { ContentContext } from "@/app/context/contentContext";

export default function ModuleList() {
  const { moduleData, loading } = useContext(ContentContext);
  const [moduleLearnings, setModuleLearnings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // function to fetch learnings by module id
  const fetchLearningsByID = async (moduleId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/learnings/${moduleId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let learningData = await response.json();
      setModuleLearnings(learningData.payload);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  async function handleClick(e) {
    await fetchLearningsByID(e.target.id);
    setIsOpen(true);
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

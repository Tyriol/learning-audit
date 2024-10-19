import styles from "./ModuleList.module.css";
import Modal from "../Modal/Modal";
import { useState } from "react";

export default function ModuleList({ moduleList, loading, isOpen, setIsOpen }) {
  const [moduleLearnings, setModuleLearnings] = useState([]);

  // function to fetch learnings by module id
  const fetchLearningsByID = async (moduleId) => {
    try {
      const response = await fetch(
        `http://localhost:3010/api/learnings/${moduleId}`
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

  return (
    <section className={styles.display}>
      {loading ? (
        <p>Words</p>
      ) : (
        <ul className={styles.uList}>
          {moduleList.map((module) => {
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
          })}
        </ul>
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

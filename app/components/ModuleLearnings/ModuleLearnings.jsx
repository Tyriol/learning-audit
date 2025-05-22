"use client";

import styles from "./ModuleLearning.module.css";
import { useContext, useState } from "react";
import { ContentContext } from "@/app/context/contentContext";
import Modal from "../Modal/Modal";
import NewLearningForm from "../FormsSections/NewLearningForm/NewLearningForm";

export default function ModuleLearnings({ moduleId }) {
  const { moduleData, learningData } = useContext(ContentContext);
  const [isOpen, setIsOpen] = useState(false);
  const module = moduleData.find((module) => module.id === moduleId);
  const moduleLearningsArray = learningData.filter((learning) => learning.module_id === moduleId);
  const learnings = moduleLearningsArray.map((learning) => {
    return <p key={learning.id}>{learning.learning_name}</p>;
  });

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <section className={styles.container}>
      <h2>{module.module_name}</h2>
      <p>{module.description}</p>
      <button type="button" onClick={handleClick}>
        Add a new learning
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Add a new learning">
        <NewLearningForm />
      </Modal>
      <div>{learnings}</div>
    </section>
  );
}

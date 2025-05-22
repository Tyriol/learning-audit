"use client";

import styles from "./ModuleLearning.module.css";
import { useContext } from "react";
import { ContentContext } from "@/app/context/contentContext";

export default function ModuleLearnings({ moduleId }) {
  const { moduleData, learningData } = useContext(ContentContext);
  const module = moduleData.find((module) => module.id === moduleId);
  const moduleLearningsArray = learningData.filter((learning) => learning.module_id === moduleId);
  const learnings = moduleLearningsArray.map((learning) => {
    return <p key={learning.id}>{learning.learning_name}</p>;
  });

  return (
    <section className={styles.container}>
      <h2>{module.module_name}</h2>
      <p>{module.description}</p>
      <div>{learnings}</div>
    </section>
  );
}

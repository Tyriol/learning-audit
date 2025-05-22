"use client";

import { useContext } from "react";
import styles from "./LearningList.module.css";
import { ContentContext } from "@/app/context/contentContext";

export default function LearningList() {
  const { learningData, loading } = useContext(ContentContext);
  console.log(learningData);
  const learningList = learningData.map((learning) => {
    const colour =
      learning.rag_status === "red"
        ? styles.red
        : learning.rag_status === "amber"
        ? styles.amber
        : styles.green;
    const listItemClass = `${styles.listItem} ${colour}`;
    return loading ? (
      <p>Loading</p>
    ) : learningData.length === 0 ? (
      <p>Add some learnings to see them here</p>
    ) : (
      <li className={listItemClass} key={learning.id}>
        {learning.learning_name}
      </li>
    );
  });
  return <ul className={styles.list}>{learningList}</ul>;
}

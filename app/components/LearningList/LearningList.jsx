"use client";

import { useContext } from "react";
import styles from "./LearningList.module.css";
import { ContentContext } from "@/app/context/contentContext";

export default function LearningList() {
  const { learningData, loading } = useContext(ContentContext);
  const learningList = learningData.map((learning) => {
    return loading ? (
      <p>Loading</p>
    ) : learningData.length === 0 ? (
      <p>Add some learnings to see them here</p>
    ) : (
      <li className={styles.listItem} key={learning.id}>
        {learning.learning_name}
      </li>
    );
  });
  return <ul className={styles.list}>{learningList}</ul>;
}

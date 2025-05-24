"use client";

import { useContext } from "react";
import styles from "./LearningList.module.css";
import Learning from "../Learning/Learning";
import { ContentContext } from "@/app/context/contentContext";

export default function LearningList() {
  const { learningData, loading } = useContext(ContentContext);
  const learningList = learningData.map((learning) => {
    return loading ? (
      <p>Loading</p>
    ) : learningData.length === 0 ? (
      <p>Add some learnings to see them here</p>
    ) : (
      <Learning learning={learning} />
    );
  });
  return <ul className={styles.list}>{learningList}</ul>;
}

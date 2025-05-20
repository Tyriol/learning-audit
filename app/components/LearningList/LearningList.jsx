import { useContext } from "react";
import styles from "./LearningList.module.css";
import { ContentContext } from "@/app/context/contentContext";

export default function LearningList() {
  const { learningData } = useContext(ContentContext);
  const learningList = learningData.map((learning) => {
    return (
      <li className={styles.listItem} key={learning.id}>
        {learning.learning_name}
      </li>
    );
  });
  return <ul className={styles.list}>{learningList}</ul>;
}

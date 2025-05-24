import styles from "./LearningList.module.css";
import Learning from "../Learning/Learning";

export default function LearningList({ learningData, loading, showDescription }) {
  const learningList = learningData.map((learning) => {
    return loading ? (
      <p>Loading</p>
    ) : learningData.length === 0 ? (
      <p>Add some learnings to see them here</p>
    ) : (
      <Learning key={learning.id} learning={learning} />
    );
  });
  return <ul className={styles.list}>{learningList}</ul>;
}

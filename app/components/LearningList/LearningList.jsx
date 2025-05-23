import styles from "./LearningList.module.css";
import Learning from "../Learning/Learning";

export default function LearningList({ learningData, loading }) {
  const learningList = learningData.map((learning) => {
    return <Learning key={learning.id} learning={learning} />;
  });
  return loading ? (
    <p>Loading</p>
  ) : learningData.length === 0 ? (
    <p>Add some learnings to see them here</p>
  ) : (
    <ul className={styles.list}>{learningList}</ul>
  );
}

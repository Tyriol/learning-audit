import styles from "./Learning.module.css";

export default function Learning({ learning }) {
  const { id, rag_status: ragStatus, learning_name: name, description } = learning;

  const colour =
    ragStatus === "red" ? styles.red : ragStatus === "amber" ? styles.amber : styles.green;
  const listItemClass = `${styles.listItem} ${colour}`;

  return <li className={listItemClass}>{name}</li>;
}

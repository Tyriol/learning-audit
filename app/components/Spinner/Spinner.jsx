import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
}

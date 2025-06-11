import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div role="status" aria-live="polite" className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
}

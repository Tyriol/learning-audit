import styles from "./Modal.module.css";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.modal_content}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.button} onClick={onClose}>
            &#215;
          </button>
        </header>
        <section className={styles.main}>{children}</section>
      </div>
    </>
  );
}

import React, { useState } from "react";
import styles from "./Modal.module.css";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.modal_content}>
        <button onClick={onClose}>&#215;</button>
        <h2>MODAL!</h2>
        {children}
      </div>
    </>
  );
}

"use client";

import styles from "./Modal.module.css";

import { useRef } from "react";

export default function ModalDialogue({ openButtonText, closeButtonText, children }) {
  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current.showModal();
  };
  return (
    <>
      <button onClick={showModal} type="button">
        {openButtonText}
      </button>

      <dialog className={styles.modal} ref={dialogRef}>
        <div className={styles.modalContainer}>
          {children}
          <button type="button" onClick={() => dialogRef.current.close()}>
            {closeButtonText}
          </button>
        </div>
      </dialog>
    </>
  );
}

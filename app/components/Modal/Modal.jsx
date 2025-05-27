"use client";

import styles from "./Modal.module.css";

import { useRef } from "react";

export default function ModalDialogue({ title, openButtonText, closeButtonText, children }) {
  const dialogRef = useRef(null);

  const showModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    } else {
      console.warn("The dialogRef is not set, unable to open the modal");
    }
  };

  return (
    <>
      <button onClick={showModal} type="button">
        {openButtonText}
      </button>

      <dialog className={styles.modal} ref={dialogRef} aria-labelledby="modal-title">
        <div className={styles.modalContainer}>
          <h2 id="modal-title">{title}</h2>
          {children}
          <button type="button" onClick={() => dialogRef.current.close()}>
            {closeButtonText}
          </button>
        </div>
      </dialog>
    </>
  );
}

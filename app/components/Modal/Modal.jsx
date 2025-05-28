"use client";

import styles from "./Modal.module.css";

import { useRef } from "react";

export default function Modal({ title, openButtonText, closeButtonText, isInfoModal, children }) {
  const dialogRef = useRef(null);

  const showModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    } else {
      console.warn("The dialogRef is not set, unable to open the modal");
    }
  };

  const openButtonView = isInfoModal ? (
    <span onClick={showModal} className={styles.infoButton}>
      ?
    </span>
  ) : (
    <button onClick={showModal} type="button">
      {openButtonText}
    </button>
  );

  return (
    <>
      {openButtonView}

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

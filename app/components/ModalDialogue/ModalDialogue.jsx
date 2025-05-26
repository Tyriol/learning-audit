"use client";

import styles from "./ModalDialogue.module.css";

import { useRef } from "react";

export default function ModalDialogue({ buttonText, children }) {
  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current.showModal();
  };
  return (
    <>
      <button onClick={showModal} type="button">
        {buttonText}
      </button>

      <dialog className={styles.modal} ref={dialogRef}>
        {children}
        <button type="button" onClick={() => dialogRef.current.close()}>
          Close
        </button>
      </dialog>
    </>
  );
}

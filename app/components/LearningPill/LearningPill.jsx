import styles from "./LearningPill.module.css";

import { useRef } from "react";

import Learning from "../Learning/Learning";
import Modal from "../Modal/Modal";

export default function LearningPill({ learning }) {
  const modalRef = useRef(null);
  const { id, rag_status: ragStatus, learning_name: name } = learning;

  const colour =
    ragStatus === "red" ? styles.red : ragStatus === "amber" ? styles.amber : styles.green;
  const listItemClass = `${styles.listItem} ${colour}`;

  return (
    <>
      <li onClick={() => modalRef.current?.showModal()} className={listItemClass}>
        {name}
      </li>
      <Modal ref={modalRef} showButton={false} title={name} closeButtonText="close">
        <Learning learning={learning} />
      </Modal>
    </>
  );
}

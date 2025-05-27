import styles from "./HowToGuide.module.css";

import Modal from "../Modal/Modal";

export default function HowToGuide() {
  return (
    <div className={styles.helpContainer}>
      <p>Need some help? 👉</p>
      <Modal closeButtonText="Got it!" title="How to Use The Learning Audit" isInfoModal={true}>
        <p>Here's a quick guide:</p>
        <ul>
          <li>Start on the Dashboard to select or add a module.</li>
          <li>Click a module to view and add your learnings.</li>
          <li>Use the "Add a new learning" button to document what you've learned.</li>
          <li>Use this Help icon anytime to revisit guidance.</li>
        </ul>
      </Modal>
    </div>
  );
}

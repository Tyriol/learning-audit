import styles from "./HowToGuide.module.css";

import Modal from "../Modal/Modal";

export default function HowToGuide() {
  return (
    <div className={styles.helpContainer}>
      <p>Need some help? 👉</p>
      <Modal closeButtonText="Got it!" title="How to Use The Learning Audit" isInfoModal={true}>
        <p>Here&apos;s a quick guide:</p>
        <ul>
          <li>Start on the Dashboard to select or add a module.</li>
          <li>
            Click a module to:
            <ul>
              <li>view and add your learnings.</li>
              <li>edit your module info.</li>
              <li>delete the module.</li>
            </ul>
          </li>
          <li>
            Use the &quot;Add a new learning&quot; button to document what you&apos;ve learned.
          </li>
          <li>Click on a learning pill to see more info.</li>
          <li>You can edit and delete it here as well.</li>
          <li>Use this Help icon anytime to revisit guidance.</li>
        </ul>
        <small>I&apos;ll make this look less awful soon...</small>
      </Modal>
    </div>
  );
}

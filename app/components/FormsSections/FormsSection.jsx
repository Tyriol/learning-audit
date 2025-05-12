import React from "react";
import styles from "./FormsSection.module.css";
import NewModuleForm from "./NewModuleForm/NewModuleForm";
import NewLearningForm from "./NewLearningForm/NewLearningForm";

export default function FormsSection() {
  return (
    <section className={styles.contentInput}>
      <NewModuleForm />
      <NewLearningForm />
    </section>
  );
}
